import { api } from '@/lib/axios'

interface CreateGroupProps {
  name: string
  description?: string
}

export async function createNewGroup({ name, description }: CreateGroupProps) {
  await api.post('/create-group', {
    name,
    description,
  })
}
