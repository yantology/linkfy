import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/forgot-password"!</div>
}
