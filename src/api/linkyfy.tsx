import { http } from '@/utils/fetch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { DataResponse, MessageResponse } from './models/response';
import { z } from 'zod';
import { ZodError } from 'zod';
import { createDataResponseSchema } from './models/response';

// Zod schemas for validation
export const LinkfySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  username: z.string().min(3).max(30),
  avatar_url: z.string().url().optional().nullable(),
  name: z.string().max(50).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  message: z.string().optional().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreateLinkfySchema = z.object({
  username: z.string().min(3).max(30),
  avatar_url: z.string().url().optional(),
  name: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
});

export const UpdateLinkfySchema = z.object({
  username: z.string().min(3).max(30).optional(),
  avatar_url: z.string().url().optional().nullable(),
  name: z.string().max(50).optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  message: z.string().optional().nullable(),
});

export const CheckUsernameSchema = z.object({
  username: z.string().min(3).max(30),
});

// Types inferred from Zod schemas
export type Linkfy = z.infer<typeof LinkfySchema>;
export type CreateLinkfyRequest = z.infer<typeof CreateLinkfySchema>;
export type UpdateLinkfyRequest = z.infer<typeof UpdateLinkfySchema>;
export type CheckUsernameRequest = z.infer<typeof CheckUsernameSchema>;

// Response schemas using the factory
export const LinkfyResponseSchema = createDataResponseSchema(LinkfySchema);
export const LinkfyArrayResponseSchema = createDataResponseSchema(z.array(LinkfySchema));

// API Request Functions
export const getAllProfiles = async (): Promise<DataResponse<Linkfy[]>> => {
  try {
    const response = await http.get(`${import.meta.env.VITE_API_URL}/linkfy`);
    const data = await response;
    
    // Using the schema directly for validation
    return LinkfyArrayResponseSchema.parse(data);
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

export const getProfileById = async (id: string): Promise<DataResponse<Linkfy>> => {
  try {
    const response = await http.get(`${import.meta.env.VITE_API_URL}/linkfy/${id}`);
    const data = await response;
    
    // Using the schema directly for validation
    return LinkfyResponseSchema.parse(data);
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

export const getProfileByUsername = async (username: string): Promise<DataResponse<Linkfy>> => {
  try {
    const response = await http.get(`${import.meta.env.VITE_API_URL}/linkfy/username/${username}`);
    const data = await response;
    
    // Using the schema directly for validation
    return LinkfyResponseSchema.parse(data);
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

export const createProfile = async (profile: CreateLinkfyRequest): Promise<MessageResponse> => {
  try {
    // Validate request data before sending
    const validatedProfile = CreateLinkfySchema.parse(profile);
    
    const response = await http.post(`${import.meta.env.VITE_API_URL}/linkfy`, validatedProfile);
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

export const updateProfile = async (id: string, profile: UpdateLinkfyRequest): Promise<MessageResponse> => {
  try {
    // Validate request data before sending
    const validatedProfile = UpdateLinkfySchema.parse(profile);
    
    const response = await http.put(`${import.meta.env.VITE_API_URL}/linkfy/${id}`, validatedProfile);
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

export const deleteProfile = async (id: string): Promise<MessageResponse> => {
  try {
    const response = await http.delete(`${import.meta.env.VITE_API_URL}/linkfy/${id}`);
    const data = await response;
    
    return { message: data.message };
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
};

export const checkUsername = async (request: CheckUsernameRequest): Promise<MessageResponse> => {
  try {
    // Validate request data before sending
    const validatedRequest = CheckUsernameSchema.parse(request);
    
    const response = await http.post(`${import.meta.env.VITE_API_URL}/linkfy/check-username`, validatedRequest);
    const data = await response;
    
    return { message: data.message };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      const formattedErrors = error.errors.map(err => 
        `${err.path.join('.')}: ${err.message}`
      ).join('; ');
      throw new Error(`Data validation failed: ${formattedErrors}`);
    }
    throw error;
  }
};

// React Query Hooks
export const useGetAllProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: getAllProfiles,
  });
};

export const useGetProfileById = (id: string) => {
  return useQuery({
    queryKey: ['profile', 'id', id],
    queryFn: () => getProfileById(id),
    enabled: !!id, // Only run if id is provided
  });
};

export const useGetProfileByUsername = (username: string) => {
  return useQuery({
    queryKey: ['profile', 'username', username],
    queryFn: () => getProfileByUsername(username),
    enabled: !!username, // Only run if username is provided
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProfile,
    onSuccess: () => {
      // Invalidate and refetch profiles after creating a new one
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, profile }: { id: string; profile: UpdateLinkfyRequest }) => 
      updateProfile(id, profile),
    onSuccess: (_, variables) => {
      // Invalidate specific profile queries that might be affected
      queryClient.invalidateQueries({ queryKey: ['profile', 'id', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      if (variables.profile.username) {
        queryClient.invalidateQueries({ queryKey: ['profile', 'username', variables.profile.username] });
      }
    },
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      // Invalidate and refetch all profile data after deletion
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
};

export const useCheckUsername = () => {
  return useMutation({
    mutationFn: checkUsername,
  });
};
