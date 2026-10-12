'use client';

import React, { useId } from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  error?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: FormOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
  id?: string;
}

export default function FormField({
  label,
  name,
  type = 'text',
  required = false,
  error,
  value,
  onChange,
  options = [],
  placeholder,
  className = '',
  disabled = false,
  rows = 4,
  id,
}: FormFieldProps) {
  const generatedId = useId();
  const fieldId = id || `${name}-${generatedId}`;
  const errorId = `${fieldId}-error`;

  const baseInputStyles =
    'w-full rounded-lg border bg-surface px-3.5 py-2.5 text-foreground placeholder:text-foreground/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent disabled:opacity-50 disabled:cursor-not-allowed';

  const borderStyles = error
    ? 'border-red-500 focus-visible:ring-red-500'
    : 'border-border';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`.trim()}>
      <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${baseInputStyles} ${borderStyles} resize-y`}
        />
      ) : type === 'select' ? (
        <select
          id={fieldId}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${baseInputStyles} ${borderStyles}`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={`${baseInputStyles} ${borderStyles}`}
        />
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-red-600 flex items-center gap-1 mt-0.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
