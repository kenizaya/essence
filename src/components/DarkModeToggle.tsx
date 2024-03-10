'use client'

import * as React from 'react'
import { MoonStar, SunMedium } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function DarkModeToggle(props: React.ComponentProps<typeof Button>) {
  const { theme, setTheme } = useTheme()

  const handleClick = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  return (
    <Button onClick={handleClick} variant='ghost' size='icon' {...props}>
      <SunMedium className='h-[1rem] dark:text-neutral-300 w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      <MoonStar className='absolute sm:dark:text-neutral-100 dark:text-neutral-300 h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
