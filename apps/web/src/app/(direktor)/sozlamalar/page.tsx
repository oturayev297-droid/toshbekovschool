import { PageHeader } from "@/components/layout/page-header";
import { SubjectsPanel, TelegramPanel, UsersPanel } from "@/components/settings/settings-panels";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const metadata = { title: "Sozlamalar" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Sozlamalar"
        description="Yo'nalishlar va narxlar, Telegram, foydalanuvchilar va rollar"
        actions={<Button>O&apos;zgarishlarni saqlash</Button>}
      />
      <Tabs defaultValue="fanlar">
        <TabsList aria-label="Sozlamalar bo'limlari">
          <TabsTrigger value="fanlar">Yo&apos;nalishlar va narxlar</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="foydalanuvchilar">Foydalanuvchilar va rollar</TabsTrigger>
        </TabsList>
        <TabsContent value="fanlar">
          <SubjectsPanel />
        </TabsContent>
        <TabsContent value="telegram">
          <TelegramPanel />
        </TabsContent>
        <TabsContent value="foydalanuvchilar">
          <UsersPanel />
        </TabsContent>
      </Tabs>
    </>
  );
}
