import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { Plus } from 'lucide-react'

export function DialogTask() {
  return (
    <Dialog>
      <DialogTrigger className='flex items-center gap-2 bg-purple-600 rounded-lg p-3 px-5 cursor-pointer text-white'>
        <Plus /> Criar Task
      </DialogTrigger>
      <DialogContent className='bg-white'>
        <form className='flex flex-col gap-2'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-semibold'>Criar Nova Task</h1>
            <p className='text-gray-600'>Adicione uma nova tarefa ao grupo</p>
          </div>
          <div className='flex flex-col gap-1'>
            <label>Título</label>
            <input
              type='text'
              className='outline-0 border rounded-lg p-1 px-3'
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label>Descrição</label>
            <textarea
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
