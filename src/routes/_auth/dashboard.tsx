import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PlusIcon, Pencil, Trash } from 'lucide-react'
import { CreateProfileOverlay } from '@/components/form/create-profile-form'
import { 
  type Linkfy, 
  type CreateLinkfyRequest,
  useGetAllProfiles,
  useCreateProfile,
  useDeleteProfile,
  useCheckUsername
} from '@/api/linkyfy'

export const Route = createFileRoute('/_auth/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showCreateOverlay, setShowCreateOverlay] = useState(false)
  
  // Use React Query hook to fetch all profiles
  const { data: profilesData, isLoading, error } = useGetAllProfiles()
  const createProfileMutation = useCreateProfile()
  const deleteProfileMutation = useDeleteProfile()
  const checkUsernameMutation = useCheckUsername()
  
  const profiles = profilesData?.data || []
  
  const handleCreateProfile = async (profileData: CreateLinkfyRequest): Promise<void> => {
    return new Promise((resolve, reject) => {
      createProfileMutation.mutate(profileData, {
        onSuccess: () => {
          setShowCreateOverlay(false)
          resolve()
        },
        onError: (error) => {
          reject(error)
        }
      })
    })
  }

  const handleCheckUsername = async (username: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      checkUsernameMutation.mutate({ username }, {
        onSuccess: () => {
          console.log('Username is available')
          resolve()
        },
        onError: (error) => {
          console.error('Error checking username:', error)
          reject(error)
        }
      })
    })
  }
  
  const handleDeleteProfile = (id: string) => {
    if (confirm("Are you sure you want to delete this profile?")) {
      deleteProfileMutation.mutate(id)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Linkfy Profiles</h1>
        <Button onClick={() => setShowCreateOverlay(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create New Profile
        </Button>
      </div>
      
      {isLoading && (
        <div className="text-center py-8">Loading profiles...</div>
      )}
      
      {error && (
        <div className="text-center py-8 text-red-500">
          Error loading profiles: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      )}
      
      {!isLoading && !error && profiles.length === 0 && (
        <div className="text-center py-8">
          You haven't created any profiles yet. Click "Create New Profile" to get started.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <ProfileCard 
            key={profile.id} 
            profile={profile}
            onDelete={handleDeleteProfile}
          />
        ))}
      </div>
      
      {showCreateOverlay && (
        <CreateProfileOverlay 
          onClose={() => setShowCreateOverlay(false)} 
          onSave={handleCreateProfile}
          onUsernameCheck={handleCheckUsername}
        />
      )}
    </div>
  )
}

interface ProfileCardProps {
  profile: Linkfy;
  onDelete: (id: string) => void;
}

function ProfileCard({ profile, onDelete }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <img 
            src={profile.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name || 'User')} 
            alt={`${profile.name}'s avatar`} 
            className="w-12 h-12 rounded-full"
            onError={(e) => {
              e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(profile.name || 'User')
            }}
          />
          <div>
            <CardTitle>{profile.name}</CardTitle>
            <CardDescription>@{profile.username}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{profile.bio}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Created: {new Date(profile.created_at).toLocaleDateString()}
          </span>
          <div className='flex gap-3'>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(profile.id)}
              aria-label={`Delete ${profile.name}'s profile`}
              className="hover:bg-red-700 transition-colors"
            >
              <Trash className="mr-1.5 h-3.5 w-3.5" />
              <span>Delete</span>
            </Button>
          <Link to="/edit/$username" params={{ username: profile.username }} className="inline-flex">
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



