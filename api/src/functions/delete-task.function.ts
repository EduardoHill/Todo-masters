import { prisma } from '../lib/pisma.ts'

interface DeleteProps {
  taskId: string
}

export async function deleteTaskFunction({ taskId }: DeleteProps) {
  const taskExists = await prisma.task.findUnique({
    where: { id: taskId },
  })

  if (!taskExists) {
    throw new Error('Task não existe')
  }

  await prisma.task.delete({
    where: {
      id: taskExists.id,
    },
  })

  return {
    message: 'Task deletada com sucesso',
  }
}
