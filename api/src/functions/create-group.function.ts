import { prisma } from '../lib/pisma.ts'

interface CreateGroupProps {
  name: string
  description?: string
}

export async function CreateGroupFunction({
  name,
  description,
}: CreateGroupProps) {
  await prisma.group.create({
    data: {
      name,
      description,
    },
  })

  return {
    message: 'Grupo criado com sucesso',
  }
}
