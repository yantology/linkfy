import LoginForm from "@/components/form/login-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_unauth/login")({
  component: App,
});

function App() {
  const navigate = useNavigate();
  const { auth } = Route.useRouteContext();
  
  const handleLogin = async (email: string, password: string) => {
    try {
       await auth.login(email, password);
    
      
      // Update auth status on successful login
      auth.status = "authenticated";
      // Navigate to dashboard on successful login
      navigate({ to: "/dashboard" });

    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-6">
        <LoginForm onSubmitCredentials={handleLogin} />
      </div>
    </div>
  );
}
