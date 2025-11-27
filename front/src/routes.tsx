import { createBrowserRouter } from 'react-router-dom'
import { GroupPage } from './pages/group-pages/page'
import { TaskPage } from './pages/task-page/page'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <GroupPage />,
  },
  {
    path: '/tasks/:groupId',
    element: <TaskPage />,
  },
])
