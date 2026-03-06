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
      { name: "Algebra 1", subtopics: ["Linear Equations", "Linear Inequalities", "Systems of Equations", "Intro to Functions"] },
      { name: "Algebra 2", subtopics: ["Quadratic Functions", "Complex Numbers", "Logarithms", "Rational Expressions"] },
      { name: "Geometry", subtopics: ["Trigonometry", "Coordinate Geometry", "Volume & Surface Area", "Congruence & Similarity"] },
      { name: "Pre-Calculus", subtopics: ["Functions & Transformations", "Polynomial & Rational Functions", "Trigonometric Functions", "Sequences & Series"] },
      { name: "Calculus", subtopics: ["Limits & Continuity", "Basic Derivatives", "Basic Integration", "Applications of Derivatives"] },
      { name: "AP Calculus AB", subtopics: ["Mean Value Theorem", "Fundamental Theorem of Calculus", "Area Between Curves", "Volume of Solids"] },
      { name: "AP Calculus BC", subtopics: ["Parametric & Polar", "Infinite Series", "Integration by Parts", "Logistic Growth"] },
      { name: "AP Statistics", subtopics: ["Probability Distributions", "Inference", "Chi-Square Tests", "Linear Regression"] }
    ]
  },
  {
    name: "Science",
    courses: [
      { name: "Biology", subtopics: ["Cell Structure", "Genetics", "Evolution", "Ecology"] },
      { name: "Chemistry", subtopics: ["Atomic Structure", "Chemical Bonding", "Stoichiometry", "Solutions"] },
      { name: "Physics", subtopics: ["Kinematics", "Forces & Newton's Laws", "Energy & Momentum", "Waves & Optics"] },
      { name: "Earth Science", subtopics: ["Plate Tectonics", "Earth Systems", "Weather & Climate", "Geologic Time"] },
      { name: "Environmental Science", subtopics: ["Ecosystems", "Biodiversity", "Land Use", "Energy Resources"] },
      { name: "Anatomy & Physiology", subtopics: ["Homeostasis", "Cardiovascular System", "Nervous System", "Musculoskeletal System"] },
      { name: "Forensic Science", subtopics: ["Crime Scene Analysis", "DNA Profiling", "Toxicology", "Evidence Evaluation"] },
      { name: "AP Biology", subtopics: ["Molecular Biology", "Cellular Energetics", "Heredity", "Gene Expression"] },
      { name: "AP Chemistry", subtopics: ["Thermodynamics", "Kinetics", "Equilibrium", "Electrochemistry"] },
      { name: "AP Physics 1", subtopics: ["Kinematics", "Dynamics", "Energy", "Rotation"] },
      { name: "AP Physics 2", subtopics: ["Fluids", "Thermodynamics", "Electricity & Magnetism", "Modern Physics"] },
      { name: "AP Environmental Science", subtopics: ["Atmospheric Pollution", "Global Change", "Populations", "Aquatic Systems"] }
    ]
  },
  {
    name: "Social Studies",
    courses: [
      { name: "World History", subtopics: ["Ancient Civilizations", "Middle Ages", "Industrial Revolution", "World Wars"] },
      { name: "US History", subtopics: ["Colonial Foundations", "Civil War & Reconstruction", "Industrial America", "Modern United States"] },
      { name: "Civics", subtopics: ["Constitutional Principles", "Branches of Government", "Rights & Responsibilities", "Public Policy"] },
      { name: "Economics", subtopics: ["Supply and Demand", "Market Structures", "Business Cycles", "Personal Finance"] },
      { name: "Global Studies", subtopics: ["Globalization", "Geopolitical Systems", "Human Development", "International Conflict"] },
      { name: "Sociology", subtopics: ["Social Structures", "Culture & Identity", "Institutions", "Social Change"] },
      { name: "Psychology", subtopics: ["Cognition", "Learning", "Behavior", "Research Methods"] },
      { name: "AP World History", subtopics: ["Global Interactions", "Empires", "Industrialization", "Global Conflict"] },
      { name: "AP US History", subtopics: ["Colonization", "Constitutional Development", "Expansion & Reform", "Modern America"] },
      { name: "AP Government", subtopics: ["Founding Documents", "Civil Liberties", "Political Ideologies", "Federalism"] },
      { name: "AP Human Geography", subtopics: ["Population", "Cultural Patterns", "Political Organization", "Agriculture & Land Use"] },
      { name: "AP European History", subtopics: ["Renaissance & Reformation", "Absolutism & Constitutionalism", "Industrialization", "Twentieth Century Europe"] },
      { name: "AP Macroeconomics", subtopics: ["National Income Accounts", "Financial Sector", "Stabilization Policies", "Open Economy"] },
      { name: "AP Microeconomics", subtopics: ["Consumer Choice", "Firm Behavior", "Factor Markets", "Market Failures"] },
      { name: "AP African American Studies", subtopics: ["Origins of the African Diaspora", "Freedom Movements", "Cultural Production", "Contemporary Debates"] }
    ]
  },
  {
    name: "English",
    courses: [
      { name: "English 9", subtopics: ["Argument Analysis", "Narrative Technique", "Grammar & Usage", "Evidence Integration"] },
      { name: "English 10", subtopics: ["Rhetorical Analysis", "Theme Development", "Syntax & Style", "Textual Evidence"] },
      { name: "English 11", subtopics: ["American Rhetoric", "Analytical Writing", "Research Skills", "Revision Strategy"] },
      { name: "American Literature", subtopics: ["Foundational Texts", "Realism & Modernism", "Poetry Analysis", "Literary Argument"] },
      { name: "British Literature", subtopics: ["Early Traditions", "Romantic & Victorian", "Modern British Texts", "Comparative Analysis"] },
      { name: "Expository Reading & Writing", subtopics: ["Claim Evaluation", "Source Synthesis", "Rhetorical Moves", "Academic Writing"] },
      { name: "AP English Language", subtopics: ["Rhetorical Situation", "Argument & Synthesis", "Style Analysis", "Timed Essay Strategy"] },
      { name: "AP English Literature", subtopics: ["Poetry Analysis", "Prose Analysis", "Literary Interpretation", "Timed Literary Argument"] },
      { name: "AP Psychology", subtopics: ["Biological Bases of Behavior", "Cognition", "Learning", "Research Methods"] }
    ]
  },
  {
    name: "Foreign Language",
    courses: [
      { name: "Spanish 1", subtopics: ["Present Tense", "Basic Vocabulary", "Sentence Structure", "Reading Comprehension"] },
      { name: "Spanish 2", subtopics: ["Past Tense", "Object Pronouns", "Conversation Strategies", "Paragraph Writing"] },
      { name: "Spanish 3", subtopics: ["Subjunctive Basics", "Complex Sentences", "Advanced Vocabulary", "Cultural Text Analysis"] },
      { name: "AP Spanish", subtopics: ["Advanced Syntax", "Nuanced Vocabulary", "Literary Analysis", "Verb Tenses"] },
      { name: "French 1", subtopics: ["Present Tense", "Core Vocabulary", "Agreement Rules", "Reading Comprehension"] },
      { name: "French 2", subtopics: ["Past Tense", "Pronouns", "Sentence Expansion", "Conversation Strategies"] },
      { name: "French 3", subtopics: ["Subjunctive Basics", "Advanced Grammar", "Contextual Vocabulary", "Cultural Interpretation"] },
      { name: "AP French", subtopics: ["Argumentative Writing", "Advanced Grammar", "Text Interpretation", "Speaking Strategy"] }
    ]
  },
  {
    name: "Technology",
    courses: [
      { name: "Computer Science", subtopics: ["Variables & Control Flow", "Functions", "Arrays", "Logic"] },
      { name: "Data Science", subtopics: ["Data Cleaning", "Visualization", "Statistical Inference", "Model Evaluation"] },
      { name: "Cybersecurity", subtopics: ["Threat Models", "Network Security", "Cryptography Basics", "Incident Response"] },
      { name: "Web Design", subtopics: ["HTML/CSS Structure", "Responsive Layout", "Accessibility", "UX Principles"] },
      { name: "AP Computer Science A", subtopics: ["Classes & Objects", "Recursion", "Searching & Sorting", "Inheritance"] },
      { name: "AP Computer Science Principles", subtopics: ["Abstraction", "Data & Information", "Algorithms", "Computing Impacts"] }
    ]
  },
  {
    name: "SAT Prep",
    courses: [
      { name: "SAT Reading & Writing", subtopics: ["Rhetorical Synthesis", "Grammar Conventions", "Logical Transitions", "Text Structure"] },
      { name: "SAT Math", subtopics: ["Algebra", "Advanced Math", "Problem Solving & Data", "Geometry & Trigonometry"] }
    ]
  },
  {
    name: "ACT Prep",
    courses: [
      { name: "ACT English", subtopics: ["Grammar & Mechanics", "Rhetorical Skills", "Organization", "Style & Tone"] },
      { name: "ACT Math", subtopics: ["Algebra", "Functions", "Geometry", "Statistics & Probability"] },
      { name: "ACT Reading", subtopics: ["Main Idea", "Inference", "Author Purpose", "Comparative Passages"] },
      { name: "ACT Science", subtopics: ["Data Interpretation", "Experimental Design", "Conflicting Viewpoints", "Scientific Reasoning"] }
    ]
  }
];

export function getCourseByName(name: string): Course | undefined {
  return SUBJECT_GROUPS.flatMap((group) => group.courses).find((course) => course.name === name);
}

export function getGroupNameForCourse(courseName: string): string {
  return SUBJECT_GROUPS.find((group) => group.courses.some((course) => course.name === courseName))?.name ?? "General";
}
