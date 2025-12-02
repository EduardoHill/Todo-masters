import { deleteGroup } from '@/api/delete-group'
import { query } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { FolderOpen, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

interface GroupCardProps {
  group: {
    id: string
    description: string
    name: string
    _count: {
      tasks: number
    }
  }
}

export function GroupCard({ group }: GroupCardProps) {
  const { mutateAsync: deleteGroupFn } = useMutation({
    mutationFn: deleteGroup,

    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['groups'] })
      toast.success('Grupo deletado com sucesso!')
    },
  })
  return (
    <Link
      to={`/tasks/${group.id}`}
      className='bg-white flex flex-col gap-1 p-5 shadow-lg rounded-lg hover:shadow-2xl transition-shadow group px-5 min-h-32'
    >
      <div className='flex w-full justify-between items-center py-7'>
        <div className='flex gap-2'>
          <div className='flex bg-purple-400 p-3 rounded-lg items-center justify-center group-hover:bg-purple-500 transition-colors duration-300'>
            <FolderOpen />
          </div>
          <div className='flex flex-col gap-1'>
            <h1 className='font-bold'>{group.name} </h1>
            <p className='text-sm text-gray-600'>{group._count.tasks} tasks</p>
          </div>
        </div>
        <div className='flex gap-2'>
          <button className='hover:bg-blue-300 p-2 rounded-lg'>
            <Pencil />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              deleteGroupFn({ groupId: group.id })
            }}
            className='hover:bg-red-300 p-2 rounded-lg'
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <div className='text-gray-600'>
        <h1>{group.description}</h1>
      </div>
    </Link>
  )
}
