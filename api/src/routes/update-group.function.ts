import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { UpdateGroupDataFunction } from '../functions/update-group.function.ts'

const schemaBody = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
})
const schemaParms = z.object({
  groupId: z.string(),
})

export const updateGroupDataRoute: FastifyPluginCallback = (app) => {
  app.put('/update-group-data/:groupId', async (request, reply) => {
    try {
      const { description, name } = schemaBody.parse(request.body)
      const { groupId } = schemaParms.parse(request.params)

      const { message } = await UpdateGroupDataFunction({
        groupId,
        description,
        name,
      })

      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
