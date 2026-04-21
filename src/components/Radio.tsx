import React, { useId } from 'react'
import { cn } from '../lib/cn'

type RadioSize = 'medium' | 'small' | 'xsmall'
type RadioState = 'enabled' | 'hover' | 'disabled' | 'error'

export interface RadioProps {
  size?: RadioSize
  state?: RadioState
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  name?: string
  value?: string
  compact?: boolean
  className?: string
  id?: string
}

const circleSizeClasses: Record<RadioSize, string> = {
  medium: 'w-6 h-6',
  small:  'w-5 h-5',
  xsmall: 'w-4 h-4',
}

const dotSizeClasses: Record<RadioSize, string> = {
  medium: 'w-3 h-3',
  small:  'w-[10px] h-[10px]',
  xsmall: 'w-2 h-2',
}

const gapClasses: Record<RadioSize, string> = {
  medium: 'gap-3',
  small:  'gap-2',
  xsmall: 'gap-1',
}

const labelFontClasses: Record<RadioSize, string> = {
  medium: 'text-[16px] leading-[24px] tracking-[-0.35px]',
  small:  'text-[14px] leading-[22px] tracking-[-0.3px]',
  xsmall: 'text-[12px] leading-[18px] tracking-[-0.26px]',
}

function getCircleClasses(checked: boolean, state: RadioState): string {
  if (state === 'disabled') return 'bg-bc-100 border border-bc-200 opacity-50'
  if (state === 'error') return 'bg-white border border-error'
  if (state === 'hover' && checked) return 'bg-white border border-pc-900'
  if (checked) return 'bg-white border border-pc-800'
  if (state === 'hover') return 'bg-white border border-pc-900'
  return 'bg-white border border-bc-200'
}

function getDotClasses(state: RadioState): string {
  if (state === 'disabled') return 'bg-bc-400'
  if (state === 'error') return 'bg-error'
  if (state === 'hover') return 'bg-pc-900'
  return 'bg-pc-800'
}

function getLabelClasses(size: RadioSize, state: RadioState): string {
  if (state === 'disabled') return 'text-bc-400'
  if (state === 'error' && size !== 'medium') return 'text-error'
  return 'text-bc-1000'
}

export function Radio({
  size = 'medium',
  state = 'enabled',
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  name,
  value,
  compact = false,
  className,
  id: providedId,
}: RadioProps) {
  const autoId = useId()
  const id = providedId ?? autoId

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const isDisabled = state === 'disabled'

  function handleChange() {
    if (isDisabled) return
    if (!isControlled) setInternalChecked(true)
    onChange?.(true)
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center font-sans',
        compact ? '' : gapClasses[size],
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={isDisabled}
        onChange={handleChange}
        className="sr-only"
      />
      <span
        className={cn(
          'relative flex-shrink-0 flex items-center justify-center rounded-full transition-colors',
          circleSizeClasses[size],
          getCircleClasses(checked, state),
        )}
      >
        {checked && (
          <span
            className={cn(
              'rounded-full flex-shrink-0',
              dotSizeClasses[size],
              getDotClasses(state),
            )}
          />
        )}
      </span>
      {label && (
        <span className={cn('font-sans', labelFontClasses[size], getLabelClasses(size, state))}>
          {label}
        </span>
      )}
    </label>
  )
}
