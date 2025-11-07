import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { getGroupDetails } from '../functions/get-group-details.function.ts'

const schemaParms = z.object({
  groupId: z.string(),
})

export const getGroupDetailsRoute: FastifyPluginCallback = (app) => {
  app.get('/get-group-details/:groupId', async (request, reply) => {
    try {
      const { groupId } = schemaParms.parse(request.params)

      const groupDetails = await getGroupDetails({ groupId })

      return reply.status(200).send(groupDetails)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
