import { api } from '@/lib/axios'

interface CreateNewTaskProps {
  groupId: string
  name: string
  description?: string
}

export async function createNewTask({
  groupId,
  name,
  description,
}: CreateNewTaskProps) {
  await api.post(`/create-task/${groupId}`, { name, description })
}
