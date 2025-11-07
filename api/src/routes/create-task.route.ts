import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { CreateTask } from '../functions/create-task.function.ts'

const schemaBody = z.object({
  name: z.string(),
  description: z.string().optional(),
})

const schemaParms = z.object({
  groupId: z.string(),
})

export const createTaskRoute: FastifyPluginCallback = (app) => {
  app.post('/create-task/:groupId', async (request, reply) => {
    try {
      const { name, description } = schemaBody.parse(request.body)
      const { groupId } = schemaParms.parse(request.params)

      const { message } = await CreateTask({ name, groupId, description })

      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
