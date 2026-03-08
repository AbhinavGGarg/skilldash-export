import type { PersonaId } from "@/lib/personas";

export type BritannicaBrief = {
  subject: string;
  historicalContext: string;
  funFacts: string[];
  source: string;
};

const BRITANNICA_BRIEFS: Partial<Record<PersonaId, BritannicaBrief>> = {
  mlk: {
    subject: "U.S. Civil Rights History",
    historicalContext:
      "Mid-20th-century United States, when mass organizing, legal challenges, and nonviolent protest confronted segregation.",
    funFacts: [
      "Martin Luther King, Jr. helped lead the 1955-56 Montgomery bus boycott movement period.",
      "His 1963 'I Have a Dream' speech became a defining civil rights address.",
      "King received the Nobel Peace Prize in 1964.",
    ],
    source: "https://www.britannica.com/biography/Martin-Luther-King-Jr",
  },
  rosa: {
    subject: "U.S. Civil Rights History",
    historicalContext:
      "1950s U.S. segregation era, when Black communities organized sustained action against discriminatory laws and customs.",
    funFacts: [
      "Rosa Parks refused to give up her bus seat in Montgomery, Alabama, on December 1, 1955.",
      "Her arrest became a key catalyst for the Montgomery bus boycott.",
      "The boycott became one of the most influential mass protests of the civil rights era.",
    ],
    source: "https://www.britannica.com/biography/Rosa-Parks",
  },
  malcolmx: {
    subject: "U.S. Civil Rights History",
    historicalContext:
      "1950s-1960s U.S. racial justice struggles, with competing strategies over integration, self-determination, and political power.",
    funFacts: [
      "Malcolm X emerged as a major spokesperson associated with the Nation of Islam before later ideological changes.",
      "His autobiography became a major text in Black political thought.",
      "He was assassinated in 1965, after a period of evolving public views.",
    ],
    source: "https://www.britannica.com/biography/Malcolm-X",
  },
  douglass: {
    subject: "19th-Century U.S. History and Abolition",
    historicalContext:
      "Antebellum and Civil War-era United States, when abolitionists fought slavery through speeches, print, and political organizing.",
    funFacts: [
      "Frederick Douglass escaped slavery and became a leading abolitionist orator.",
      "His 1845 autobiography, Narrative of the Life of Frederick Douglass, brought global attention to slavery's brutality.",
      "Douglass remained influential in debates about emancipation and citizenship rights.",
    ],
    source: "https://www.britannica.com/biography/Frederick-Douglass",
  },
  tubman: {
    subject: "U.S. Black History and Abolition",
    historicalContext:
      "Antebellum and Civil War-era United States, when enslaved people resisted bondage and abolitionist networks fought slavery.",
    funFacts: [
      "Harriet Tubman escaped slavery and later became the most famous conductor of the Underground Railroad.",
      "She led multiple rescue missions that helped enslaved people reach freedom.",
      "Tubman also served the Union during the Civil War, including in scouting and support roles.",
    ],
    source: "https://www.britannica.com/biography/Harriet-Tubman",
  },
  dubois: {
    subject: "U.S. Black Intellectual and Civil Rights History",
    historicalContext:
      "Post-Reconstruction through early 20th century, when Black scholars and activists contested segregation and disenfranchisement.",
    funFacts: [
      "W. E. B. Du Bois published The Souls of Black Folk in 1903.",
      "He helped launch the Niagara Movement, a precursor stream to later civil rights organizing.",
      "Du Bois became one of the most influential Black scholars and public intellectuals of his era.",
    ],
    source: "https://www.britannica.com/biography/W-E-B-Du-Bois",
  },
  marshall: {
    subject: "U.S. Civil Rights Legal History",
    historicalContext:
      "Mid-20th-century United States, when constitutional litigation became a central strategy against segregation.",
    funFacts: [
      "Thurgood Marshall was lead counsel in Brown v. Board of Education (1954).",
      "The Brown decision ended legal segregation in public schools under the 'separate but equal' doctrine.",
      "Marshall later became the first African American U.S. Supreme Court justice.",
    ],
    source: "https://www.britannica.com/biography/Thurgood-Marshall",
  },
  katherinejohnson: {
    subject: "Black History in STEM and Space Exploration",
    historicalContext:
      "Cold War-era U.S. space race, when high-precision mathematics was critical to orbital and mission planning.",
    funFacts: [
      "Katherine Johnson calculated trajectories and launch windows for key NASA missions.",
      "Her verified calculations were trusted for John Glenn's orbital mission planning.",
      "Johnson became a major symbol of Black excellence in mathematics and aerospace history.",
    ],
    source: "https://www.britannica.com/biography/Katherine-Johnson",
  },
  washington: {
    subject: "Early United States and Founding Era History",
    historicalContext:
      "Late 18th-century Atlantic world, when the American Revolution and constitutional experiments reshaped political institutions.",
    funFacts: [
      "George Washington served as commander in chief of the Continental Army during the American Revolution.",
      "He became the first president of the United States in 1789 and set key executive precedents.",
      "Washington voluntarily stepped down after two terms, helping establish the norm of peaceful transfer of power.",
    ],
    source: "https://www.britannica.com/biography/George-Washington",
  },
  newton: {
    subject: "History of Physics: Classical Mechanics",
    historicalContext:
      "Late 17th-century Scientific Revolution in England, when mathematics became central to natural philosophy.",
    funFacts: [
      "In 1687, Newton published the Principia, formalizing the laws of motion.",
      "His formulation connected celestial and terrestrial mechanics through universal gravitation.",
      "Newton also made major optics contributions, including showing white light is composed of component colors.",
    ],
    source: "https://www.britannica.com/biography/Isaac-Newton",
  },
  galileo: {
    subject: "History of Physics: Observational Astronomy and Motion",
    historicalContext:
      "Early 17th-century Italy, where telescope-based observation disrupted long-held Aristotelian and geocentric models.",
    funFacts: [
      "Galileo's telescopic observations in 1610 identified the four largest moons of Jupiter.",
      "His work on falling bodies and inertia helped shift physics toward quantitative experimentation.",
      "He defended heliocentrism and faced the Inquisition in 1633, a pivotal science-and-authority moment.",
    ],
    source: "https://www.britannica.com/biography/Galileo-Galilei",
  },
  curie: {
    subject: "History of Physics: Radioactivity and Modern Science",
    historicalContext:
      "Late 19th and early 20th centuries, when atomic science and laboratory methods transformed physics and chemistry.",
    funFacts: [
      "Marie and Pierre Curie announced the discoveries of polonium and radium in 1898.",
      "Curie won the Nobel Prize in Physics (1903) and later the Nobel Prize in Chemistry (1911).",
      "She became the first woman to win a Nobel Prize and remains a landmark figure in scientific history.",
    ],
    source: "https://www.britannica.com/biography/Marie-Curie",
  },
  tesla: {
    subject: "History of Physics: Electricity and Power Systems",
    historicalContext:
      "Late 19th-century electrification era in the U.S. and Europe, when practical power transmission became a civilizational infrastructure challenge.",
    funFacts: [
      "Tesla developed and patented rotating magnetic field concepts foundational to AC machinery.",
      "Westinghouse acquired key Tesla AC patents in 1888, accelerating alternating-current system adoption.",
      "Tesla introduced the Tesla coil in 1891, an iconic high-voltage resonant transformer design.",
    ],
    source: "https://www.britannica.com/biography/Nikola-Tesla",
  },
};

export function getBritannicaBrief(personaId: PersonaId): BritannicaBrief | null {
  return BRITANNICA_BRIEFS[personaId] ?? null;
}
