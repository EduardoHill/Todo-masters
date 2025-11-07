import { prisma } from '../lib/pisma.ts'

interface DeleteGroupProps {
  groupId: string
}

export async function DeleteGroupFuntion({ groupId }: DeleteGroupProps) {
  const groupExist = await prisma.group.findUnique({
    where: { id: groupId },
  })
  if (!groupExist) {
    throw new Error('Grupo nao existe')
  }

  await prisma.group.delete({
    where: { id: groupId },
  })

  return {
    message: 'Grupo deletado com sucesso',
  }
}
