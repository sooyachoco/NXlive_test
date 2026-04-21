import React, { useId } from 'react'
import { cn } from '../lib/cn'

type InputVariant = 'outlined' | 'filled' | 'underlined'
type InputSize = 'xsmall' | 'small' | 'medium' | 'large'
type InputState = 'enabled' | 'hover' | 'focused' | 'activated' | 'disabled' | 'error'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant
  size?: InputSize
  state?: InputState
  label?: string
  message?: string
  counter?: boolean
  maxLength?: number
  rightIcon?: React.ReactNode
  className?: string
  wrapperClassName?: string
}

const sizeClasses: Record<InputSize, string> = {
  xsmall: 'h-8 px-2 py-[6px] text-[12px] leading-[18px] tracking-[-0.26px] rounded-[3px]',
  small:  'h-10 px-[13px] py-2 text-[14px] leading-[22px] tracking-[-0.3px] rounded-[3px]',
  medium: 'h-12 px-[17px] py-[11px] text-[16px] leading-[24px] tracking-[-0.35px] rounded-[4px]',
  large:  'h-14 px-4 py-[12.5px] text-[18px] leading-[28px] tracking-[-0.4px] rounded-[5px]',
}

const variantBaseClasses: Record<InputVariant, string> = {
  outlined:   'bg-white border',
  filled:     'bg-lb-100 border',
  underlined: 'bg-transparent border-0 border-b rounded-none',
}

function getStateClasses(variant: InputVariant, state: InputState): string {
  if (state === 'disabled') {
    return variant === 'underlined'
      ? 'border-bc-300 bg-transparent opacity-50 cursor-not-allowed'
      : 'border-bc-300 bg-bc-100 opacity-50 cursor-not-allowed'
  }
  if (state === 'error') {
    return variant === 'underlined'
      ? 'border-error'
      : 'border-error'
  }
  if (state === 'enabled') {
    return variant === 'filled'
      ? 'border-bc-100'
      : variant === 'underlined'
      ? 'border-bc-200'
      : 'border-bc-200'
  }
  // hover, focused, activated
  if (state === 'activated') {
    return variant === 'filled'
      ? 'border-bc-100'
      : variant === 'underlined'
      ? 'border-bc-200'
      : 'border-bc-200'
  }
  return variant === 'underlined' ? 'border-pc-800' : 'border-pc-800'
}

export function Input({
  variant = 'outlined',
  size = 'medium',
  state = 'enabled',
  label,
  message,
  counter = false,
  maxLength,
  value,
  defaultValue,
  rightIcon,
  className,
  wrapperClassName,
  id: providedId,
  ...props
}: InputProps) {
  const autoId = useId()
  const id = providedId ?? autoId

  const [internalValue, setInternalValue] = React.useState(defaultValue ?? '')
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = state === 'disabled'

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!isControlled) setInternalValue(e.target.value)
    props.onChange?.(e)
  }

  const charCount = String(currentValue ?? '').length

  return (
    <div className={cn('flex flex-col gap-1 w-full font-sans', wrapperClassName)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[14px] leading-[22px] tracking-[-0.3px] font-medium text-bc-1000"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        <input
          id={id}
          value={currentValue}
          disabled={isDisabled}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            'w-full font-sans text-bc-1000 placeholder:text-bc-500 outline-none transition-colors',
            sizeClasses[size],
            variantBaseClasses[variant],
            getStateClasses(variant, state),
            rightIcon ? 'pr-10' : '',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 flex items-center text-bc-500 pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {(message || counter) && (
        <div className="flex justify-between items-center gap-1">
          {message && (
            <span
              className={cn(
                'text-[12px] leading-[18px] tracking-[-0.26px]',
                state === 'error' ? 'text-error' : 'text-bc-500',
              )}
            >
              {message}
            </span>
          )}
          {counter && maxLength && (
            <span className="ml-auto text-[12px] leading-[18px] tracking-[-0.26px] text-bc-500">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
