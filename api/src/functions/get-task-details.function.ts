import { prisma } from '../lib/pisma.ts'

interface GetTaskDetailsProps {
  taskId: string
}

export async function getTaskDetailsFunction({ taskId }: GetTaskDetailsProps) {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
    select: {
      name: true,
      description: true,
    },
  })
  if (!task) {
    throw new Error('Task não encontrada')
  }

  return {
    taskName: task.name,
    taskDescription: task.description,
  }
}
