import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import { AiCenter } from "@/components/ai/ai-center";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { students } from "@/mock/data";

export const metadata = { title: "AI Markaz" };

export default function AiCenterPage() {
  return (
    <>
      <PageHeader
        title="AI Markaz"
        description="Bilim darajasi, kuchli/zaif tomonlar, xulq-atvor, shaxsiy reja va xatolar tahlili"
        actions={
          <Button variant="outline" asChild>
            <Link href="/mentor">
              <MessagesSquare /> AI Mentor (o&apos;quvchi ko&apos;rinishi)
            </Link>
          </Button>
        }
      />
      <AiCenter students={students} />
      <p className="mt-6 text-xs text-muted-foreground">
        Maket: tahlillar namunaviy. Haqiqiy tahlil 10-bosqichda Claude API orqali, o&apos;quvchi
        ma&apos;lumotlaridan tayyorlanadi.
      </p>
    </>
  );
}
