import { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean
}

export default function GlassCard({ className = '', children, padded = true, ...rest }: Props) {
  return (
    <div
      className={[
        'bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl',
        'shadow-[0_20px_60px_rgba(0,0,0,0.45)] text-white',
        padded ? 'p-6' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}

