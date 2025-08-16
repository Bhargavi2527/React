"use client"

import React, { useState, useMemo } from "react"
import { Eye, EyeOff, X, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

export interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  variant?: "filled" | "outlined" | "ghost"
  size?: "sm" | "md" | "lg"
  type?: "text" | "password" | "email"
  showClearButton?: boolean
  className?: string
  id?: string
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled = false,
      invalid = false,
      loading = false,
      variant = "outlined",
      size = "md",
      type = "text",
      showClearButton = false,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const [internalValue, setInternalValue] = useState("")

    const isControlled = value !== undefined
    const displayValue = isControlled ? value : internalValue

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value)
      }
      onChange?.(e)
    }

    const handleClear = () => {
      const input = ref && "current" in ref ? ref.current : null
      if (input) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set
        nativeInputValueSetter?.call(input, "")

        const event = new Event("input", { bubbles: true })
        input.dispatchEvent(event)
      }

      if (!isControlled) {
        setInternalValue("")
      }

      const syntheticEvent = {
        target: { value: "" },
        currentTarget: { value: "" },
        preventDefault: () => {},
        stopPropagation: () => {},
      } as React.ChangeEvent<HTMLInputElement>

      onChange?.(syntheticEvent)
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    const inputId = useMemo(() => {
      return id || `input-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    }, [id])

    const isError = invalid || !!errorMessage

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-3 text-sm",
      lg: "h-12 px-4 text-base",
    }

    const variantClasses = {
      filled: cn(
        "bg-muted border-transparent",
        "focus:bg-background focus:border-ring",
        isError && "bg-destructive/10 border-destructive focus:border-destructive",
        disabled && "bg-muted/50",
      ),
      outlined: cn(
        "bg-background border-input",
        "focus:border-ring",
        isError && "border-destructive focus:border-destructive",
        disabled && "bg-muted/20",
      ),
      ghost: cn(
        "bg-transparent border-transparent",
        "focus:bg-muted focus:border-ring",
        isError && "focus:border-destructive",
        disabled && "bg-transparent",
      ),
    }

    const labelSizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm",
    }

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block font-medium text-foreground mb-1.5",
              labelSizeClasses[size],
              disabled && "text-muted-foreground",
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={type === "password" && showPassword ? "text" : type}
            value={displayValue}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            aria-invalid={isError}
            aria-describedby={helperText || errorMessage ? `${inputId}-description` : undefined}
            className={cn(
              "w-full rounded-md border transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-ring/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "placeholder:text-muted-foreground",
              sizeClasses[size],
              variantClasses[variant],
              (type === "password" || (showClearButton && displayValue) || loading) && "pr-10",
            )}
            {...props}
          />

          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </div>
          )}

          {!loading && showClearButton && displayValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear input"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {!loading && !showClearButton && type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>

        {(helperText || errorMessage) && (
          <p
            id={`${inputId}-description`}
            className={cn("mt-1.5 text-xs", isError ? "text-destructive" : "text-muted-foreground")}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  },
)

InputField.displayName = "InputField"
