import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";

export type ReferenceRole = "auto" | "person" | "background" | "style";

type Props = {
  files: File[];
  onFilesChange: (next: File[]) => void;

  roles: ReferenceRole[];
  onRolesChange: (next: ReferenceRole[]) => void;

  disabled?: boolean;
  existingUrls?: string[]; // para mostrar referencias ya guardadas en DB
  maxFiles?: number; // default 2
  maxSizeMb?: number; // default 6
};

const ALLOWED_MIME = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const ROLE_OPTIONS: ReferenceRole[] = ["auto", "person", "background", "style"];

export default function ReferenceImagesSelector({
  files,
  onFilesChange,
  roles,
  onRolesChange,
  disabled = false,
  existingUrls = [],
  maxFiles = 2,
  maxSizeMb = 6,
}: Props) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Dropdown open state (tipo StyleSelector)
  const [openRoleIndex, setOpenRoleIndex] = useState<number | null>(null);
  const roleDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getRoleName = (role: ReferenceRole) =>
    t(`generate.form.referenceImages.roles.${role}`, { defaultValue: role });

  // Opcional: si no existen estas keys, queda vacío (igual se ve “como StyleSelector”)
  const getRoleDescription = (role: ReferenceRole) =>
    t(`generate.form.referenceImages.rolesDescriptions.${role}`, {
      defaultValue: "",
    });

  // Previews para File[]
  const previews = useMemo(() => {
    return files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      for (const p of previews) URL.revokeObjectURL(p.url);
    };
  }, [previews]);

  // Cerrar dropdown al click afuera
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (openRoleIndex === null) return;
      const el = roleDropdownRefs.current[openRoleIndex];
      if (!el) return;

      const target = e.target as Node | null;
      if (target && !el.contains(target)) setOpenRoleIndex(null);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openRoleIndex]);

  const openPicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const validateAndMerge = (incoming: File[]) => {
    const maxBytes = maxSizeMb * 1024 * 1024;

    const valid: File[] = [];
    for (const f of incoming) {
      if (!ALLOWED_MIME.includes(f.type)) {
        toast.error(t("generate.form.referenceImages.errors.invalidType"));
        continue;
      }
      if (f.size > maxBytes) {
        toast.error(
          t("generate.form.referenceImages.errors.tooLarge", { mb: maxSizeMb }),
        );
        continue;
      }
      valid.push(f);
    }

    const merged = [...files, ...valid].slice(0, maxFiles);

    if (merged.length < files.length + valid.length) {
      toast.error(
        t("generate.form.referenceImages.errors.tooMany", { n: maxFiles }),
      );
    }

    onFilesChange(merged);

    // Ajustar roles al mismo largo
    const nextRoles = [...roles];
    while (nextRoles.length < merged.length) nextRoles.push("auto");
    onRolesChange(nextRoles.slice(0, merged.length));
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files ? Array.from(e.target.files) : [];
    e.target.value = "";
    if (!list.length) return;
    validateAndMerge(list);
  };

  const removeAt = (idx: number) => {
    const nextFiles = files.filter((_, i) => i !== idx);
    const nextRoles = roles.filter((_, i) => i !== idx);
    onFilesChange(nextFiles);
    onRolesChange(nextRoles);

    if (openRoleIndex === idx) setOpenRoleIndex(null);
  };

  const setRoleAt = (idx: number, role: ReferenceRole) => {
    const next = [...roles];
    next[idx] = role;
    onRolesChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label className="block text-sm font-medium text-zinc-100">
          {t("generate.form.referenceImages.label")}{" "}
          <span className="text-zinc-400 text-xs">
            {t("generate.form.optional")}
          </span>
        </label>

        <button
          type="button"
          onClick={openPicker}
          disabled={disabled || files.length >= maxFiles}
          className={[
            "text-xs px-3 py-1.5 rounded-lg border transition-colors",
            "border-white/12 bg-white/6 text-zinc-100 hover:bg-white/10",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          {t("generate.form.referenceImages.add")}
        </button>
      </div>

      <p className="text-xs text-zinc-400">
        {t("generate.form.referenceImages.hint")}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        multiple
        onChange={onPick}
        className="hidden"
        disabled={disabled}
      />

      {/* Existing (from DB) */}
      {existingUrls.length > 0 && (
        <div className="rounded-xl bg-white/6 border border-white/10 p-3">
          <p className="text-xs text-zinc-300 mb-2">
            {t("generate.form.referenceImages.savedLabel")}
          </p>

          <div className="grid grid-cols-2 gap-2">
            {existingUrls.slice(0, maxFiles).map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20 aspect-video"
              >
                <img
                  src={url}
                  alt={`reference-${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Array.from({ length: maxFiles }).map((_, slot) => {
          const p = previews[slot];
          const currentRole: ReferenceRole = roles[slot] ?? "auto";
          const roleDesc = getRoleDescription(currentRole);

          const isRoleDisabled = disabled || !p;
          const isOpen = openRoleIndex === slot;

          return (
            <div
              key={slot}
              className={[
                "rounded-xl border bg-white/6 border-white/10",
                "shadow-sm",
                // IMPORTANTE: sin overflow-hidden para que el dropdown no se recorte
              ].join(" ")}
            >
              <div className="p-3 flex items-center justify-between gap-2">
                <p className="text-xs text-zinc-300">
                  {t("generate.form.referenceImages.slot", { n: slot + 1 })}
                </p>

                {p ? (
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => removeAt(slot)}
                    className="text-xs px-2 py-1 rounded-md border border-white/12 bg-black/20 text-zinc-100 hover:bg-black/30 disabled:opacity-60"
                  >
                    {t("generate.form.referenceImages.remove")}
                  </button>
                ) : null}
              </div>

              <button
                type="button"
                onClick={openPicker}
                disabled={disabled || !!p || files.length >= maxFiles}
                className={[
                  "relative w-full aspect-video flex items-center justify-center",
                  "border-t border-white/10 bg-black/20",
                  "hover:bg-black/30 transition-colors",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                  // Esto sí puede tener overflow-hidden si querés recortar la imagen
                  "overflow-hidden",
                ].join(" ")}
              >
                {p ? (
                  <img
                    src={p.url}
                    alt={`picked-${slot + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center px-4">
                    <p className="text-sm text-zinc-100">
                      {t("generate.form.referenceImages.dropTitle")}
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      {t("generate.form.referenceImages.dropHint", {
                        mb: maxSizeMb,
                      })}
                    </p>
                  </div>
                )}
              </button>

              {/* Role (mismo estilo que StyleSelector) */}
              <div
                className="p-3 border-t border-white/10 relative"
                ref={(node) => {
                  roleDropdownRefs.current[slot] = node;
                }}
              >
                <p className="text-xs text-zinc-400 mb-2">
                  {t("generate.form.referenceImages.roleLabel")}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenRoleIndex(isOpen ? null : slot)}
                  disabled={isRoleDisabled}
                  className={[
                    "flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition",
                    "bg-white/8 border-white/10 text-zinc-200 hover:bg-white/12",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                  ].join(" ")}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium">
                      <span>{getRoleName(currentRole)}</span>
                    </div>

                    {roleDesc ? (
                      <p className="text-xs text-zinc-400">{roleDesc}</p>
                    ) : null}
                  </div>

                  <ChevronDown
                    className={[
                      "h-5 w-5 text-zinc-400 transition transform",
                      isOpen && "rotate-180",
                    ].join(" ")}
                  />
                </button>

                {isOpen && !isRoleDisabled && (
                  <div className="absolute left-0 right-0 z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
                    {ROLE_OPTIONS.map((role) => {
                      const name = getRoleName(role);
                      const desc = getRoleDescription(role);
                      const selected = role === currentRole;

                      return (
                        <button
                          key={role}
                          type="button"
                          onClick={() => {
                            setRoleAt(slot, role);
                            setOpenRoleIndex(null);
                          }}
                          className={[
                            "flex w-full items-start gap-3 px-4 py-3 text-left transition",
                            "hover:bg-black/30",
                            selected && "bg-black/30",
                          ].join(" ")}
                        >
                          <div>
                            <p className="font-medium text-zinc-200">{name}</p>
                            {desc ? (
                              <p className="text-xs text-zinc-400">{desc}</p>
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
