import React from 'react'
import { cn } from '../lib/cn'

type ButtonVariant = 'filled' | 'outlined' | 'ghost'
type ButtonType = 'primary1' | 'primary2' | 'secondary1' | 'secondary2'
type ButtonSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
type IconPosition = 'none' | 'left' | 'right' | 'both' | 'only'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  colorType?: ButtonType
  size?: ButtonSize
  iconPosition?: IconPosition
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const sizeClasses: Record<ButtonSize, string> = {
  xxsmall: 'h-[28px] px-2 rounded-[3px] text-[12px] leading-[18px] tracking-[-0.26px]',
  xsmall:  'h-[32px] px-2 rounded-[3px] text-[12px] leading-[18px] tracking-[-0.26px]',
  small:   'h-[40px] px-3 py-[9px] rounded-[3px] text-[14px] leading-[22px] tracking-[-0.3px]',
  medium:  'h-[48px] px-4 py-3 rounded-[4px] text-[16px] leading-[24px] tracking-[-0.35px]',
  large:   'h-[56px] px-5 py-[14px] rounded-[4px] text-[18px] leading-[28px] tracking-[-0.4px]',
  xlarge:  'h-[72px] px-6 py-[18px] rounded-[5px] text-[24px] leading-[36px] tracking-[-0.43px]',
}

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  xxsmall: 'w-6 h-6 p-1 rounded-[3px]',
  xsmall:  'w-8 h-8 p-[6px] rounded-[3px]',
  small:   'w-10 h-10 p-2 rounded-[4px]',
  medium:  'w-12 h-12 p-2 rounded-[4px]',
  large:   'w-14 h-14 p-2 rounded-[5px]',
  xlarge:  'w-[72px] h-[72px] p-2 rounded-[5px]',
}

const iconSize: Record<ButtonSize, string> = {
  xxsmall: 'w-4 h-4',
  xsmall:  'w-4 h-4',
  small:   'w-4 h-4',
  medium:  'w-5 h-5',
  large:   'w-6 h-6',
  xlarge:  'w-8 h-8',
}

function getVariantClasses(variant: ButtonVariant, colorType: ButtonType, disabled?: boolean): string {
  if (disabled) {
    if (variant === 'filled') return 'bg-bc-200 text-bc-400 cursor-not-allowed border-0'
    if (variant === 'outlined') return 'border border-bc-200 text-bc-400 bg-transparent cursor-not-allowed'
    if (variant === 'ghost') return 'text-bc-300 bg-transparent cursor-not-allowed'
  }

  if (variant === 'filled') {
    if (colorType === 'primary1') return 'bg-pc-800 text-white hover:bg-pc-700 active:bg-pc-900 border-0'
    if (colorType === 'primary2') return 'bg-pc-1000 text-white hover:bg-pc-900 active:bg-pc-800 border-0'
    if (colorType === 'secondary1') return 'bg-bc-300 text-bc-1000 hover:bg-bc-400 active:bg-bc-500 border-0'
    if (colorType === 'secondary2') return 'bg-bc-900 text-white hover:bg-bc-800 active:bg-bc-700 border-0'
  }

  if (variant === 'outlined') {
    if (colorType === 'primary1') return 'border border-pc-800 text-pc-800 bg-transparent hover:bg-pc-100 active:bg-pc-200'
    if (colorType === 'secondary1') return 'border border-bc-300 text-bc-700 bg-transparent hover:bg-bc-100 active:bg-bc-200'
  }

  if (variant === 'ghost') {
    if (colorType === 'primary1') return 'text-pc-800 bg-transparent hover:bg-pc-100 active:bg-pc-200'
    if (colorType === 'secondary1') return 'text-bc-700 bg-transparent hover:bg-bc-100 active:bg-bc-200'
  }

  return ''
}

export function Button({
  variant = 'filled',
  colorType = 'primary1',
  size = 'medium',
  iconPosition = 'none',
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const isIconOnly = iconPosition === 'only'

  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium font-sans transition-colors',
        isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
        getVariantClasses(variant, colorType, disabled),
        className,
      )}
      {...props}
    >
      {!isIconOnly && iconPosition !== 'none' && (leftIcon || iconPosition === 'left' || iconPosition === 'both') && (
        <span className={cn('flex-shrink-0', iconSize[size], children ? 'mr-2' : '')}>
          {leftIcon}
        </span>
      )}

      {!isIconOnly && children}

      {!isIconOnly && iconPosition !== 'none' && (rightIcon || iconPosition === 'right' || iconPosition === 'both') && (
        <span className={cn('flex-shrink-0', iconSize[size], children ? 'ml-2' : '')}>
          {rightIcon}
        </span>
      )}

      {isIconOnly && (leftIcon || rightIcon)}
    </button>
  )
}
