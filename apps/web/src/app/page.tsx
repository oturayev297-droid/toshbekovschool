import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-primary">ToshbekovSchool</h1>
        <p className="text-muted-foreground">Salom! Tizim tayyorlanmoqda.</p>
        <div className="flex justify-center gap-2">
          <Button>Asosiy tugma</Button>
          <Button variant="outline">Ikkinchi tugma</Button>
        </div>
      </div>
    </main>
  );
}
