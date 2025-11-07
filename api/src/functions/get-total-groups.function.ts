import { prisma } from '../lib/pisma.ts'

export async function geteTotalGroupsFunction() {
  const groups = await prisma.group.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      _count: {
        select: { tasks: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return groups
}
