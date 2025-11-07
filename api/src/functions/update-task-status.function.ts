import { prisma } from '../lib/pisma.ts'

interface UpdateStatusProps {
  taskId: string
}

export async function UpdateTaskStatusFuntion({ taskId }: UpdateStatusProps) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  })
  if (!task) {
    throw new Error('Task nao existe')
  }

  await prisma.task.update({
    where: { id: taskId },
    data: {
      completed: !task.completed,
    },
  })
  return {
    message: `Status da task ${!task.completed}`,
  }
}
