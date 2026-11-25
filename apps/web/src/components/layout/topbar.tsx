"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Bell, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { SidebarBody } from "./sidebar";

export function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b bg-card/90 px-4 backdrop-blur sm:px-6">
      {/* Mobil / planshet: menyu tugmasi + logo */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menyuni ochish">
            <Menu className="size-5" />
          </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-overlay data-[state=open]:animate-in data-[state=open]:slide-in-from-left">
            <Dialog.Title className="sr-only">Asosiy menyu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Bo&apos;limlar ro&apos;yxati
            </Dialog.Description>
            <SidebarBody onNavigate={() => setOpen(false)} />
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-3 grid size-8 place-items-center rounded-md text-white/80 hover:bg-white/10"
                aria-label="Menyuni yopish"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="lg:hidden">
        <Logo size={28} withText={false} />
      </div>

      {/* Qidiruv */}
      <label className="relative ml-auto hidden max-w-md flex-1 md:block lg:ml-0">
        <span className="sr-only">Qidirish</span>
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="O'quvchi, o'qituvchi yoki to'lovni qidirish…"
          className="h-10 w-full rounded-md border bg-background pr-3 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/30 focus-visible:outline-none"
        />
      </label>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Bildirishnomalar" className="relative">
          <Bell className="size-5" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-accent" aria-hidden />
        </Button>
        <div className="flex items-center gap-2.5">
          <div className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
            D
          </div>
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-semibold">Direktor</p>
            <p className="text-xs text-muted-foreground">Platforma rahbari</p>
          </div>
        </div>
      </div>
    </header>
  );
}
