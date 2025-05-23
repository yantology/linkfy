import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Jika sudah terautentikasi dari context awal, redirect ke dashboard
    if (context.auth.status === 'unauthenticated') {
      throw redirect({ to: '/' })
    }
    if (context.auth.status === 'loading') {
      context.auth.refresh()
      
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
