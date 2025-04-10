import { http } from '@/utils/fetch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { DataResponse, MessageResponse } from './models/response';
import { z } from 'zod';
import { ZodError } from 'zod';
import { createDataResponseSchema } from './models/response';

// Zod schemas for validation
export const LinkfyLinkSchema = z.object({
    id: z.string(),
    linkfy_id: z.string(),
    name: z.string().min(1, "Name cannot be empty"),
    icons_url: z.string().url("Invalid icon URL"),
    created_at: z.string().datetime("Invalid date format"),
});

export const CreateLinkSchema = z.object({
  title: z.string().max(100),
  url: z.string().url(),
  icon: z.string().optional(),
  position: z.number().int().nonnegative().optional(),
  active: z.boolean().optional(),
});

export const CreateLinksRequestSchema = z.object({
  data: z.array(CreateLinkSchema),
});

export const GetLinksResponseSchema = z.object({
    data: z.array(LinkfyLinkSchema),
    });


// Types inferred from Zod schemas
export type LinkfyLink = z.infer<typeof LinkfyLinkSchema>;
export type CreateLinkRequest = z.infer<typeof CreateLinkSchema>;
export type CreateLinksRequest = z.infer<typeof CreateLinksRequestSchema>;

// Response schemas using the factory
export const LinkfyLinkResponseSchema = createDataResponseSchema(LinkfyLinkSchema);
export const LinkfyLinkArrayResponseSchema = createDataResponseSchema(z.array(LinkfyLinkSchema));

// API Request Functions
export const getLinksByLinkfyId = async (linkfyId: string): Promise<DataResponse<LinkfyLink[]>> => {
  try {
    const response = await http.get(`${import.meta.env.VITE_API_URL}/linkfy/${linkfyId}/links`);
    const data = await response;
    
    // Using the schema directly for validation
    return LinkfyLinkArrayResponseSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      // Create a more descriptive error message from Zod validation issues
      const formattedErrors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('; ');
      throw new Error(`Data validation failed: ${formattedErrors}`);
    }
    throw error;
  }
};


export const createLinks = async (linkfyId: string, request: CreateLinksRequest): Promise<MessageResponse> => {
  try {
    // Validate request data before sending
    const validatedRequest = CreateLinksRequestSchema.parse(request);
    
    const response = await http.post(`${import.meta.env.VITE_API_URL}/linkfy/${linkfyId}/links`, validatedRequest);
    const data = await response;
    
    return { message: data.message };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      // Create a more descriptive error message from Zod validation issues
      const formattedErrors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('; ');
      throw new Error(`Data validation failed: ${formattedErrors}`);
    }
    throw error;
  }
};

export const createLink = async (linkfyId: string, link: CreateLinkRequest): Promise<MessageResponse> => {
  try {
    // Validate request data before sending
    const validatedLink = CreateLinkSchema.parse(link);
    
    const response = await http.post(`${import.meta.env.VITE_API_URL}/linkfy/${linkfyId}/links/single`, validatedLink);
    const data = await response;
    
    return { message: data.message };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      // Create a more descriptive error message from Zod validation issues
      const formattedErrors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('; ');
      throw new Error(`Data validation failed: ${formattedErrors}`);
    }
    throw error;
  }
};

// React Query Hooks
export const useGetLinksByLinkfyId = (linkfyId: string) => {
  return useQuery({
    queryKey: ['links', 'linkfy', linkfyId],
    queryFn: () => getLinksByLinkfyId(linkfyId),
    enabled: !!linkfyId, // Only run if linkfyId is provided
  });
};

export const useCreateLinks = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ linkfyId, request }: { linkfyId: string; request: CreateLinksRequest }) => 
      createLinks(linkfyId, request),
    onSuccess: (_, variables) => {
      // Invalidate and refetch links for this linkfy profile
      queryClient.invalidateQueries({ queryKey: ['links', 'linkfy', variables.linkfyId] });
    },
  });
};

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ linkfyId, link }: { linkfyId: string; link: CreateLinkRequest }) => 
      createLink(linkfyId, link),
    onSuccess: (_, variables) => {
      // Invalidate and refetch links for this linkfy profile
      queryClient.invalidateQueries({ queryKey: ['links', 'linkfy', variables.linkfyId] });
    },
  });
};




