import { HeaderComponent } from '@/components/header'
import { GroupCard } from './components/group-card'
import { useQuery } from '@tanstack/react-query'
import { getAllGroups } from '@/api/get-all-groups'

export function GroupPage() {
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getAllGroups(),
  })
  return (
    <div className='bg-gray-200 h-screen'>
      <HeaderComponent />
      <main className='max-w-7xl mx-auto w-full flex flex-col gap-8 pt-10'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-xl'>Meus Grupos</h1>
          <p className='text-gray-600'>3 grupos criados</p>
        </div>
        <div className='grid grid-cols-3 gap-6'>
          {groups?.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </main>
    </div>
  )
}
