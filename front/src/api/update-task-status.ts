import { api } from '@/lib/axios'

interface CardTaskProps {
  taskId: string
}

export async function updateTaskStatus({ taskId }: CardTaskProps) {
  await api.patch(`/update-task-status/${taskId}`)
}
