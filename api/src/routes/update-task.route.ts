import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { updateTaskFunction } from '../functions/update-task.function.ts'

const schemaBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})

const schemaParms = z.object({
  taskId: z.string(),
})

export const updateTaskRoute: FastifyPluginCallback = (app) => {
  app.put('/update-task/:taskId', async (request, reply) => {
    try {
      const { description, name } = schemaBody.parse(request.body)
      const { taskId } = schemaParms.parse(request.params)

      const { message } = await updateTaskFunction({
        taskId,
        description,
        name,
      })

      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
