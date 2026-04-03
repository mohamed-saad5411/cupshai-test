import { redirect } from "next/navigation";

// Explore page is temporarily disabled — will be added back later
export default function ExplorePage({ params }: { params: Promise<{ locale: string }> }) {
  redirect("/");
}
