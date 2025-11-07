import { prisma } from '../lib/pisma.ts'

interface UpdateTaskProps {
  taskId: string
  name?: string
  description?: string
}

export async function updateTaskFunction({
  taskId,
  name,
  description,
}: UpdateTaskProps) {
  await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      name,
      description,
    },
  })

  return {
    message: 'Task atualizada com sucesso',
  }
}
