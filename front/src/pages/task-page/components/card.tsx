import { updateTaskStatus } from '@/api/update-task-status'
import { Checkbox } from '@/components/ui/checkbox'
import { query } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'
import { Pencil, Trash2 } from 'lucide-react'

import { toast } from 'sonner'

interface CardTaskProps {
  task: {
    name: string
    id: string
    description: string
    completed: boolean
  }
}

export function CardTask({ task }: CardTaskProps) {
  const { mutateAsync: updateStatus } = useMutation({
    mutationFn: updateTaskStatus,

    onSuccess: () => {
      toast.success('Task atualizada com sucesso!')
      query.invalidateQueries({ queryKey: ['group-details'] })
    },
  })

  return (
    <div
      className={`bg-white shadow-lg  flex w-full justify-between items-center p-4 rounded-lg ${
        task.completed
          ? 'opacity-50 line-through'
          : 'hover:shadow-xl cursor-pointer transition-shadow'
      }`}
    >
      <div className='flex gap-3 items-center'>
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => updateStatus({ taskId: task.id })}
        />
        <h1 className='font-bold'>{task.name}</h1>
      </div>

      <div className='flex gap-2'>
        <button className='hover:bg-blue-300 p-2 rounded-lg'>
          <Pencil />
        </button>
        <button className='hover:bg-red-300 p-2 rounded-lg'>
          <Trash2 />
        </button>
      </div>
    </div>
  )
}
