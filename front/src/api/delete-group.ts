import { api } from '@/lib/axios'

interface GroupProps {
  groupId: string
}

export async function deleteGroup({ groupId }: GroupProps) {
  await api.delete(`/delete-group/${groupId}`)
}
