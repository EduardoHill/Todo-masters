import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { getTaskDetailsFunction } from '../functions/get-task-details.function.ts'

const schemaParms = z.object({
  taskId: z.string(),
})

export const getTaskDetailsRoute: FastifyPluginCallback = (app) => {
  app.get('/get-task/:taskId', async (request, reply) => {
    try {
      const { taskId } = schemaParms.parse(request.params)

      const task = await getTaskDetailsFunction({ taskId })

      return reply.status(200).send(task)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
