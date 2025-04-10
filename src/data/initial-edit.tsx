import { formOptions } from "@tanstack/react-form"
import { type CreateLinkfyRequest } from '@/api/linkyfy'


export const editFormOpts = (profile?: CreateLinkfyRequest) => formOptions({
    defaultValues: {
        avatar_url: profile?.avatar_url || "https://example.com/avatar.jpg",
        bio: profile?.bio || "",
        name: profile?.name || "",
        username: profile?.username || ""
    },
  })