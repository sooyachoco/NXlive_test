import React from 'react'
import { cn } from '../lib/cn'

type IconStroke = '2px' | '1.5px' | 'filled'

export type IconName =
  | 'Add' | 'Add-circle' | 'Alarm' | 'Alert'
  | 'Arrow-back' | 'Arrow-down' | 'Arrow-forward' | 'Arrow-up'
  | 'Autorenew' | 'Bookmark' | 'Cancel' | 'Check-circle'
  | 'Chevron-down' | 'Chevron-left' | 'Chevron-left-double'
  | 'Chevron-right' | 'Chevron-right-double' | 'Chevron-up'
  | 'Close' | 'Delete' | 'Done' | 'Favorite'
  | 'Home' | 'Image' | 'Info' | 'Login' | 'Logout' | 'Menu'
  | 'More-horizontal' | 'More-vertical' | 'Open-in-new'
  | 'Refresh' | 'Remove' | 'Search' | 'Settings' | 'Share'
  | 'Star' | 'Toggle-off' | 'Toggle-on' | 'Upload-download'
  | 'User' | 'Warning' | 'Write'
  // filled only
  | 'Download' | 'Upload'

export interface IconProps {
  name: IconName
  stroke?: IconStroke
  size?: number
  color?: string
  className?: string
  alt?: string
}

function getIconPath(name: IconName, stroke: IconStroke): string {
  const base = import.meta.env.BASE_URL
  if (stroke === 'filled') {
    return `${base}icons/filled/${name}.svg`
  }
  const folder = stroke === '1.5px' ? 'outlined-1.5px' : 'outlined-2px'
  return `${base}icons/${folder}/${name}.svg`
}

export function Icon({
  name,
  stroke = '2px',
  size = 24,
  color,
  className,
  alt = '',
}: IconProps) {
  const src = getIconPath(name, stroke)

  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={alt}
      aria-hidden={!alt}
      className={cn('flex-shrink-0', className)}
      style={color ? ({ '--fill-0': color } as React.CSSProperties) : undefined}
    />
  )
}

// Inline SVG variant — enables CSS color control via --fill-0
export interface InlineIconProps extends Omit<IconProps, 'alt'> {
  svgContent: string
}

export function InlineIcon({
  svgContent,
  size = 24,
  color,
  className,
}: InlineIconProps) {
  return (
    <span
      className={cn('inline-flex flex-shrink-0', className)}
      style={{
        width: size,
        height: size,
        ...(color ? ({ '--fill-0': color } as React.CSSProperties) : {}),
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      aria-hidden
    />
  )
}
