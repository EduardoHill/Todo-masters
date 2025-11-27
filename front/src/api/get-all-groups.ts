import { api } from '@/lib/axios'
interface GetAllGroupsResponse {
  id: string
  description: string
  name: string
  _count: {
    tasks: number
  }
}
export async function getAllGroups() {
  const response = await api.get<GetAllGroupsResponse[]>('/get-total-groups')

  return response.data
}
