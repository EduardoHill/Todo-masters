import { prisma } from '../lib/pisma.ts'

interface CreateTaskProps {
  groupId: string
  name: string
  description?: string
}

export async function CreateTask({
  groupId,
  name,
  description,
}: CreateTaskProps) {
  await prisma.task.create({
    data: {
      name,
      description,
      groupId,
    },
  })

  return {
    message: 'Task criada',
  }
}
