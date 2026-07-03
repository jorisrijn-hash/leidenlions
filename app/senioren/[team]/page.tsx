import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamDetail } from "@/components/TeamDetail";
import { seniorenTeams, teamBySlug } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return seniorenTeams.map((t) => ({ team: t.slug }));
}

export function generateMetadata({ params }: { params: { team: string } }): Metadata {
  const team = teamBySlug("senioren", params.team);
  if (!team) return {};
  return {
    title: team.name,
    description: `${team.name} van Leiden Lions. ${team.blurb}`,
  };
}

export default function SeniorenTeamPage({ params }: { params: { team: string } }) {
  const team = teamBySlug("senioren", params.team);
  if (!team) notFound();
  return <TeamDetail team={team} />;
}
