import { CreateLinkfySchema, type CreateLinkfyRequest } from '@/api/linkyfy'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

interface CreateProfileOverlayProps {
  onClose: () => void
   onSave: (profile: CreateLinkfyRequest) => Promise<void>;
    onUsernameCheck: (username: string) => Promise<void>;
}



export function CreateProfileOverlay({ onClose, onSave, onUsernameCheck }: CreateProfileOverlayProps) {
  const form = useForm({
    defaultValues: {
      avatar_url: "https://example.com/avatar.jpg",
      bio: "",
      name: "",
      username: ""
    },    onSubmit: async ({ value }) => {
      try {
        CreateLinkfySchema.parse(value);
        
        const profileData: CreateLinkfyRequest = {
          name: value.name,
          username: value.username,
          bio: value.bio,
          avatar_url: value.avatar_url,
        };
        
        await onSave(profileData);
      } catch (error) {
        console.error("Validation error:", error);
        if (error instanceof z.ZodError) {
          return {
            status: "error" as const,
            message: error.errors.map((e) => e.message).join(", "),
          };
        }
        return {
          status: "error" as const,
          message: "An unexpected error occurred",
        };
      }
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create New Profile</h2>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="space-y-4">
            <form.Field
              name="name"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Name is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Your Name"
                    className={cn(
                      "w-full",
                      field.state.meta.isTouched &&
                        field.state.meta.errors.length
                        ? "border-red-500"
                        : ""
                    )}
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500 mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
              <form.Field
              name="username"
              validators={{
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: async ({ value }) => {
                  if (!value) return "Username is required";
                  if (value.length < 3) {
                    return "Username must be at least 3 characters long";
                  }
                  try {
                    await onUsernameCheck(value);
                    return undefined;
                  } catch (error) {
                    console.error("Error checking username:", error);
                    return "Username already taken";
                  }
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="yourusername"
                    className={cn(
                      "w-full",
                      field.state.meta.isTouched &&
                        field.state.meta.errors.length
                        ? "border-red-500"
                        : ""
                    )}
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500 mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
            
            <form.Field
              name="bio"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Bio is required";
                  return undefined;
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Tell others about yourself"
                    className={cn(
                      "w-full",
                      field.state.meta.isTouched &&
                        field.state.meta.errors.length
                        ? "border-red-500"
                        : ""
                    )}
                    rows={3}
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500 mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
            
            <form.Field
              name="avatar_url"
              validators={{
                onBlur: ({ value }) => {
                  if (!value) return "Avatar URL is required";
                  try {
                    new URL(value);
                    return undefined;
                  } catch (err) {
                    return "Please enter a valid image URL";
                  }
                },
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Avatar URL
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="https://example.com/avatar.jpg"
                    className={cn(
                      "w-full",
                      field.state.meta.isTouched &&
                        field.state.meta.errors.length
                        ? "border-red-500"
                        : ""
                    )}
                  />
                  {field.state.meta.isTouched &&
                  field.state.meta.errors.length ? (
                    <p className="text-sm text-red-500 mt-1">
                      {field.state.meta.errors}
                    </p>
                  ) : null}
                </div>
              )}
            </form.Field>
          </div>
          
          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <form.Subscribe>
              {(state) => (
                <Button 
                  type="submit"
                  disabled={state.isSubmitting}
                >
                  {state.isSubmitting ? "Creating..." : "Create Profile"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </div>
    </div>  )
}
