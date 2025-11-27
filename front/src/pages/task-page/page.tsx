import { HeaderComponent } from '@/components/header'
import { CardTask } from './components/card'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getGroupDetails } from '@/api/get-group-details'

export function TaskPage() {
  const { groupId } = useParams()

  const {
    data: groupDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['group-details', groupId],
    queryFn: () => getGroupDetails({ groupId: groupId! }),
    enabled: !!groupId,
  })

  if (isLoading) return <p>Carregando...</p>
  if (error) return <p>Erro ao carregar grupo</p>

  console.log(groupDetails)
  return (
    <div>
      <HeaderComponent
        name={groupDetails?.groupName}
        description={groupDetails?.groupDescription}
      />
      <main className='max-w-7xl mx-auto w-full flex flex-col gap-8 pt-10'>
        <h1>Pendetes ({groupDetails?.totalTasks.tasks})</h1>

        <div className='grid gap-5'>
          {groupDetails?.tasks.map((task) => (
            <CardTask key={task.id} task={task} />
          ))}
        </div>
      </main>
    </div>
  )
}
