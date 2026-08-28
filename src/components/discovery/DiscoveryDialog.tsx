import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { interpolate, useI18n } from "@/lib/i18n";
import { type DiscoveryInterest, useUi } from "@/lib/ui-store";
import { cn } from "@/lib/utils";

const INTEREST_IDS: DiscoveryInterest[] = [
  "suite",
  "costora",
  "menura",
  "easyroom",
  "ledger",
  "bespoke",
];

const STORAGE_KEY = "syllogic-discovery-leads";

type Lead = {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: DiscoveryInterest;
  notes: string;
  at: string;
};

export function DiscoveryDialog() {
  const open = useUi((s) => s.discoveryOpen);
  const interest = useUi((s) => s.discoveryInterest);
  const close = useUi((s) => s.closeDiscovery);
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    notes: "",
    interest,
  });

  useEffect(() => {
    if (open) {
      setSent(false);
      setError(null);
      setForm((f) => ({ ...f, interest }));
    }
  }, [open, interest]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setError(t.discovery.errName);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t.discovery.errEmail);
      return;
    }
    if (form.company.trim().length < 2) {
      setError(t.discovery.errCompany);
      return;
    }
    const lead: Lead = {
      ...form,
      name: form.name.trim(),
      company: form.company.trim(),
      role: form.role.trim(),
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Lead[];
      localStorage.setItem(STORAGE_KEY, JSON.stringify([lead, ...prev].slice(0, 25)));
    } catch {
      /* ignore quota */
    }
    setSent(true);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (!v ? close() : null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-void/70 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed inset-x-3 top-[8%] z-50 mx-auto max-h-[84dvh] w-auto max-w-lg overflow-y-auto rounded-3xl bg-surface p-6 shadow-hairline sm:p-8",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-display text-2xl font-semibold text-fg">
                {t.discovery.title}
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                {t.discovery.body}
              </Dialog.Description>
            </div>
            <Dialog.Close
              className="inline-flex size-11 items-center justify-center rounded-xl text-muted hover:text-fg"
              aria-label={t.discovery.close}
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>

          {sent ? (
            <div className="mt-8 rounded-2xl bg-void/50 p-6 shadow-hairline">
              <CheckCircle2 className="size-6 text-ok" />
              <p className="mt-3 font-display text-lg font-semibold text-fg">
                {t.discovery.received}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {interpolate(t.discovery.followup, {
                  company: form.company || "—",
                  email: form.email,
                })}
              </p>
              <Button className="mt-6" onClick={close}>
                {t.discovery.close}
              </Button>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <Field
                label={t.discovery.name}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                autoComplete="name"
              />
              <Field
                label={t.discovery.email}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                autoComplete="email"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label={t.discovery.company}
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                  autoComplete="organization"
                />
                <Field
                  label={t.discovery.role}
                  value={form.role}
                  onChange={(v) => setForm({ ...form, role: v })}
                  autoComplete="organization-title"
                />
              </div>
              <div>
                <Label>{t.discovery.interest}</Label>
                <div className="flex flex-wrap gap-2">
                  {INTEREST_IDS.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setForm({ ...form, interest: id })}
                      className={cn(
                        "h-10 rounded-full px-3 text-sm shadow-hairline",
                        form.interest === id
                          ? "bg-fg text-void"
                          : "bg-elevated text-muted hover:text-fg",
                      )}
                    >
                      {t.discovery.interests[id]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="notes">{t.discovery.notes}</Label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full rounded-xl bg-elevated px-3.5 py-3 text-sm text-fg shadow-hairline placeholder:text-subtle focus-visible:shadow-hairline-hover focus-visible:outline-none"
                  placeholder={t.discovery.notesPh}
                />
              </div>
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              <Button type="submit" className="w-full" size="lg">
                {t.discovery.submit}
              </Button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
