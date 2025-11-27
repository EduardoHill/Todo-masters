import { api } from '@/lib/axios'

interface GroupDetailsProps {
  groupId: string
}

interface Tasks {
  name: string
  id: string
  description: string
  completed: boolean
}

interface GroupDetailsResponse {
  id: string
  groupName: string
  groupDescription: string
  tasks: Tasks[]
  totalTasks: {
    tasks: number
  }
}

export async function getGroupDetails({ groupId }: GroupDetailsProps) {
  const respose = await api.get<GroupDetailsResponse>(
    `/get-group-details/${groupId}`
  )

  return respose.data
}
