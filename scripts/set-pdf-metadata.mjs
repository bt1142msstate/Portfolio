#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const [inputPath, outputPath] = process.argv.slice(2);
const qpdf = process.env.QPDF || "qpdf";

if (!inputPath || !outputPath) {
    console.error("Usage: set-pdf-metadata.mjs INPUT.pdf OUTPUT.pdf");
    process.exit(1);
}

function runQpdf(argumentsList, options = {}) {
    const result = spawnSync(qpdf, argumentsList, {
        encoding: "utf8",
        maxBuffer: 64 * 1024 * 1024,
        ...options
    });

    if (result.status !== 0) {
        process.stderr.write(result.stderr || result.stdout || "qpdf failed.\n");
        process.exit(result.status || 1);
    }
    return result.stdout;
}

const sourceJson = JSON.parse(runQpdf(["--json=2", "--json-key=qpdf", inputPath]));
const qpdfHeader = sourceJson.qpdf[0];
const qpdfObjects = sourceJson.qpdf[1];
const infoReference = qpdfObjects.trailer?.value?.["/Info"];

if (!infoReference) {
    console.error("The generated PDF does not contain an information dictionary.");
    process.exit(1);
}

const infoKey = `obj:${infoReference}`;
const infoObject = qpdfObjects[infoKey];
if (!infoObject?.value) {
    console.error(`Unable to read the PDF information dictionary at ${infoReference}.`);
    process.exit(1);
}

infoObject.value["/Title"] = "u:Brandon Temple Resume | Software Engineer";
infoObject.value["/Author"] = "u:Brandon Vashun Temple";
infoObject.value["/Subject"] = "u:Software engineering resume covering professional experience, projects, technical skills, and education.";
infoObject.value["/Keywords"] = "u:Brandon Temple, Brandon Vashun Temple, software engineer, C#, .NET, Python, SQL, JavaScript, Firebase, data systems, workflow automation";

const update = {
    version: 2,
    qpdf: [
        qpdfHeader,
        {
            [infoKey]: infoObject
        }
    ]
};
const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-pdf-metadata."));
const updatePath = path.join(temporaryDirectory, "metadata.json");

try {
    fs.writeFileSync(updatePath, JSON.stringify(update, null, 2));
    runQpdf([inputPath, `--update-from-json=${updatePath}`, outputPath]);
} finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
}
