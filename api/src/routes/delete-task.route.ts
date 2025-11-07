import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { deleteTaskFunction } from '../functions/delete-task.function.ts'

const schemaParms = z.object({
  taskId: z.string(),
})

export const deleteTaskRoute: FastifyPluginCallback = (app) => {
  app.delete('/delete-task/:taskId', async (request, reply) => {
    try {
      const { taskId } = schemaParms.parse(request.params)

      const { message } = await deleteTaskFunction({ taskId })

      return reply.status(201).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
