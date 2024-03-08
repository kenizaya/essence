'use client'

import { PropsWithChildren, ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import { httpBatchLink } from '@trpc/react-query'
import { absoluteUrl } from '@/lib/utils'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: absoluteUrl('/api/trpc'),
        }),
      ],
    })
  )
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ProgressBar
          height='2px'
          color='#667eea'
          options={{ showSpinner: false }}
          shallowRouting
        />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default Providers
