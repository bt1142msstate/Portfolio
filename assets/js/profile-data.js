window.profileData = {
    contact: {
        location: "Starkville, MS",
        email: "bt1142@msstate.edu",
        websiteUrl: "https://brandontemple.com/",
        websiteLabel: "brandontemple.com",
        githubUrl: "https://github.com/bt1142msstate",
        githubLabel: "github.com/bt1142msstate",
        linkedinUrl: "https://www.linkedin.com/in/brandon-temple-763619407/",
        linkedinLabel: "linkedin.com/in/brandon-temple-763619407",
        instagramUrl: "https://www.instagram.com/brandonvtemple/",
        instagramLabel: "instagram.com/brandonvtemple",
        indeedUrl: "https://profile.indeed.com/p/nvwkkmq",
        indeedLabel: "profile.indeed.com/p/nvwkkmq"
    },
    site: {
        about: [
            "I'm Brandon Vashun Temple, a software engineer with hands-on experience building desktop utilities, internal tools, and browser-based reporting applications. My work is centered on practical software that helps people process files, export data, automate repetitive tasks, and navigate complex workflows more efficiently.",
            "My workflow is AI-first but engineering-led: I use AI to accelerate implementation while applying systems fundamentals, data structures, debugging, and architectural judgment to keep code correct, maintainable, and resilient.",
            "Currently at MSU Libraries, I build and support operational tools using C#, Perl, Python, SQL, HTML, and raw JavaScript, including MetaTable and Query. My public project work spans WPF and WinUI desktop apps, reporting interfaces, algorithmic browser apps, and Ady Resolver, a Python address-resolution project that combines rule-based matching with a lightweight machine learning stage."
        ],
        contactIntro: "I'm interested in software engineering roles centered on AI-first engineering, desktop apps, internal tooling, full-stack product work, and ML-enabled workflow automation. Reach out if you'd like to talk.",
        skills: [
            {
                title: "Languages",
                items: ["C#", "Python", "TypeScript", "JavaScript", "HTML", "Java", "Kotlin", "Swift", "C++", "C", "SQL"]
            },
            {
                title: "Frameworks",
                items: [".NET 8/9", "ASP.NET Core", "WPF", "WinUI 3"]
            },
            {
                title: "Technologies",
                items: ["SQL Server", "PostgreSQL", "WebView2", "EPPlus", "ExcelJS", "Git", "AI-First Engineering", "Architectural Judgment", "Machine Learning", "Address Resolution", "Algorithms", "REST APIs", "TDD", "Agile"]
            }
        ]
    },
    resume: {
        summary: "Software engineer focused on automation and data systems, building desktop and web tools with C#, .NET, Python, SQL, JavaScript, and APIs. Experience designing reporting workflows, file-processing utilities, metadata tools, and API-backed internal systems for operational teams.",
        skills: [
            { label: "Languages", value: "C#, Python, SQL, JavaScript, TypeScript, HTML, C++" },
            { label: "Frameworks", value: ".NET 8/9, ASP.NET Core, WPF, WinUI 3" },
            { label: "Data & APIs", value: "SQL Server, PostgreSQL, EF Core, REST APIs, SirsiDynix APIs" },
            { label: "Libraries", value: "WebView2, EPPlus, ExcelJS" },
            { label: "Tools", value: "Git, Visual Studio, VS Code, Postman, MSTest" },
            { label: "Methods", value: "Data Structures, Algorithms, TDD, Agile, AI-First Engineering, Code Review, Automation, Machine Learning" }
        ]
    },
    experience: {
        professional: [
            {
                title: "Software Engineer (Data Systems) / Technology Coordinator",
                organization: "MSU Libraries, Mississippi State University",
                location: "Starkville, MS",
                date: "Aug 2024 - Present",
                bullets: [
                    "Built automation and reporting tools in C#, Python, Perl, SQL, JavaScript, and HTML to streamline file processing, metadata extraction, data export, and staff workflows for MSU Libraries and Mississippi Library Partnership operations across 12 library systems and 76 branches/campus libraries.",
                    "Developed Query, a browser-based reporting system with configurable filters, API-backed payloads, report history, and Excel export for live library item data.",
                    "Created MetaTable, a WPF metadata scanner for large directory trees with real-time progress tracking and structured Excel exports.",
                    "Translated staff and member-library requests into SirsiDynix API/SQL integrations, documented support workflows, and Excel reports while communicating technical tradeoffs clearly to nontechnical users.",
                    "Applied AI-assisted engineering with C# and C++ systems fundamentals, data structures, debugging, and code review to validate generated code for correctness, performance, and maintainability."
                ]
            }
        ],
        additional: [
            {
                title: "Community Assistant",
                organization: "College View, Mississippi State University",
                date: "2022 - 2024",
                bullets: [
                    "Supported student residents through communication, policy enforcement, community operations, and incident response.",
                    "Served a 600+ student residential community through crisis response, resident support, and escalation coordination.",
                    "Coordinated resident support workflows while balancing graduate-level software engineering coursework."
                ]
            },
            {
                title: "STEM Leader & Math Tutor",
                organization: "Afternoon Adventure Learning Center",
                date: "2018 - 2021",
                bullets: [
                    "Tutored students in math, science, and technology.",
                    "Prepared students for exams and improved study strategies.",
                    "Designed engaging STEM activities with staff."
                ]
            },
            {
                title: "Computer Science Lab Monitor",
                organization: "East Central Community College",
                date: "2019 - 2020",
                bullets: [
                    "Maintained and troubleshot lab computers and systems.",
                    "Assisted students with technical issues and software use.",
                    "Supported problem solving and computer literacy."
                ]
            }
        ]
    },
    education: [
        {
            degree: "Master of Science in Software Engineering",
            school: "Mississippi State University",
            location: "Starkville, MS",
            date: "Fall 2024 - May 2027",
            gpa: "4.0/4.0"
        },
        {
            degree: "Bachelor of Science in Computer Science",
            school: "Mississippi State University",
            location: "Starkville, MS",
            date: "Fall 2021 - May 2024",
            gpa: "3.68/4.0",
            inlineHonors: "(Cum Laude)",
            honorsLines: ["Honors: Phi Theta Kappa, Gamma Beta Phi"],
            resumeDegree: "Bachelor of Science in Computer Science, Cum Laude"
        },
        {
            degree: "Associate of Arts in Computer Science",
            school: "East Central Community College",
            location: "Decatur, MS",
            date: "Fall 2019 - May 2021",
            gpa: "3.85/4.0",
            honorsLines: [
                "Honors: Phi Theta Kappa, Gamma Beta Phi",
                "President's List: Fall 2019, Spring 2020",
                "Dean's List: Fall 2020",
                "C++ Programming Award",
                "Outstanding ECCC CS Student Award, awarded by Mississippi State University (custom cowbell)"
            ]
        }
    ],
    projects: [
        {
            title: "MetaTable",
            githubUrl: "https://github.com/bt1142msstate/MetaTable",
            siteType: "WPF File Metadata Scanner",
            siteDescription: "Created as part of my MSU Libraries role to scan directories, collect detailed file metadata, track progress in real time, and export results to Excel.",
            siteTags: ["C#", ".NET 9", "WPF", "EPPlus"],
            resumeSubtitle: "WPF File Metadata Scanner | C#, .NET 9, EPPlus",
            resumeDescription: "WPF scanner for large directory trees; extracts file metadata, tracks progress, and exports structured Excel reports for MSU Libraries.",
            featuredOnSite: true,
            featuredOnResume: true
        },
        {
            title: "HTMLConverter",
            githubUrl: "https://github.com/bt1142msstate/HTMLConverter",
            siteType: "WinUI 3 Batch PDF Converter",
            siteDescription: "Windows app for converting HTML files, folders, and ZIP archives to PDF with drag-and-drop intake, scaling controls, batch processing, and automatic output archiving.",
            siteTags: ["C#", ".NET 8", "WinUI 3", "WebView2"],
            resumeSubtitle: "WinUI 3 Batch PDF Converter | .NET 8, WebView2",
            resumeDescription: "WinUI 3 app for batch converting HTML files, folders, and ZIP archives to PDF with drag-and-drop intake, scaling controls, and output archiving.",
            featuredOnSite: true,
            featuredOnResume: true
        },
        {
            title: "Query",
            githubUrl: "https://github.com/bt1142msstate/Query",
            siteType: "Browser-Based Report Builder",
            siteDescription: "Created for MSU Libraries to create library item reports with configurable filters, structured query payloads, history tracking, and Excel export.",
            siteTags: ["JavaScript", "HTML", "CSS", "ExcelJS"],
            resumeSubtitle: "Browser-Based Report Builder | JavaScript, HTML, CSS, ExcelJS",
            resumeDescription: "Browser-based MSU Libraries reporting tool with configurable filters, structured API payloads, report history, and Excel export.",
            featuredOnSite: true,
            featuredOnResume: true
        },
        {
            title: "Ady Resolver",
            githubUrl: "https://github.com/bt1142msstate/Ady-Resolver",
            siteType: "Mississippi Address Resolution Toolkit",
            siteDescription: "Python toolkit and local browser app for resolving messy Mississippi addresses using cached public address sources, typo-heavy evaluation data, and a staged matching pipeline.",
            siteTags: ["Python", "Machine Learning", "Address Matching", "Data Pipeline"],
            resumeSubtitle: "Mississippi Address Resolution Toolkit | Python, Machine Learning",
            resumeDescription: "Python address-resolution toolkit and local browser app using cached public data, staged matching, typo-heavy evaluation data, and lightweight ML.",
            featuredOnSite: true,
            featuredOnResume: true
        },
        {
            title: "connect4-ai",
            githubUrl: "https://github.com/bt1142msstate/connect4-ai",
            siteType: "Browser-Based Game AI Demo",
            siteDescription: "Built a playable Connect 4 app with minimax, alpha-beta pruning, replay tooling, experiment modes, and headless validation, published with a live GitHub Pages demo.",
            siteTags: ["JavaScript", "Minimax", "Alpha-Beta Pruning", "Game AI"],
            resumeSubtitle: "Browser-Based Game AI Demo | JavaScript, Minimax, Alpha-Beta Pruning",
            resumeDescription: "Playable browser game AI with minimax, alpha-beta pruning, replay tooling, experiment modes, and headless validation.",
            featuredOnSite: true,
            featuredOnResume: true
        }
    ]
};
