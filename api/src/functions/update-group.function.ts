import { prisma } from '../lib/pisma.ts'

interface UpdateGroupData {
  name?: string
  description?: string
  groupId: string
}

export async function UpdateGroupDataFunction({
  description,
  name,
  groupId,
}: UpdateGroupData) {
  await prisma.group.update({
    where: { id: groupId },
    data: {
      name,
      description,
    },
  })

  return {
    message: 'Grupo atualizado com sucesso',
  }
}
