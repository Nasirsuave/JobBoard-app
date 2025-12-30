import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function RenderDynamicField({ field, value, error, onChange, inputRef }) {
  const { name, label, required, type } = field;

  return (
    <div className="w-full">
      <Label htmlFor={name} className="mb-1 block font-medium ml-[0.5rem]">
        {label} {required ? "*" : ""}
      </Label>

      {type === "textarea" ? (
        <textarea
          id={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          className="w-full rounded-md border px-3 py-2 resize-vertical"
          rows={4}
        />
      ) : type === "file" ? (
        <Input
          id={name}
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={(e) => onChange(name, e.target.files?.[0] || null)}
          className="w-[90%]  ml-[0.5rem]"
        />
      ) : (
        <Input
          id={name}
          type={type}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={type === "url" ? "https://example.com" : ""}
          className="w-[90%]  ml-[0.5rem]"
        />
      )}

      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
  );
}
