window.profileData = {
    contact: {
        location: "Starkville, MS",
        email: "bt1142@msstate.edu",
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
            "Currently at MSU Libraries, I build and support operational tools using C#, Perl, Python, SQL, HTML, and raw JavaScript, including MetaTable and Query. My public project work spans WPF and WinUI desktop apps, reporting interfaces, algorithmic browser apps, and Ady Resolver, a Python address-resolution project that combines rule-based matching with a lightweight machine learning stage."
        ],
        contactIntro: "I'm interested in software engineering roles centered on desktop apps, internal tooling, full-stack product work, and ML-enabled workflow automation. Reach out if you'd like to talk.",
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
                items: ["SQL Server", "PostgreSQL", "WebView2", "EPPlus", "ExcelJS", "Git", "Machine Learning", "Address Resolution", "Algorithms", "REST APIs", "TDD", "Agile"]
            }
        ]
    },
    resume: {
        summary: "Software engineer and M.S. candidate building practical desktop and web applications with a strong focus on automation, reporting, data export, maintainable UI-driven workflows, and practical machine learning applications.",
        skills: [
            { label: "Languages", value: "C#, C++, C, Java, Python, TypeScript, JavaScript, HTML, SQL, Swift, Kotlin" },
            { label: "Frameworks", value: ".NET 8/9, ASP.NET Core, WPF, WinUI 3" },
            { label: "Databases", value: "SQL Server, PostgreSQL, EF Core" },
            { label: "Libraries", value: "WebView2, EPPlus, ExcelJS" },
            { label: "Tools", value: "Git, Visual Studio, VS Code, Postman, MSTest, CSS, SASS" },
            { label: "Methods", value: "OOP, REST APIs, Event-Driven Architecture, TDD, Agile, UI/UX Design, Machine Learning, Address Resolution" }
        ]
    },
    experience: {
        professional: [
            {
                title: "Technology & Support Services Coordinator",
                organization: "MSU Libraries, Mississippi State University",
                location: "Starkville, MS",
                date: "Aug 2024 - Present",
                bullets: [
                    "Built and maintained internal software tools for MSU Libraries using C#, Python, Perl, SQL, JavaScript, HTML, and API integrations.",
                    "Developed browser-based reporting tools for live library item data with configurable filters, API-backed query payloads, report history, and Excel export.",
                    "Built file-processing and metadata extraction utilities to support staff workflows, reporting needs, and day-to-day library operations.",
                    "Automated repetitive reporting and export workflows, reducing manual steps in library operational processes.",
                    "Integrated SirsiDynix APIs and SQL-backed data sources to customize ILS workflows and support internal reporting.",
                    "Supported nontechnical users by delivering maintainable tools that improved workflow efficiency and reliability."
                ]
            },
            {
                title: "Community Assistant",
                organization: "College View, Mississippi State University",
                location: "Starkville, MS",
                date: "2022 - 2024",
                bullets: [
                    "Served in an apartment-style resident assistant role supporting student residents at College View.",
                    "Handled resident communication, policy enforcement, community support, and incident response for the property."
                ]
            }
        ],
        additional: [
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
            date: "May 2027",
            gpa: "4.0/4.0"
        },
        {
            degree: "Bachelor of Science in Computer Science",
            school: "Mississippi State University",
            location: "Starkville, MS",
            date: "May 2024",
            gpa: "3.68/4.0",
            inlineHonors: "(Cum Laude)",
            honorsLines: ["Honors: Phi Theta Kappa, Gamma Beta Phi"],
            resumeDegree: "Bachelor of Science in Computer Science, Cum Laude"
        },
        {
            degree: "Associate of Arts in Computer Science",
            school: "East Central Community College",
            location: "Decatur, MS",
            date: "May 2021",
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
            resumeDescription: "Created as part of my MSU Libraries role to scan directories, capture detailed file metadata, track progress in real time, and export results to Excel.",
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
            resumeDescription: "Developed a Windows app that converts HTML files, folders, and ZIP archives to PDF with drag-and-drop intake, batch processing, scaling controls, and automatic output archiving.",
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
            resumeDescription: "Created for MSU Libraries to create library item reports with configurable filters, structured query payloads, history tracking, and Excel export for large datasets.",
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
            resumeDescription: "Built a Python address-resolution toolkit and local browser app for resolving messy Mississippi addresses using cached public source data, typo-heavy evaluation data, and a staged matching pipeline.",
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
            resumeDescription: "Built a playable Connect 4 app with minimax, alpha-beta pruning, replay tooling, experiment modes, and headless validation for browser-based game AI.",
            featuredOnSite: true,
            featuredOnResume: true
        }
    ]
};
