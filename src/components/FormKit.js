// Shared pieces for the dashboard forms (Add Patient, Add Doctor, Add Appointment).
import React, { useState } from "react";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { Field, ErrorMessage, useField } from "formik";
import { FaTimes } from "react-icons/fa";

export const inputClass =
  "w-full rounded-xl border border-main-color/15 bg-cream px-4 py-2.5 text-sm text-main-color outline-none transition placeholder:text-main-color/35 focus:border-primary-color focus:ring-2 focus:ring-primary-color/30";

// Turns whatever the API sends back into one readable sentence.
export const apiErrorText = (err) => {
  const data = err?.response?.data;
  if (!data) return "We couldn't reach the server. Please try again.";
  if (typeof data === "string") return data;
  if (Array.isArray(data)) return data.join(" ");
  if (data.error) return `${data.error}`;
  return Object.entries(data)
    .map(([key, val]) => {
      const msg = Array.isArray(val) ? val.join(" ") : `${val}`;
      return key === "non_field_errors" || key === "detail"
        ? msg
        : `${key.replace(/_/g, " ")}: ${msg}`;
    })
    .join(" · ");
};

// The pop-up frame. Must be rendered inside a headlessui <Dialog>.
export const FormModal = ({ eyebrow, title, subtitle, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-6">
    <DialogPanel className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
      <div className="flex items-start justify-between gap-4 border-b border-main-color/10 px-6 py-5 sm:px-8">
        <div>
          {eyebrow && <p className="eyebrow mb-1">{eyebrow}</p>}
          <DialogTitle className="mb-0 font-display text-2xl text-main-color sm:text-3xl">
            {title}
          </DialogTitle>
          {subtitle && <p className="mb-0 mt-1 text-sm text-main-color/60">{subtitle}</p>}
        </div>
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="shrink-0 rounded-full p-2.5 text-main-color/50 transition-colors hover:bg-cream hover:text-main-color"
          >
            <FaTimes />
          </button>
        )}
      </div>
      {children}
    </DialogPanel>
  </div>
);

// Scrollable area that holds the fields.
export const FormBody = ({ children }) => (
  <div className="grid min-h-0 flex-1 grid-cols-1 content-start gap-x-5 gap-y-5 overflow-y-auto px-6 py-6 sm:grid-cols-2 sm:px-8">
    {children}
  </div>
);

export const SectionTitle = ({ children }) => (
  <div className="border-b border-main-color/10 pb-2 pt-2 sm:col-span-2">
    <p className="eyebrow mb-0">{children}</p>
  </div>
);

// Label + field + error message.
export const Shell = ({ name, label, required, hint, full, children }) => (
  <div className={full ? "sm:col-span-2" : ""}>
    {label && (
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-main-color">
        {label} {required && <span className="text-primary-color">*</span>}
      </label>
    )}
    {children}
    {hint && <p className="mb-0 mt-1 text-xs text-main-color/50">{hint}</p>}
    {name && (
      <ErrorMessage name={name} component="p" className="mb-0 mt-1 text-xs text-red-600" />
    )}
  </div>
);

export const TextField = ({ name, label, required, hint, full, ...rest }) => (
  <Shell name={name} label={label} required={required} hint={hint} full={full}>
    <Field id={name} name={name} className={inputClass} {...rest} />
  </Shell>
);

export const SelectField = ({ name, label, required, hint, full, children, ...rest }) => (
  <Shell name={name} label={label} required={required} hint={hint} full={full}>
    <Field as="select" id={name} name={name} className={inputClass} {...rest}>
      {children}
    </Field>
  </Shell>
);

export const TextAreaField = ({ name, label, required, hint, full = true, rows = 3, ...rest }) => (
  <Shell name={name} label={label} required={required} hint={hint} full={full}>
    <Field as="textarea" id={name} name={name} rows={rows} className={inputClass} {...rest} />
  </Shell>
);

// "Penicillin, Latex" typed as text, saved as a list.
export const ListField = ({ name, label, hint, full, placeholder }) => {
  const [field, , helpers] = useField(name);
  const [text, setText] = useState(Array.isArray(field.value) ? field.value.join(", ") : "");
  return (
    <Shell name={name} label={label} hint={hint || "Separate items with commas"} full={full}>
      <input
        id={name}
        value={text}
        placeholder={placeholder}
        className={inputClass}
        onChange={(e) => {
          setText(e.target.value);
          helpers.setValue(
            e.target.value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          );
        }}
      />
    </Shell>
  );
};

// Tap-to-select chips (days of the week, time slots...).
export const ChipGroup = ({ options, value, onToggle, isDisabled }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => {
      const { key, label } = typeof opt === "string" ? { key: opt, label: opt } : opt;
      const selected = Array.isArray(value) ? value.includes(key) : value === key;
      const disabled = isDisabled?.(key);
      return (
        <button
          key={key}
          type="button"
          disabled={disabled}
          onClick={() => onToggle(key)}
          className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
            selected
              ? "border-main-color bg-main-color text-white"
              : disabled
                ? "cursor-not-allowed border-main-color/10 bg-main-color/5 text-main-color/30 line-through"
                : "border-main-color/15 bg-cream text-main-color hover:border-primary-color"
          }`}
        >
          {label}
        </button>
      );
    })}
  </div>
);

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const DaysField = ({ name, label, hint }) => {
  const [field, , helpers] = useField(name);
  const value = field.value || [];
  return (
    <Shell name={name} label={label} hint={hint} full>
      <ChipGroup
        options={DAYS.map((d) => ({ key: d, label: d.slice(0, 3) }))}
        value={value}
        onToggle={(day) =>
          helpers.setValue(value.includes(day) ? value.filter((d) => d !== day) : [...value, day])
        }
      />
    </Shell>
  );
};

// Cancel + submit buttons, with an error message above them.
export const FormFooter = ({ onCancel, submitting, submitLabel = "Save", error }) => (
  <div className="border-t border-main-color/10 bg-white px-6 py-4 sm:px-8">
    {error && (
      <p className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
        {error}
      </p>
    )}
    <div className="flex justify-end gap-3">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-main-color/20 px-6 py-2.5 text-sm text-main-color transition-colors hover:bg-cream"
        >
          Cancel
        </button>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-primary-color px-8 py-2.5 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
      >
        {submitting ? "Saving…" : submitLabel}
      </button>
    </div>
  </div>
);
