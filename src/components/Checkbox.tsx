import React, { useId } from 'react'
import { cn } from '../lib/cn'

type CheckboxSize = 'medium' | 'small' | 'xsmall'
type CheckboxState = 'enabled' | 'hover' | 'disabled' | 'error'

export interface CheckboxProps {
  size?: CheckboxSize
  state?: CheckboxState
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  compact?: boolean
  className?: string
  id?: string
}

const boxSizeClasses: Record<CheckboxSize, string> = {
  medium: 'w-6 h-6 rounded-[3px]',
  small:  'w-5 h-5 rounded-[2px]',
  xsmall: 'w-4 h-4 rounded-[2px]',
}

const iconSizeClasses: Record<CheckboxSize, string> = {
  medium: 'w-4 h-4',
  small:  'w-[14px] h-[14px]',
  xsmall: 'w-3 h-3',
}

const gapClasses: Record<CheckboxSize, string> = {
  medium: 'gap-3',
  small:  'gap-2',
  xsmall: 'gap-1',
}

const labelFontClasses: Record<CheckboxSize, string> = {
  medium: 'text-[16px] leading-[24px] tracking-[-0.35px]',
  small:  'text-[14px] leading-[22px] tracking-[-0.3px]',
  xsmall: 'text-[12px] leading-[18px] tracking-[-0.26px]',
}

function getBoxClasses(checked: boolean, state: CheckboxState): string {
  if (state === 'disabled') {
    return cn(
      'bg-bc-100 border border-bc-200 opacity-50',
      checked ? 'bg-bc-100' : '',
    )
  }
  if (checked) {
    if (state === 'error') return 'bg-error border-0'
    if (state === 'hover') return 'bg-pc-900 border-0'
    return 'bg-pc-800 border-0'
  }
  if (state === 'error') return 'bg-white border border-error'
  if (state === 'hover') return 'bg-white border border-pc-900'
  return 'bg-white border border-bc-200'
}

function getLabelClasses(state: CheckboxState): string {
  if (state === 'disabled') return 'text-bc-400'
  if (state === 'error') return 'text-error'
  return 'text-bc-1000'
}

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8L6.5 11.5L13 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export function Checkbox({
  size = 'medium',
  state = 'enabled',
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  compact = false,
  className,
  id: providedId,
}: CheckboxProps) {
  const autoId = useId()
  const id = providedId ?? autoId

  const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
  const isControlled = controlledChecked !== undefined
  const checked = isControlled ? controlledChecked : internalChecked

  const isDisabled = state === 'disabled'

  function handleChange() {
    if (isDisabled) return
    if (!isControlled) setInternalChecked(prev => !prev)
    onChange?.(!checked)
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
        type="checkbox"
        checked={checked}
        disabled={isDisabled}
        onChange={handleChange}
        className="sr-only"
      />
      <span
        className={cn(
          'relative flex-shrink-0 flex items-center justify-center transition-colors',
          boxSizeClasses[size],
          getBoxClasses(checked, state),
        )}
      >
        {checked && <CheckIcon className={iconSizeClasses[size]} />}
      </span>
      {label && (
        <span className={cn('font-sans', labelFontClasses[size], getLabelClasses(state))}>
          {label}
        </span>
      )}
    </label>
  )
}
