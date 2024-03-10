import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import React from 'react'
import { ArrowRight, Check, HelpCircle, Minus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import UpgradeButton from '@/components/UpgradeButton'

const page = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  const pricingItems = [
    {
      plan: 'Free',
      tagline: 'For small side projects.',
      mostPopular: false,
      quota: 10,
      features: [
        { text: '10 PDFs per month' },
        {
          text: '5 pages per PDF',
        },
        {
          text: '4MB file size limit',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          negative: true,
        },
        {
          text: 'Priority support',
          negative: true,
        },
      ],
    },
    {
      plan: 'Pro',
      mostPopular: true,
      tagline: 'For larger projects with higher needs.',
      quota: PLANS.find((p) => p.slug === 'pro')!.quota,
      features: [
        { text: '50 PDFs per month' },

        {
          text: '25 pages per PDF',
        },
        {
          text: '16MB file size limit',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Priority support',
        },
      ],
    },
    {
      plan: 'Custom',
      mostPopular: false,
      tagline: 'Looking for something more?',
      quota: 'Unlimited',
      features: [
        { text: 'Unlimited PDFs per month' },

        {
          text: 'Unlimited pages per PDF',
        },
        {
          text: 'No file size limit',
        },
        {
          text: 'Mobile-friendly interface',
        },
        {
          text: 'Higher-quality responses',
          footnote: 'Better algorithmic responses for enhanced content quality',
        },
        {
          text: 'Dedicated support',
        },
      ],
    },
  ]

  return (
    <>
      <MaxWidthWrapper classname='mb-8 py-24 sm:py-32'>
        <div className='mx-auto mb-24 sm:max-w-7xl'>
          <div className='mx-auto max-w-4xl text-center'>
            <h2 className='text-base font-semibold leading-7 text-indigo-400'>
              Pricing
            </h2>
            <p className='mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight dark:text-white'>
              Simple pricing, no commitment
            </p>
          </div>
          <p className='mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white/60'>
            Whether you&apos;re just trying out our service or need more,
            we&apos;ve got you covered.
          </p>
        </div>

        <TooltipProvider>
          <div className='relative'>
            <svg
              viewBox='0 0 1208 1024'
              aria-hidden='true'
              className='absolute -bottom-48 max-lg:hidden left-1/2 h-[20rem] sm:h-[24rem] lg:h-[55rem] xl:h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-36 lg:bottom-auto lg:translate-y-0'
            >
              <ellipse
                cx={604}
                cy={512}
                fill='url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)'
                rx={604}
                ry={512}
              />
              <defs>
                <radialGradient id='d25c25d4-6d43-4bf9-b9ac-1842a30a4867'>
                  <stop stopColor='#7775D6' />
                  <stop offset={1} stopColor='#E935C1' />
                </radialGradient>
              </defs>
            </svg>
            <div className='isolate mx-auto mt-10 grid gap-5 lg:gap-3 max-w-md grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
              {pricingItems.map(({ plan, tagline, features, mostPopular }) => {
                const price =
                  PLANS.find((p) => p.slug === plan.toLowerCase())?.price
                    .amount || 0

                return (
                  <div
                    key={plan}
                    className={cn(
                      mostPopular
                        ? 'ring-2 ring-indigo-500 lg:scale-105'
                        : 'dark:ring-1 ring-2 dark:ring-white/10',
                      'rounded-3xl dark:bg-gray-900/75 bg-white/95 p-8 relative xl:p-10'
                    )}
                  >
                    {mostPopular ? (
                      <div className='absolute bg-white/5 inset-0 rounded-3xl -z-10' />
                    ) : null}
                    <div className='flex items-center justify-between gap-x-4'>
                      <h3
                        id={plan}
                        className='text-lg font-semibold leading-8 dark:text-white'
                      >
                        {plan}
                      </h3>
                      {mostPopular ? (
                        <p className='rounded-full bg-indigo-500 px-2.5 py-1 text-xs font-semibold leading-5 text-white'>
                          Most popular
                        </p>
                      ) : null}
                    </div>
                    <p className='mt-4 text-sm leading-6 dark:text-gray-300'>
                      {tagline}
                    </p>

                    <p className='mt-6 flex items-baseline gap-x-1'>
                      <span className='text-4xl font-bold tracking-tight dark:text-white'>
                        {plan.toLowerCase() !== 'custom'
                          ? `$${price}`
                          : 'Custom'}
                      </span>
                      <span className='text-sm font-semibold leading-6 dark:text-gray-300'>
                        {plan.toLowerCase() !== 'custom' ? '/month' : null}
                      </span>
                    </p>
                    <div className='pt-6'>
                      {plan.toLowerCase() === 'custom' ? (
                        <Link
                          href='mailto:pshdotgg@gmail.com'
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}
                        >
                          Contact Sales
                        </Link>
                      ) : plan.toLowerCase() !== 'pro' ? (
                        <Link
                          href={user ? '/dashboard' : '/sign-up'}
                          className={buttonVariants({
                            className: 'w-full flex items-center',
                            variant: 'secondary',
                          })}
                        >
                          {user ? 'Upgrade now' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      ) : user ? (
                        <UpgradeButton />
                      ) : (
                        <Link
                          href='/sign-up'
                          className={buttonVariants({
                            className: 'w-full flex items-center',
                          })}
                        >
                          {user ? 'Upgrade now' : 'Sign up'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      )}
                    </div>

                    <ul
                      role='list'
                      className='mt-8 space-y-3 text-sm leading-6 dark:text-gray-300 xl:mt-10'
                    >
                      {features.map(
                        ({
                          text,
                          footnote,
                          negative,
                        }: {
                          text: string
                          footnote?: string
                          negative?: boolean
                        }) => (
                          <li key={text} className='flex gap-x-3'>
                            <div className='flex-shrink-0'>
                              {negative ? (
                                <Minus
                                  className='h-6 w-6 dark:text-gray-300'
                                  aria-hidden='true'
                                />
                              ) : (
                                <Check
                                  className='h-6 w-5 flex-none dark:text-white'
                                  aria-hidden='true'
                                />
                              )}
                            </div>
                            {footnote ? (
                              <div className='flex items-center space-x-1'>
                                <p
                                  className={cn(
                                    'dark:text-gray-300 text-zinc-700',
                                    {
                                      'dark:text-gray-600 text-zinc-700':
                                        negative,
                                    }
                                  )}
                                >
                                  {text}
                                </p>

                                <Tooltip delayDuration={300}>
                                  <TooltipTrigger className='cursor-default ml-1.5'>
                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                  </TooltipTrigger>
                                  <TooltipContent className='w-80 p-2'>
                                    {footnote}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ) : (
                              <p
                                className={cn(
                                  'dark:text-gray-300 text-zinc-700',
                                  {
                                    'dark:text-gray-600 text-zinc-700':
                                      negative,
                                  }
                                )}
                              >
                                {text}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </TooltipProvider>
      </MaxWidthWrapper>
    </>
  )
}

export default page
