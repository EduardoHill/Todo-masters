import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { UpdateTaskStatusFuntion } from '../functions/update-task-status.function.ts'

const schemaParms = z.object({
  taskId: z.string(),
})

export const updateTaskStatusRoute: FastifyPluginCallback = (app) => {
  app.patch('/update-task-status/:taskId', async (request, reply) => {
    try {
      const { taskId } = schemaParms.parse(request.params)

      const { message } = await UpdateTaskStatusFuntion({ taskId })

      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
