import { ACTIVE_QUESTION_BANK } from "@/lib/questions-data";
import { getCourseByName, getGroupNameForCourse } from "@/lib/course-catalog";

type LearnGuide = {
  title: string;
  overview: string;
  keyMoves: string[];
  commonMistakes: string[];
  studyPlan: string[];
  checkpoints: string[];
  samplePrompts: string[];
};

const DOMAIN_MOVES: Record<string, string[]> = {
  Mathematics: [
    "Translate the problem into symbols before computing anything.",
    "State domain/constraint conditions first so invalid steps are caught early.",
    "Keep symbolic work exact until the final line, then interpret in context.",
    "Back-check final answers by substitution and reasonableness."
  ],
  Science: [
    "Separate claim, evidence, and mechanism in every explanation.",
    "Track variables, controls, and confounders before evaluating conclusions.",
    "Connect micro-level processes to macro-level outcomes.",
    "Use data trends and uncertainty language, not absolute claims."
  ],
  "Social Studies": [
    "Anchor claims to specific evidence and historical/economic context.",
    "Compare at least two plausible explanations before choosing one.",
    "Identify assumptions, incentives, and trade-offs explicitly.",
    "Distinguish correlation from causation in policy or event analysis."
  ],
  Technology: [
    "Define input/output contracts before writing or tracing logic.",
    "Trace edge cases first, then nominal cases.",
    "Analyze runtime or design trade-offs instead of only final output.",
    "Validate with test cases that include boundary behavior."
  ],
  Languages: [
    "Prioritize meaning and precision over literal word-by-word translation.",
    "Select tense, agreement, and register based on context clues.",
    "Check cohesion using connectors and transition logic.",
    "Revise for grammar after confirming intent and nuance."
  ],
  General: [
    "Define what is being asked and what evidence is available.",
    "Apply the correct framework before choosing an answer.",
    "Check assumptions and constraints before finalizing.",
    "Explain why alternatives are weaker, not only why one is right."
  ]
};

const DOMAIN_MISTAKES: Record<string, string[]> = {
  Mathematics: [
    "Dropping domain restrictions after algebraic manipulation.",
    "Switching formulas without checking whether assumptions hold.",
    "Rounding too early and propagating error.",
    "Stopping at a symbolic result without interpreting units or context."
  ],
  Science: [
    "Treating one strong study as universal without replication.",
    "Confusing association with causal mechanism.",
    "Ignoring measurement limitations or sample bias.",
    "Overstating certainty when evidence is mixed."
  ],
  "Social Studies": [
    "Using confident language without source quality checks.",
    "Ignoring counterevidence that weakens a claim.",
    "Flattening complex systems into one-factor explanations.",
    "Applying modern assumptions to past contexts without adjustment."
  ],
  Technology: [
    "Optimizing for one case while breaking edge behavior.",
    "Assuming code works without trace-based verification.",
    "Ignoring data structure constraints during design choices.",
    "Confusing syntax correctness with algorithmic correctness."
  ],
  Languages: [
    "Choosing grammar that is technically valid but contextually wrong.",
    "Literal translation that loses register or intent.",
    "Ignoring agreement/gender/number in complex sentences.",
    "Using repetitive structure when nuance is required."
  ],
  General: [
    "Relying on intuition without validating with evidence.",
    "Skipping constraint checks.",
    "Choosing the first plausible answer without comparing alternatives.",
    "Not reviewing errors to identify a repeatable fix."
  ]
};

const DOMAIN_CHECKPOINTS: Record<string, string[]> = {
  Mathematics: [
    "Did I define variables and constraints before solving?",
    "Did I verify sign, domain, and units at the end?",
    "Could a different method yield the same result?",
    "Is the magnitude of my result reasonable for the context?"
  ],
  Science: [
    "What variable is manipulated, measured, and controlled?",
    "What evidence directly supports the claim?",
    "What alternative mechanism could also explain the result?",
    "How would replication or a larger sample change confidence?"
  ],
  "Social Studies": [
    "Which source is strongest and why?",
    "What assumptions does this argument require?",
    "Who benefits or loses under this interpretation/policy?",
    "What counterexample would most challenge my conclusion?"
  ],
  Technology: [
    "What are edge cases for this input space?",
    "What is the time/space complexity bottleneck?",
    "How would I test this in three minimal cases?",
    "Does the solution satisfy both correctness and maintainability?"
  ],
  Languages: [
    "Does this tense/aspect match time context?",
    "Is subject-verb and noun-adjective agreement correct?",
    "Does wording match formal/informal register requirements?",
    "Could a native reader infer a different meaning than intended?"
  ],
  General: [
    "What is the strongest evidence available?",
    "What assumption is most fragile?",
    "What is one plausible competing explanation?",
    "How can I verify the final answer independently?"
  ]
};

function stripLatex(text: string): string {
  return text.replace(/\$+/g, "").replace(/\\[a-zA-Z]+/g, "").replace(/\s+/g, " ").trim();
}

export function buildLearnGuide(subject: string, subtopic: string): LearnGuide {
  const normalizedSubject = subject.trim().toLowerCase();
  const normalizedSubtopic = subtopic.trim().toLowerCase();
  const group = getGroupNameForCourse(subject);
  const course = getCourseByName(subject);
  const unitLabel = subtopic === "All Topics" ? "Comprehensive Review" : subtopic;

  const questionPool = ACTIVE_QUESTION_BANK.filter((q) => {
    const subjectMatch = q.subject.trim().toLowerCase() === normalizedSubject;
    if (!subjectMatch) return false;
    if (subtopic === "All Topics") return true;
    return q.subtopic.trim().toLowerCase() === normalizedSubtopic;
  });

  const samplePrompts = Array.from(
    new Set(
      questionPool
        .map((q) => stripLatex(q.question))
        .filter((q) => q.length > 0)
    )
  ).slice(0, 4);

  const keyMoves = DOMAIN_MOVES[group] ?? DOMAIN_MOVES.General;
  const commonMistakes = DOMAIN_MISTAKES[group] ?? DOMAIN_MISTAKES.General;
  const checkpoints = DOMAIN_CHECKPOINTS[group] ?? DOMAIN_CHECKPOINTS.General;

  const studyPlan = [
    `Warm-up (10 min): review core definitions and notation for ${unitLabel}.`,
    "Concept pass (20 min): solve 3-5 representative problems while writing each reasoning step.",
    "Error pass (15 min): revisit every miss and classify the failure type (concept, setup, execution, interpretation).",
    "Mastery pass (10 min): explain one hard problem out loud without notes."
  ];

  const overview =
    subtopic === "All Topics"
      ? `This guide covers all verified units in ${subject}. Focus on transferable reasoning patterns first, then rotate through unit-specific drills.`
      : `This guide targets ${unitLabel} in ${subject}. Use it to build concept clarity, reduce repeat errors, and improve exam-level execution.`;

  return {
    title: `${subject} • ${unitLabel}`,
    overview,
    keyMoves,
    commonMistakes,
    studyPlan,
    checkpoints,
    samplePrompts
  };
}

export function listUnitsForCourse(subject: string): string[] {
  const course = getCourseByName(subject);
  if (!course) return [];
  return course.subtopics;
}

export function listCoursesForGroup(groupName: string): string[] {
  return (
    {
      Mathematics: ["Algebra 1", "Algebra 2", "Geometry", "Calculus", "AP Calculus AB", "AP Calculus BC", "AP Statistics"],
      Science: ["Biology", "AP Biology", "Chemistry", "AP Chemistry", "Environmental Science", "AP Environmental Science"],
      "Social Studies": ["World History", "AP World History", "US Government", "AP US Government", "Economics", "AP Macroeconomics", "AP Microeconomics"],
      Technology: ["Computer Science", "AP Computer Science A"],
      Languages: ["Spanish", "AP Spanish"]
    }[groupName] ?? []
  );
}
