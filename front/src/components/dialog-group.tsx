import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { Plus } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { createNewGroup } from '@/api/create-new-group'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { AxiosError } from 'axios'
import { query } from '@/lib/react-query'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
})
type FormData = z.infer<typeof formSchema>

export function DialogGroup() {
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

  const { mutateAsync: createGroupFn } = useMutation({
    mutationFn: createNewGroup,
    onSuccess: () => {
      toast.success('Grupo criado com sucesso!')
      query.invalidateQueries({ queryKey: ['groups'] })
      setIsOpen(false)
    },
  })

  async function onSubmit(data: FormData) {
    const { description, name } = data

    try {
      await createGroupFn({ name, description })
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
        <Plus /> Criar grupo
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className='flex flex-col gap-2'
        >
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-semibold'>Criar Novo Grupo</h1>
            <p className='text-gray-600'>
              Organize suas tarefas criando um novo grupo
            </p>
          </div>
          <div className='flex flex-col gap-1'>
            <label>Nome do Grupo</label>
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
              placeholder=' Descreva o propósito deste grupo...'
              className='outline-0 border rounded-lg p-1 px-3'
            ></textarea>
          </div>
          <div className='flex gap-3 justify-end w-full'>
            <DialogClose className='border border-gray-200 rounded-lg p-2 px-3 cursor-pointer'>
              Cancelar
            </DialogClose>
            <button
              type='submit'
              className='border border-gray-200 bg-green-500 rounded-lg p-2 px-3 cursor-pointer'
            >
              Criar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
