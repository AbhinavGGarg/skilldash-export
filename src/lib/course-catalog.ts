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
      { name: "AP Biology", subtopics: ["Molecular Biology", "Cellular Energetics", "Heredity", "Gene Expression"] },
      { name: "Chemistry", subtopics: ["Atomic Structure", "Chemical Bonding", "Stoichiometry", "Solutions"] },
      { name: "AP Chemistry", subtopics: ["Thermodynamics", "Kinetics", "Equilibrium", "Electrochemistry"] },
      { name: "Environmental Science", subtopics: ["Ecosystems", "Biodiversity", "Land Use", "Energy Resources"] },
      { name: "AP Environmental Science", subtopics: ["Atmospheric Pollution", "Global Change", "Populations", "Aquatic Systems"] }
    ]
  },
  {
    name: "Social Studies",
    courses: [
      { name: "World History", subtopics: ["Ancient Civilizations", "Middle Ages", "Industrial Revolution", "World Wars"] },
      { name: "AP World History", subtopics: ["Global Interactions", "Empires", "Industrialization", "Global Conflict"] },
      { name: "US Government", subtopics: ["The Constitution", "Branches of Gov", "Elections", "Public Policy"] },
      { name: "AP US Government", subtopics: ["Founding Documents", "Civil Liberties", "Political Ideologies", "Federalism"] },
      { name: "Economics", subtopics: ["Supply and Demand", "Market Structures", "Business Cycles", "Personal Finance"] },
      { name: "AP Macroeconomics", subtopics: ["National Income Accounts", "Financial Sector", "Stabilization Policies", "Open Economy"] },
      { name: "AP Microeconomics", subtopics: ["Consumer Choice", "Firm Behavior", "Factor Markets", "Market Failures"] }
    ]
  },
  {
    name: "Technology",
    courses: [
      { name: "Computer Science", subtopics: ["Variables & Control Flow", "Functions", "Arrays", "Logic"] },
      { name: "AP Computer Science A", subtopics: ["Classes & Objects", "Recursion", "Searching & Sorting", "Inheritance"] }
    ]
  },
  {
    name: "Languages",
    courses: [
      { name: "Spanish", subtopics: ["Present Tense", "Past Tense", "Basic Vocabulary", "Sentence Structure"] },
      { name: "AP Spanish", subtopics: ["Advanced Syntax", "Nuanced Vocabulary", "Literary Analysis", "Verb Tenses"] }
    ]
  }
];

export function getCourseByName(name: string): Course | undefined {
  return SUBJECT_GROUPS.flatMap((group) => group.courses).find((course) => course.name === name);
}

export function getGroupNameForCourse(courseName: string): string {
  return SUBJECT_GROUPS.find((group) => group.courses.some((course) => course.name === courseName))?.name ?? "General";
}
