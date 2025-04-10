import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_unauth')({
  component: RouteComponent,
  loader: async ({ context }) => {
    // Jika sudah terautentikasi dari context awal, redirect ke dashboard
    if (context.auth.status === 'authenticated') {
      throw redirect({ to: '/dashboard' })
    }
    if (context.auth.status === 'loading') {
      // Jika status loading, refresh auth
      context.auth.refresh()
    }
  },
})

function RouteComponent() {
  // Komponen jadi jauh lebih sederhana karena logika auth ditangani di loader
  return <Outlet />
}