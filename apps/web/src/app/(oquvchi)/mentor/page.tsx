import { MentorChat } from "@/components/ai/mentor-chat";
import { RoleHeader } from "@/components/layout/role-header";
import { students } from "@/mock/data";

export const metadata = { title: "AI Mentor" };

export default function MentorPage() {
  return (
    <>
      <RoleHeader role="O'quvchi · AI mentorlar" />
      <main id="main" className="mx-auto w-full max-w-5xl px-4 py-4 lg:py-6">
        <MentorChat students={students} />
      </main>
    </>
  );
}
