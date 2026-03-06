import { ACTIVE_QUESTION_BANK, Question } from "@/lib/questions-data";
import { getGroupNameForCourse } from "@/lib/course-catalog";

export type WorkedExample = {
  id: string;
  question: string;
  difficulty: "easy" | "medium" | "hard";
  correctAnswer: string;
  explanation: string;
};

export type KeyTerm = {
  term: string;
  definition: string;
};

export type ProcessBlock = {
  name: string;
  steps: string[];
};

export type FormulaBlock = {
  expression: string;
  meaning: string;
};

export type LearnPacket = {
  title: string;
  unitLabel: string;
  studyGuide: string;
  keyConcepts: string[];
  keyTerms: KeyTerm[];
  coreProcesses: ProcessBlock[];
  importantFormulas: FormulaBlock[];
  realExamples: string[];
  workedExamples: WorkedExample[];
  retrievalDrills: Array<{ prompt: string; answer: string }>;
  studyPlan: string[];
};

type KnowledgeTemplate = {
  concepts: string[];
  terms: KeyTerm[];
  processes: ProcessBlock[];
  formulas: FormulaBlock[];
  examples: string[];
};

const DOMAIN_DEFAULTS: Record<string, KnowledgeTemplate> = {
  Mathematics: {
    concepts: [
      "Translate word statements into symbolic relationships before solving.",
      "Match method to structure (equation, function behavior, rate, distribution).",
      "Validate with domain, sign, and units before finalizing."
    ],
    terms: [
      { term: "Domain", definition: "Set of input values for which an expression or function is defined." },
      { term: "Constraint", definition: "Condition that limits valid values/solutions." },
      { term: "Rate of Change", definition: "How one quantity changes relative to another." }
    ],
    processes: [
      {
        name: "General Solve Workflow",
        steps: [
          "Identify knowns, unknowns, and constraints.",
          "Select method aligned to problem structure.",
          "Execute algebra/calculus carefully.",
          "Substitute/check and interpret result in context."
        ]
      }
    ],
    formulas: [
      { expression: "m = (y2 - y1)/(x2 - x1)", meaning: "Slope / average rate of change." },
      { expression: "x = (-b ± sqrt(b^2 - 4ac)) / (2a)", meaning: "Quadratic formula for ax^2 + bx + c = 0." }
    ],
    examples: [
      "If a fee is fixed plus per-hour charge, write total cost as linear model C = fixed + rate·hours.",
      "In optimization, compute derivative, find critical points, then use context constraints to pick valid extreme value."
    ]
  },
  Science: {
    concepts: [
      "Scientific conclusions require claim + evidence + mechanism.",
      "Reliable experiments separate manipulated, measured, and controlled variables.",
      "Interpretation must include uncertainty and limitations."
    ],
    terms: [
      { term: "Control Variable", definition: "Factor held constant to isolate effect of independent variable." },
      { term: "Replication", definition: "Repeated trials to reduce random error and increase reliability." },
      { term: "Causal Inference", definition: "Conclusion that one variable produces change in another." }
    ],
    processes: [
      {
        name: "CER Response Structure",
        steps: [
          "State the claim clearly.",
          "Cite specific evidence (data/observation).",
          "Explain mechanism linking evidence to claim.",
          "Add uncertainty/limits statement."
        ]
      }
    ],
    formulas: [
      { expression: "F = ma", meaning: "Net force equals mass times acceleration." },
      { expression: "pH = -log[H+]", meaning: "Defines acidity from hydrogen ion concentration." }
    ],
    examples: [
      "If ATP production drops after mitochondrial inhibitor is added, evidence supports mitochondria as ATP production site.",
      "If temperature increases reaction rate, explain with collision frequency and activation energy threshold."
    ]
  },
  "Social Studies": {
    concepts: [
      "Strong historical/policy answers require specific evidence and context.",
      "Causal claims must explain mechanism, not just sequence of events.",
      "Counterevidence should be addressed directly."
    ],
    terms: [
      { term: "Primary Source", definition: "Evidence created in the period being studied." },
      { term: "Contextualization", definition: "Placing an event or policy in broader historical/system setting." },
      { term: "Causation", definition: "How and why one factor contributes to an outcome." }
    ],
    processes: [
      {
        name: "Document-Based Analysis",
        steps: [
          "Identify claim/prompt target.",
          "Extract evidence from sources.",
          "Evaluate source perspective/reliability.",
          "Build causal argument with counterevidence response."
        ]
      }
    ],
    formulas: [],
    examples: [
      "Industrialization increased urban labor demand, which pulled rural populations into cities.",
      "A constitutional claim is stronger when linked to exact clause plus precedent and consequence."
    ]
  },
  English: {
    concepts: [
      "Analytical writing requires arguable thesis and evidence-driven reasoning.",
      "Quote integration is only useful when followed by interpretation.",
      "Organization and transitions control coherence under timed conditions."
    ],
    terms: [
      { term: "Thesis", definition: "Central arguable claim that answers the prompt." },
      { term: "Commentary", definition: "Reasoning that explains how evidence supports the claim." },
      { term: "Rhetorical Device", definition: "Language choice used to create a specific audience effect." }
    ],
    processes: [
      {
        name: "Timed Analytical Paragraph",
        steps: [
          "Write a precise claim.",
          "Insert one targeted quote/detail.",
          "Explain effect/meaning in context.",
          "Close with claim-linked interpretation."
        ]
      }
    ],
    formulas: [],
    examples: [
      "Instead of summarizing plot, explain how diction choices create tone and persuade audience.",
      "Use transition language (however, therefore, consequently) to make logic explicit."
    ]
  },
  "Foreign Language": {
    concepts: [
      "Meaning accuracy and grammar accuracy must both be correct.",
      "Tense/mood choice depends on timeline and intent.",
      "Register and cohesion matter in advanced writing/speaking tasks."
    ],
    terms: [
      { term: "Agreement", definition: "Matching grammatical features (number/gender/person) across sentence elements." },
      { term: "Register", definition: "Formality level appropriate to audience and context." },
      { term: "Subjunctive", definition: "Mood used for doubt, emotion, recommendation, or non-factual situations." }
    ],
    processes: [
      {
        name: "Response Construction",
        steps: [
          "Determine intent and audience.",
          "Choose tense/mood structure.",
          "Draft with clear connectors.",
          "Proof agreement and meaning alignment."
        ]
      }
    ],
    formulas: [],
    examples: [
      "If narrating completed past events, use past forms consistently with timeline markers.",
      "In persuasive writing, transitions should show contrast/cause, not just list ideas."
    ]
  },
  Technology: {
    concepts: [
      "Correctness comes before optimization.",
      "Edge-case testing reveals hidden logic flaws.",
      "Algorithm choices should be justified by constraints and scale."
    ],
    terms: [
      { term: "Algorithm", definition: "Finite unambiguous steps for solving a problem." },
      { term: "Edge Case", definition: "Boundary or unusual input that can break naive solutions." },
      { term: "Time Complexity", definition: "How runtime grows as input size increases." }
    ],
    processes: [
      {
        name: "Implementation Validation",
        steps: [
          "Define input/output contract.",
          "Trace nominal and boundary cases.",
          "Run targeted tests.",
          "Assess complexity against constraints."
        ]
      }
    ],
    formulas: [
      { expression: "O(n), O(log n), O(n log n)", meaning: "Common runtime growth classes used in algorithm analysis." }
    ],
    examples: [
      "Binary search is valid only on sorted data; otherwise results are unreliable.",
      "A recursive method needs a base case and progress toward that base case."
    ]
  },
  "SAT Prep": {
    concepts: [
      "Test accuracy comes from evidence-first elimination.",
      "Pacing strategy matters as much as content knowledge.",
      "Math reliability depends on unit/sign/domain checks."
    ],
    terms: [
      { term: "Evidence Line", definition: "Exact text location that justifies an answer choice." },
      { term: "Distractor", definition: "Plausible wrong option built around common mistakes." },
      { term: "Pacing Checkpoint", definition: "Pre-set time marker used to stay on schedule." }
    ],
    processes: [
      {
        name: "SAT Question Workflow",
        steps: [
          "Classify question type.",
          "Find required evidence/data first.",
          "Eliminate choices with concrete contradiction.",
          "Verify final pick with prompt scope."
        ]
      }
    ],
    formulas: [
      { expression: "distance = rate × time", meaning: "Core applied relationship in SAT problem solving." }
    ],
    examples: [
      "In reading, choose the answer directly supported by text, not the one that sounds generally true.",
      "In math, isolate variable first, then test for extraneous solutions if operations changed domain."
    ]
  },
  "ACT Prep": {
    concepts: [
      "High ACT scores require fast classification + precise elimination.",
      "Data interpretation questions require reading axes/labels before inferring.",
      "Skipping and returning is a valid strategy for pacing control."
    ],
    terms: [
      { term: "Inference Question", definition: "Item requiring logical conclusion from provided evidence." },
      { term: "Conflicting Viewpoints", definition: "ACT Science passage type comparing competing explanations." },
      { term: "Time Box", definition: "Fixed time budget for a set of questions." }
    ],
    processes: [
      {
        name: "ACT Section Strategy",
        steps: [
          "Solve direct/easy items first.",
          "Mark and skip time-heavy items.",
          "Return with narrowed options.",
          "Do final evidence check before submit."
        ]
      }
    ],
    formulas: [
      { expression: "average rate = change / time", meaning: "Frequent ACT Math/Science relationship." }
    ],
    examples: [
      "In ACT Science, a graph trend question should reference exact axis values, not visual guesswork.",
      "In ACT English, preserve sentence meaning while correcting grammar and concision."
    ]
  }
};

const UNIT_OVERRIDES: Array<{ match: string[]; template: Partial<KnowledgeTemplate> }> = [
  {
    match: ["cellular energetics", "photosynthesis", "cell structure"],
    template: {
      terms: [
        { term: "ATP", definition: "Primary energy currency used by cells." },
        { term: "Oxidative Phosphorylation", definition: "ATP-producing process in inner mitochondrial membrane." },
        { term: "Chloroplast", definition: "Organelle where photosynthesis occurs in plants/algae." }
      ],
      formulas: [
        { expression: "6CO2 + 6H2O + light -> C6H12O6 + 6O2", meaning: "Photosynthesis overall reaction." }
      ]
    }
  },
  {
    match: ["stoichiometry", "equilibrium", "kinetics"],
    template: {
      formulas: [
        { expression: "n = m / M", meaning: "Moles from mass and molar mass." },
        { expression: "K = [products]^coeff / [reactants]^coeff", meaning: "Equilibrium constant expression." }
      ]
    }
  },
  {
    match: ["mean value theorem", "fundamental theorem", "area between curves", "volume of solids"],
    template: {
      formulas: [
        { expression: "f'(c) = (f(b)-f(a))/(b-a)", meaning: "Mean Value Theorem condition." },
        { expression: "d/dx \int_a^x f(t)dt = f(x)", meaning: "FTC Part I." },
        { expression: "Area = \int_a^b (top-bottom) dx", meaning: "Area between curves." }
      ]
    }
  },
  {
    match: ["supply and demand", "market structures", "stabilization policies"],
    template: {
      terms: [
        { term: "Equilibrium", definition: "Price/quantity where quantity demanded equals quantity supplied." },
        { term: "Inflation", definition: "Sustained increase in general price level." },
        { term: "Fiscal Policy", definition: "Government spending/tax actions affecting aggregate demand." }
      ]
    }
  }
];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function getDomainDefaults(group: string): KnowledgeTemplate {
  return DOMAIN_DEFAULTS[group] ?? DOMAIN_DEFAULTS["Social Studies"];
}

function applyUnitOverrides(subject: string, subtopic: string, base: KnowledgeTemplate): KnowledgeTemplate {
  const key = `${normalize(subject)} ${normalize(subtopic)}`;
  let concepts = [...base.concepts];
  let terms = [...base.terms];
  let processes = [...base.processes];
  let formulas = [...base.formulas];
  let examples = [...base.examples];

  for (const override of UNIT_OVERRIDES) {
    if (!override.match.some((m) => key.includes(m))) continue;
    if (override.template.concepts) concepts = Array.from(new Set([...concepts, ...override.template.concepts]));
    if (override.template.terms) {
      const merged = [...terms, ...override.template.terms];
      const seen = new Set<string>();
      terms = merged.filter((t) => {
        const id = normalize(t.term);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    }
    if (override.template.processes) processes = [...processes, ...override.template.processes];
    if (override.template.formulas) {
      const merged = [...formulas, ...override.template.formulas];
      const seen = new Set<string>();
      formulas = merged.filter((f) => {
        const id = normalize(f.expression);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      });
    }
    if (override.template.examples) examples = Array.from(new Set([...examples, ...override.template.examples]));
  }

  return { concepts, terms, processes, formulas, examples };
}

function answerForQuestion(q: Question): string {
  if (q.responseType === "input") {
    if (typeof q.numericAnswer === "number") return `${q.numericAnswer}`;
    if (q.acceptedAnswers && q.acceptedAnswers.length > 0) return q.acceptedAnswers[0];
    return "Constructed response";
  }
  return q.choices[q.answerIndex] ?? "See explanation";
}

function enhanceExplanation(q: Question): string {
  if (q.responseType === "input" || q.choices.length === 0) return q.explanation;
  const incorrect = q.choices
    .map((choice, index) => ({ choice, index }))
    .filter((c) => c.index !== q.answerIndex)
    .map((c) => c.choice)
    .slice(0, 3);

  const tail = incorrect.length > 0
    ? ` The incorrect options are common confusions but do not satisfy the exact concept/condition tested.`
    : "";

  return `${q.explanation}${tail}`;
}

function pickWorkedExamples(pool: Question[]): WorkedExample[] {
  const byDifficulty = [
    pool.find((q) => q.difficulty === "easy"),
    pool.find((q) => q.difficulty === "medium"),
    pool.find((q) => q.difficulty === "hard")
  ].filter((q): q is Question => Boolean(q));

  const fallback = pool.filter((q) => !byDifficulty.some((p) => p.id === q.id)).slice(0, Math.max(0, 4 - byDifficulty.length));

  return [...byDifficulty, ...fallback].slice(0, 4).map((q) => ({
    id: q.id,
    question: q.question,
    difficulty: q.difficulty,
    correctAnswer: answerForQuestion(q),
    explanation: enhanceExplanation(q)
  }));
}

function buildRetrievalDrills(subject: string, subtopic: string, terms: KeyTerm[]): Array<{ prompt: string; answer: string }> {
  const unit = subtopic === "All Topics" ? `${subject} comprehensive review` : `${subject} - ${subtopic}`;
  const drills: Array<{ prompt: string; answer: string }> = [
    {
      prompt: `Define the most important idea in ${unit} in one sentence.`,
      answer: "A high-scoring answer states the concept precisely and includes the condition under which it applies."
    },
    {
      prompt: `Name one common error in ${unit} and how to prevent it.`,
      answer: "Prevention should mention a concrete check (constraints, evidence alignment, grammar agreement, or edge-case test)."
    }
  ];

  terms.slice(0, 3).forEach((term) => {
    drills.push({
      prompt: `Recall drill: define '${term.term}' without notes.`,
      answer: term.definition
    });
  });

  return drills;
}

export function buildLearnPacket(subject: string, subtopic: string): LearnPacket {
  const group = getGroupNameForCourse(subject);
  const unitLabel = subtopic === "All Topics" ? "Comprehensive Review" : subtopic;

  const subjectPool = ACTIVE_QUESTION_BANK.filter((q) => normalize(q.subject) === normalize(subject));
  const scopedPool =
    subtopic === "All Topics"
      ? subjectPool
      : subjectPool.filter((q) => normalize(q.subtopic) === normalize(subtopic));

  const workingPool = scopedPool.length > 0 ? scopedPool : subjectPool;
  const workedExamples = pickWorkedExamples(workingPool);

  const base = getDomainDefaults(group);
  const withOverrides = applyUnitOverrides(subject, subtopic, base);

  const studyGuide =
    subtopic === "All Topics"
      ? `This study guide covers the major tested concepts across all units in ${subject}. Use it to build conceptual fluency before timed practice.`
      : `This study guide targets ${unitLabel} in ${subject}. Focus on concept accuracy, process execution, and exam-style error prevention.`;

  const studyPlan = [
    "Phase 1 (10 min): read Key Concepts and Key Terms out loud.",
    "Phase 2 (15 min): rehearse Core Processes step-by-step on a blank page.",
    "Phase 3 (15 min): solve Worked Examples without looking at answers first.",
    "Phase 4 (10 min): complete Retrieval Drills, then begin timed practice."
  ];

  return {
    title: `${subject} • ${unitLabel}`,
    unitLabel,
    studyGuide,
    keyConcepts: withOverrides.concepts.slice(0, 6),
    keyTerms: withOverrides.terms.slice(0, 8),
    coreProcesses: withOverrides.processes.slice(0, 3),
    importantFormulas: withOverrides.formulas.slice(0, 8),
    realExamples: withOverrides.examples.slice(0, 6),
    workedExamples,
    retrievalDrills: buildRetrievalDrills(subject, subtopic, withOverrides.terms),
    studyPlan
  };
}
