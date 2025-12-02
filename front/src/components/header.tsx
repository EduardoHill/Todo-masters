import { ArrowLeft, SquareCheckBig } from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'
import { DialogGroup } from './dialog-group'
import { DialogTask } from './dialog-tasks'

export type pathProps = {
  path: string | string[]
}
interface HeaderComponentProps {
  name?: string
  description?: string
}

export function HeaderComponent({ name, description }: HeaderComponentProps) {
  const { pathname } = useLocation()
  const isGroup = pathname === '/'

  return (
    <header className='flex items-center justify-between p-8 bg-white shadow-lg'>
      {isGroup ? (
        <div className='flex items-center gap-5'>
          <div className='p-3 bg-purple-600 rounded-lg'>
            <SquareCheckBig color='white' />
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold '>ToDo Master</h1>
            <p className='text-gray-600 text-sm'>
              Organize suas tarefas com eficiência
            </p>
          </div>
        </div>
      ) : (
        <div className='flex gap-4 items-center'>
          <Link to={'/'}>
            <ArrowLeft />
          </Link>
          <div className='flex flex-col gap-3'>
            <h1 className='text-2xl font-semibold'>{name}</h1>
            <p className='text-gray-600'>{description}</p>
          </div>
        </div>
      )}
      {isGroup ? <DialogGroup /> : <DialogTask />}
    </header>
  )
}
