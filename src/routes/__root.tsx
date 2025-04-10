import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { Auth } from '@/utils/auth'
import type { QueryClient } from '@tanstack/react-query'

export const Route = createRootRouteWithContext<{
  auth: Auth
  queryClient: QueryClient
}>()({
  component: () => (
    <>


      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
