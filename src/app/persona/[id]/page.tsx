import { notFound } from "next/navigation";
import { PersonaChatClient } from "@/components/PersonaChatClient";
import { PERSONA_MAP, type PersonaId } from "@/lib/personas";

type PersonaPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PersonaPage({ params }: PersonaPageProps) {
  const { id } = await params;
  const persona = PERSONA_MAP[id as PersonaId];

  if (!persona) {
    notFound();
  }

  return <PersonaChatClient persona={persona} />;
}
