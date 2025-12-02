import { createNewTask } from '@/api/create-new-task'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { query } from '@/lib/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'O nome precisa de no mínimo 3 caracteres'),
  description: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function DialogTask() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { groupId } = useParams()

  const { mutateAsync: createTaskFn } = useMutation({
    mutationFn: createNewTask,

    onSuccess: () => {
      toast.success('Task criada com sucesso!')
      query.invalidateQueries({ queryKey: ['group-details', groupId] })
      setIsOpen(false)
    },
  })

  async function onSubmit(data: FormData) {
    const { name, description } = data

    try {
      await createTaskFn({ groupId: groupId!, name, description })
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message)
      }
    }
  }
  function onError() {
    const firstError = errors.name?.message || errors.description?.message
    if (firstError) toast.error(firstError)
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className='flex items-center gap-2 bg-purple-600 rounded-lg p-3 px-5 cursor-pointer text-white'>
        <Plus /> Criar Task
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className='flex flex-col gap-2'
        >
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-semibold'>Criar Nova Task</h1>
            <p className='text-gray-600'>Adicione uma nova tarefa ao grupo</p>
          </div>
          <div className='flex flex-col gap-1'>
            <label>Título</label>
            <input
              {...register('name')}
              type='text'
              className='outline-0 border rounded-lg p-1 px-3'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label>Descrição</label>
            <textarea
              {...register('description')}
              placeholder='Adicione detalhes a essa tarefa ... '
              className='outline-0 border rounded-lg p-1 px-3'
            ></textarea>
          </div>
          <div className='flex gap-3 justify-end w-full'>
            <DialogClose className='border border-gray-200 rounded-lg p-2 px-3 cursor-pointer'>
              Cancelar
            </DialogClose>
            <button className='border border-gray-200 bg-green-500 rounded-lg p-2 px-3 cursor-pointer'>
              Criar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
