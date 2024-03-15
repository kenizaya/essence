'use client'

import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { trpc } from '@/app/_trpc/client'
import { getUserSubscriptionPlan } from '@/lib/stripe'

const UpgradeButton = () => {
  const { mutate: createStripeSession } = trpc.createStripeSession.useMutation({
    onSuccess: ({ url }) => {
      window.location.href = url ?? '/dashboard/billing'
    },
  })

  const [isUserSubscribed, setIsUserSubscribed] = React.useState(false)

  React.useEffect(() => {
    const getUserSubscription = async () => {
      const subscription = await getUserSubscriptionPlan()

      setIsUserSubscribed(subscription.isSubscribed)
    }
  })
  return (
    <Button
      onClick={() => createStripeSession()}
      className={`w-full flex items-center ${
        isUserSubscribed ? 'disabled' : ''
      }`}
    >
      {isUserSubscribed ? (
        'Current Plan'
      ) : (
        <>
          Upgrade Now
          <ArrowRight className='h-5 w-5 ml-1.5' />
        </>
      )}
    </Button>
  )
}

export default UpgradeButton
