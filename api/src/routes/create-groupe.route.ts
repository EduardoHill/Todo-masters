import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { CreateGroupFunction } from '../functions/create-group.function.ts'

const schemaBody = z.object({
  name: z.string(),
  description: z.string().optional(),
})

export const createGroupRoute: FastifyPluginCallback = (app) => {
  app.post('/create-group', async (request, reply) => {
    try {
      const { name, description } = schemaBody.parse(request.body)

      const { message } = await CreateGroupFunction({ name, description })

      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
