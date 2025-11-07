import { prisma } from '../lib/pisma.ts'

interface GetGroupDetailsProps {
  groupId: string
}

export async function getGroupDetails({ groupId }: GetGroupDetailsProps) {
  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },

    select: {
      name: true,
      description: true,
      _count: {
        select: {
          tasks: true,
        },
      },
      tasks: {
        select: {
          id: true,
          name: true,
          description: true,
          completed: true,
        },
      },
    },
  })
  if (!group) {
    throw new Error('Grupo não encontrado')
  }

  return {
    groupName: group.name,
    groupDescription: group.description,
    totalTasks: group._count,
    tasks: group.tasks,
  }
}
