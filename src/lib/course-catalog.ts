export type Course = {
  name: string;
  subtopics: string[];
};

export type SubjectGroup = {
  name: string;
  courses: Course[];
};

export const SUBJECT_GROUPS: SubjectGroup[] = [
  {
    name: "Mathematics",
    courses: [
      {
        name: "Algebra 1",
        subtopics: [
          "Foundations of Algebra",
          "Solving Linear Equations",
          "Linear Inequalities",
          "Systems of Equations",
          "Functions and Relations",
          "Exponents and Polynomials",
          "Quadratic Functions",
          "Data Analysis and Modeling"
        ]
      },
      {
        name: "Algebra 2",
        subtopics: [
          "Quadratic Functions and Equations",
          "Polynomial Operations and Zeros",
          "Rational Functions",
          "Exponential and Logarithmic Functions",
          "Complex Numbers",
          "Sequences and Series",
          "Trigonometric Foundations",
          "Probability and Statistics"
        ]
      },
      {
        name: "Geometry",
        subtopics: [
          "Geometric Foundations",
          "Transformations and Congruence",
          "Similarity and Right Triangles",
          "Circles",
          "Coordinate Geometry",
          "Area and Perimeter",
          "Surface Area and Volume",
          "Trigonometric Ratios"
        ]
      },
      {
        name: "Pre-Calculus",
        subtopics: [
          "Functions and Function Transformations",
          "Polynomial and Rational Functions",
          "Exponential and Logarithmic Models",
          "Trigonometric Functions and Identities",
          "Analytic Trigonometry",
          "Vectors and Parametric Equations",
          "Conic Sections",
          "Sequences, Series, and Limits"
        ]
      },
      {
        name: "Calculus",
        subtopics: [
          "Limits and Continuity",
          "Differentiation Basics",
          "Derivative Rules",
          "Applications of Derivatives",
          "Antiderivatives and Integrals",
          "Definite Integrals and FTC",
          "Applications of Integrals",
          "Differential Equations Basics"
        ]
      },
      {
        name: "AP Calculus AB",
        subtopics: [
          "Unit 1: Limits and Continuity",
          "Unit 2: Differentiation — Definition and Fundamental Properties",
          "Unit 3: Differentiation — Composite, Implicit, and Inverse Functions",
          "Unit 4: Contextual Applications of Differentiation",
          "Unit 5: Analytical Applications of Differentiation",
          "Unit 6: Integration and Accumulation of Change",
          "Unit 7: Differential Equations",
          "Unit 8: Applications of Integration"
        ]
      },
      {
        name: "AP Calculus BC",
        subtopics: [
          "Unit 1: Limits and Continuity",
          "Unit 2: Differentiation — Definition and Fundamental Properties",
          "Unit 3: Differentiation — Composite, Implicit, and Inverse Functions",
          "Unit 4: Contextual Applications of Differentiation",
          "Unit 5: Analytical Applications of Differentiation",
          "Unit 6: Integration and Accumulation of Change",
          "Unit 7: Differential Equations",
          "Unit 8: Applications of Integration",
          "Unit 9: Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
          "Unit 10: Infinite Sequences and Series"
        ]
      },
      {
        name: "AP Statistics",
        subtopics: [
          "Unit 1: Exploring One-Variable Data",
          "Unit 2: Exploring Two-Variable Data",
          "Unit 3: Collecting Data",
          "Unit 4: Probability, Random Variables, and Probability Distributions",
          "Unit 5: Sampling Distributions",
          "Unit 6: Inference for Categorical Data: Proportions",
          "Unit 7: Inference for Quantitative Data: Means",
          "Unit 8: Inference for Categorical Data: Chi-Square",
          "Unit 9: Inference for Quantitative Data: Slopes"
        ]
      }
    ]
  },
  {
    name: "Science",
    courses: [
      {
        name: "Biology",
        subtopics: [
          "Cells and Organelles",
          "Biological Molecules",
          "Cellular Respiration and Photosynthesis",
          "Cell Division",
          "Genetics and Heredity",
          "Evolution",
          "Ecology",
          "Human Body Systems"
        ]
      },
      {
        name: "Chemistry",
        subtopics: [
          "Atomic Structure",
          "Chemical Bonding",
          "Mole Concept and Stoichiometry",
          "States of Matter and Gas Laws",
          "Solutions and Concentration",
          "Thermochemistry",
          "Reaction Rates and Equilibrium",
          "Acids, Bases, and Electrochemistry"
        ]
      },
      {
        name: "Physics",
        subtopics: [
          "Kinematics",
          "Forces and Newton's Laws",
          "Work, Energy, and Power",
          "Momentum and Collisions",
          "Circular Motion and Gravitation",
          "Waves and Sound",
          "Electricity and Magnetism",
          "Optics and Modern Physics"
        ]
      },
      {
        name: "Earth Science",
        subtopics: [
          "Earth's Structure",
          "Plate Tectonics",
          "Minerals and Rocks",
          "Geologic Time",
          "Weather and Climate",
          "Ocean Systems",
          "Astronomy Foundations",
          "Natural Resources and Hazards"
        ]
      },
      {
        name: "Environmental Science",
        subtopics: [
          "Ecosystems and Biomes",
          "Biodiversity",
          "Population Dynamics",
          "Land and Water Use",
          "Energy Resources",
          "Pollution",
          "Climate Change",
          "Sustainability and Policy"
        ]
      },
      {
        name: "Anatomy & Physiology",
        subtopics: [
          "Homeostasis",
          "Cell and Tissue Structure",
          "Skeletal and Muscular Systems",
          "Nervous and Endocrine Systems",
          "Cardiovascular and Respiratory Systems",
          "Digestive and Urinary Systems",
          "Immune and Lymphatic Systems",
          "Reproductive System"
        ]
      },
      {
        name: "Forensic Science",
        subtopics: [
          "Forensic Investigation Process",
          "Crime Scene Documentation",
          "Fingerprint Analysis",
          "DNA Profiling",
          "Toxicology",
          "Bloodstain Pattern Analysis",
          "Trace Evidence",
          "Forensic Ethics and Courtroom Testimony"
        ]
      },
      {
        name: "AP Biology",
        subtopics: [
          "Unit 1: Chemistry of Life",
          "Unit 2: Cell Structure and Function",
          "Unit 3: Cellular Energetics",
          "Unit 4: Cell Communication and Cell Cycle",
          "Unit 5: Heredity",
          "Unit 6: Gene Expression and Regulation",
          "Unit 7: Natural Selection",
          "Unit 8: Ecology"
        ]
      },
      {
        name: "AP Chemistry",
        subtopics: [
          "Unit 1: Atomic Structure and Properties",
          "Unit 2: Molecular and Ionic Compound Structure and Properties",
          "Unit 3: Intermolecular Forces and Properties",
          "Unit 4: Chemical Reactions",
          "Unit 5: Kinetics",
          "Unit 6: Thermodynamics",
          "Unit 7: Equilibrium",
          "Unit 8: Acids and Bases",
          "Unit 9: Applications of Thermodynamics"
        ]
      },
      {
        name: "AP Physics 1",
        subtopics: [
          "Unit 1: Kinematics",
          "Unit 2: Dynamics",
          "Unit 3: Circular Motion and Gravitation",
          "Unit 4: Energy",
          "Unit 5: Momentum",
          "Unit 6: Simple Harmonic Motion",
          "Unit 7: Torque and Rotational Motion"
        ]
      },
      {
        name: "AP Physics 2",
        subtopics: [
          "Unit 1: Fluids",
          "Unit 2: Thermodynamics",
          "Unit 3: Electric Force, Field, and Potential",
          "Unit 4: Electric Circuits",
          "Unit 5: Magnetism and Electromagnetism",
          "Unit 6: Geometric and Physical Optics",
          "Unit 7: Quantum, Atomic, and Nuclear Physics"
        ]
      },
      {
        name: "AP Environmental Science",
        subtopics: [
          "Unit 1: The Living World: Ecosystems",
          "Unit 2: The Living World: Biodiversity",
          "Unit 3: Populations",
          "Unit 4: Earth Systems and Resources",
          "Unit 5: Land and Water Use",
          "Unit 6: Energy Resources and Consumption",
          "Unit 7: Atmospheric Pollution",
          "Unit 8: Aquatic and Terrestrial Pollution",
          "Unit 9: Global Change"
        ]
      }
    ]
  },
  {
    name: "Social Studies",
    courses: [
      {
        name: "World History",
        subtopics: [
          "Early Civilizations",
          "Classical Civilizations",
          "Post-Classical Empires",
          "Middle Ages",
          "Renaissance and Reformation",
          "Global Exploration",
          "Industrial Revolution",
          "World Wars and Modern Era"
        ]
      },
      {
        name: "US History",
        subtopics: [
          "Colonial America",
          "American Revolution and Constitution",
          "Early Republic and Expansion",
          "Civil War and Reconstruction",
          "Industrialization and Progressive Era",
          "World Wars and Great Depression",
          "Cold War and Civil Rights",
          "Contemporary United States"
        ]
      },
      {
        name: "Civics",
        subtopics: [
          "Foundations of Government",
          "Constitutional Principles",
          "Branches of Government",
          "Federalism",
          "Rights and Liberties",
          "Elections and Political Participation",
          "Public Policy",
          "State and Local Government"
        ]
      },
      {
        name: "Economics",
        subtopics: [
          "Scarcity and Opportunity Cost",
          "Supply and Demand",
          "Market Structures",
          "Macroeconomic Indicators",
          "Fiscal and Monetary Policy",
          "Personal Finance",
          "International Trade",
          "Economic Growth and Development"
        ]
      },
      {
        name: "Global Studies",
        subtopics: [
          "Physical and Human Geography",
          "Globalization",
          "Political Systems",
          "Economic Systems",
          "Population and Migration",
          "Culture and Identity",
          "Conflict and Cooperation",
          "Global Challenges"
        ]
      },
      {
        name: "Sociology",
        subtopics: [
          "Sociological Perspectives",
          "Culture and Socialization",
          "Social Structure and Groups",
          "Institutions",
          "Deviance and Social Control",
          "Stratification and Inequality",
          "Race, Class, and Gender",
          "Social Change"
        ]
      },
      {
        name: "Psychology",
        subtopics: [
          "Research Methods",
          "Biological Bases of Behavior",
          "Sensation and Perception",
          "Learning",
          "Memory and Cognition",
          "Development",
          "Personality and Social Psychology",
          "Psychological Disorders and Treatment"
        ]
      },
      {
        name: "AP World History",
        subtopics: [
          "Unit 1: The Global Tapestry",
          "Unit 2: Networks of Exchange",
          "Unit 3: Land-Based Empires",
          "Unit 4: Transoceanic Interconnections",
          "Unit 5: Revolutions",
          "Unit 6: Consequences of Industrialization",
          "Unit 7: Global Conflict",
          "Unit 8: Cold War and Decolonization",
          "Unit 9: Globalization"
        ]
      },
      {
        name: "AP US History",
        subtopics: [
          "Unit 1: Period 1491–1607",
          "Unit 2: Period 1607–1754",
          "Unit 3: Period 1754–1800",
          "Unit 4: Period 1800–1848",
          "Unit 5: Period 1844–1877",
          "Unit 6: Period 1865–1898",
          "Unit 7: Period 1890–1945",
          "Unit 8: Period 1945–1980",
          "Unit 9: Period 1980–Present"
        ]
      },
      {
        name: "AP Government",
        subtopics: [
          "Unit 1: Foundations of American Democracy",
          "Unit 2: Interactions Among Branches of Government",
          "Unit 3: Civil Liberties and Civil Rights",
          "Unit 4: American Political Ideologies and Beliefs",
          "Unit 5: Political Participation"
        ]
      },
      {
        name: "AP Human Geography",
        subtopics: [
          "Unit 1: Thinking Geographically",
          "Unit 2: Population and Migration Patterns and Processes",
          "Unit 3: Cultural Patterns and Processes",
          "Unit 4: Political Patterns and Processes",
          "Unit 5: Agriculture and Rural Land-Use Patterns and Processes",
          "Unit 6: Cities and Urban Land-Use Patterns and Processes",
          "Unit 7: Industrial and Economic Development Patterns and Processes"
        ]
      },
      {
        name: "AP European History",
        subtopics: [
          "Unit 1: Renaissance and Exploration",
          "Unit 2: Age of Reformation",
          "Unit 3: Absolutism and Constitutionalism",
          "Unit 4: Scientific, Philosophical, and Political Developments",
          "Unit 5: Conflict, Crisis, and Reaction in the Late 18th Century",
          "Unit 6: Industrialization and Its Effects",
          "Unit 7: 19th-Century Perspectives and Political Developments",
          "Unit 8: 20th-Century Global Conflict",
          "Unit 9: Cold War and Contemporary Europe"
        ]
      },
      {
        name: "AP Macroeconomics",
        subtopics: [
          "Unit 1: Basic Economic Concepts",
          "Unit 2: Economic Indicators and the Business Cycle",
          "Unit 3: National Income and Price Determination",
          "Unit 4: Financial Sector",
          "Unit 5: Long-Run Consequences of Stabilization Policies",
          "Unit 6: Open Economy — International Trade and Finance"
        ]
      },
      {
        name: "AP Microeconomics",
        subtopics: [
          "Unit 1: Basic Economic Concepts",
          "Unit 2: Supply and Demand",
          "Unit 3: Production, Cost, and the Perfect Competition Model",
          "Unit 4: Imperfect Competition",
          "Unit 5: Factor Markets",
          "Unit 6: Market Failure and the Role of Government"
        ]
      },
      {
        name: "AP African American Studies",
        subtopics: [
          "Unit 1: Origins of the African Diaspora",
          "Unit 2: Freedom, Enslavement, and Resistance",
          "Unit 3: The Practice of Freedom",
          "Unit 4: Movements and Debates"
        ]
      }
    ]
  },
  {
    name: "English",
    courses: [
      {
        name: "English 9",
        subtopics: [
          "Plot and Character Development",
          "Theme and Central Idea",
          "Grammar and Sentence Structure",
          "Argument Writing",
          "Narrative Writing",
          "Poetry Analysis",
          "Research and Citation",
          "Revision and Editing"
        ]
      },
      {
        name: "English 10",
        subtopics: [
          "Rhetorical Analysis",
          "Literary Analysis",
          "Informational Text Analysis",
          "Evidence Integration",
          "Argument and Counterargument",
          "Syntax and Style",
          "Speaking and Presentation",
          "Timed Writing"
        ]
      },
      {
        name: "English 11",
        subtopics: [
          "American Literature Themes",
          "Rhetoric in American Texts",
          "Analytical Essay Writing",
          "Research-Based Argument",
          "Grammar for Clarity",
          "Synthesis of Sources",
          "Revision Strategies",
          "Exam Writing Skills"
        ]
      },
      {
        name: "American Literature",
        subtopics: [
          "Colonial and Early American Texts",
          "Romanticism and Transcendentalism",
          "Realism and Naturalism",
          "Modernism",
          "Contemporary American Voices",
          "Poetry and Form",
          "Critical Lenses",
          "Literary Argument Writing"
        ]
      },
      {
        name: "British Literature",
        subtopics: [
          "Anglo-Saxon and Medieval Literature",
          "Renaissance Literature",
          "Neoclassicism and Satire",
          "Romanticism",
          "Victorian Literature",
          "Modern British Literature",
          "Poetry and Drama Analysis",
          "Comparative Literary Essays"
        ]
      },
      {
        name: "Expository Reading & Writing",
        subtopics: [
          "Rhetorical Situation",
          "Close Reading Strategies",
          "Claim and Evidence Evaluation",
          "Source Synthesis",
          "Academic Argument",
          "Revision for Precision",
          "Grammar in Context",
          "Portfolio and Reflection"
        ]
      },
      {
        name: "AP English Language",
        subtopics: [
          "Unit 1: Rhetorical Situation",
          "Unit 2: Claims and Evidence",
          "Unit 3: Reasoning and Organization",
          "Unit 4: Style",
          "Unit 5: Argument",
          "Unit 6: Synthesis",
          "Unit 7: Rhetorical Analysis",
          "Unit 8: Timed Writing and Revision"
        ]
      },
      {
        name: "AP English Literature",
        subtopics: [
          "Unit 1: Short Fiction I",
          "Unit 2: Poetry I",
          "Unit 3: Longer Fiction or Drama",
          "Unit 4: Short Fiction II",
          "Unit 5: Poetry II",
          "Unit 6: Longer Fiction or Drama II",
          "Unit 7: Literary Argument Writing",
          "Unit 8: Timed Analysis Practice"
        ]
      },
      {
        name: "AP Psychology",
        subtopics: [
          "Unit 1: Biological Bases of Behavior",
          "Unit 2: Cognition",
          "Unit 3: Development and Learning",
          "Unit 4: Social Psychology and Personality",
          "Unit 5: Mental and Physical Health",
          "Unit 6: Research Methods"
        ]
      }
    ]
  },
  {
    name: "Foreign Language",
    courses: [
      {
        name: "Spanish 1",
        subtopics: [
          "Greetings and Introductions",
          "Present Tense Verbs",
          "Nouns and Adjectives",
          "Question Formation",
          "Daily Activities Vocabulary",
          "Basic Conversation",
          "Cultural Readings",
          "Listening Comprehension"
        ]
      },
      {
        name: "Spanish 2",
        subtopics: [
          "Preterite and Imperfect",
          "Object Pronouns",
          "Commands",
          "Comparisons and Superlatives",
          "Travel and Community Vocabulary",
          "Paragraph Writing",
          "Interpretive Reading",
          "Conversation and Presentations"
        ]
      },
      {
        name: "Spanish 3",
        subtopics: [
          "Subjunctive Mood Basics",
          "Complex Sentences",
          "Advanced Verb Tenses",
          "Idiomatic Expressions",
          "Cultural Perspectives",
          "Analytical Reading",
          "Formal Writing",
          "Interpersonal Speaking"
        ]
      },
      {
        name: "AP Spanish",
        subtopics: [
          "Families and Communities",
          "Personal and Public Identities",
          "Beauty and Aesthetics",
          "Science and Technology",
          "Contemporary Life",
          "Global Challenges",
          "Interpretive Communication",
          "Presentational Writing and Speaking"
        ]
      },
      {
        name: "French 1",
        subtopics: [
          "Introductions and Classroom Language",
          "Present Tense Verbs",
          "Gender and Agreement",
          "Question Forms",
          "Everyday Vocabulary",
          "Short Dialogues",
          "Culture and Francophone World",
          "Listening Basics"
        ]
      },
      {
        name: "French 2",
        subtopics: [
          "Past Tenses",
          "Pronouns and Object Placement",
          "Reflexive Verbs",
          "Future Expressions",
          "Descriptive Writing",
          "Interpretive Reading",
          "Conversation Expansion",
          "Cultural Comparisons"
        ]
      },
      {
        name: "French 3",
        subtopics: [
          "Subjunctive Intro",
          "Complex Grammar Structures",
          "Advanced Vocabulary",
          "Narrative and Opinion Writing",
          "Interpretive Listening",
          "Literary and Cultural Texts",
          "Formal Speaking",
          "AP Skill Foundations"
        ]
      },
      {
        name: "AP French",
        subtopics: [
          "Families and Communities",
          "Personal and Public Identities",
          "Beauty and Aesthetics",
          "Science and Technology",
          "Contemporary Life",
          "Global Challenges",
          "Interpretive Communication",
          "Presentational Writing and Speaking"
        ]
      }
    ]
  },
  {
    name: "Technology",
    courses: [
      {
        name: "Computer Science",
        subtopics: [
          "Variables and Data Types",
          "Control Flow",
          "Functions and Modularity",
          "Arrays and Lists",
          "Algorithms",
          "Object-Oriented Basics",
          "Debugging and Testing",
          "Computing Ethics"
        ]
      },
      {
        name: "Data Science",
        subtopics: [
          "Data Collection",
          "Data Cleaning",
          "Exploratory Data Analysis",
          "Visualization",
          "Probability and Inference",
          "Model Building",
          "Model Evaluation",
          "Ethics and Bias"
        ]
      },
      {
        name: "Cybersecurity",
        subtopics: [
          "Threat Landscape",
          "Cryptography Foundations",
          "Network Security",
          "Authentication and Access Control",
          "Vulnerability Assessment",
          "Incident Response",
          "Security Policies",
          "Ethics and Law"
        ]
      },
      {
        name: "Web Design",
        subtopics: [
          "HTML Structure",
          "CSS Layout and Styling",
          "Responsive Design",
          "Accessibility",
          "User Experience Principles",
          "Web Performance",
          "Intro JavaScript Interactivity",
          "Project and Portfolio Development"
        ]
      },
      {
        name: "AP Computer Science A",
        subtopics: [
          "Unit 1: Primitive Types",
          "Unit 2: Using Objects",
          "Unit 3: Boolean Expressions and if Statements",
          "Unit 4: Iteration",
          "Unit 5: Writing Classes",
          "Unit 6: Array",
          "Unit 7: ArrayList",
          "Unit 8: 2D Array",
          "Unit 9: Inheritance",
          "Unit 10: Recursion"
        ]
      },
      {
        name: "AP Computer Science Principles",
        subtopics: [
          "Unit 1: Creative Development",
          "Unit 2: Data",
          "Unit 3: Algorithms and Programming",
          "Unit 4: Computer Systems and Networks",
          "Unit 5: Impact of Computing",
          "Unit 6: Practice Create Task"
        ]
      }
    ]
  },
  {
    name: "SAT Prep",
    courses: [
      {
        name: "SAT Reading & Writing",
        subtopics: [
          "Information and Ideas",
          "Craft and Structure",
          "Expression of Ideas",
          "Standard English Conventions",
          "Text Connections",
          "Rhetorical Synthesis",
          "Transitions and Cohesion",
          "Passage-Based Strategy"
        ]
      },
      {
        name: "SAT Math",
        subtopics: [
          "Algebra",
          "Advanced Math",
          "Problem Solving and Data Analysis",
          "Geometry and Trigonometry",
          "Functions",
          "Systems and Modeling",
          "Non-Calculator Strategy",
          "Pacing and Accuracy"
        ]
      }
    ]
  },
  {
    name: "ACT Prep",
    courses: [
      {
        name: "ACT English",
        subtopics: [
          "Punctuation and Mechanics",
          "Grammar and Usage",
          "Sentence Structure",
          "Rhetorical Skills",
          "Organization and Unity",
          "Style and Tone",
          "Revision Strategy",
          "Timing Strategy"
        ]
      },
      {
        name: "ACT Math",
        subtopics: [
          "Pre-Algebra and Algebra",
          "Functions",
          "Geometry",
          "Trigonometry",
          "Statistics and Probability",
          "Word Problem Modeling",
          "Calculator Strategy",
          "Pacing Strategy"
        ]
      },
      {
        name: "ACT Reading",
        subtopics: [
          "Main Idea and Detail",
          "Inference",
          "Author's Purpose and Tone",
          "Vocabulary in Context",
          "Comparative Passages",
          "Evidence Tracking",
          "Passage Mapping",
          "Timing Strategy"
        ]
      },
      {
        name: "ACT Science",
        subtopics: [
          "Data Representation",
          "Research Summaries",
          "Conflicting Viewpoints",
          "Scientific Reasoning",
          "Graph and Table Interpretation",
          "Experimental Design",
          "Trend and Extrapolation",
          "Timing Strategy"
        ]
      }
    ]
  }
];

export function getCourseByName(name: string): Course | undefined {
  return SUBJECT_GROUPS.flatMap((group) => group.courses).find((course) => course.name === name);
}

export function getGroupNameForCourse(courseName: string): string {
  return SUBJECT_GROUPS.find((group) => group.courses.some((course) => course.name === courseName))?.name ?? "General";
}
