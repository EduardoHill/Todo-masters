import { FastifyInstance } from 'fastify'
import { createGroupRoute } from './create-group.route.ts'
import { updateGroupDataRoute } from './update-group.function.ts'
import { createTaskRoute } from './create-task.route.ts'
import { deleteGroupRoute } from './delete-group.route.ts'
import { updateTaskStatusRoute } from './update-task-status.route.ts'

import { deleteTaskRoute } from './delete-task.route.ts'
import { getTotalGroupsRoute } from './get-total-groups.route.ts'
import { getGroupDetailsRoute } from './get-group-details.route.ts'
import { getTaskDetailsRoute } from './get-task-details.route.ts'
import { updateTaskRoute } from './update-task.route.ts'

export async function routes(app: FastifyInstance) {
  app.register(createGroupRoute)
  app.register(updateGroupDataRoute)
  app.register(createTaskRoute)
  app.register(deleteGroupRoute)
  app.register(updateTaskStatusRoute)
  app.register(updateTaskRoute)
  app.register(deleteTaskRoute)
  app.register(getTotalGroupsRoute)
  app.register(getGroupDetailsRoute)
  app.register(getTaskDetailsRoute)
}
