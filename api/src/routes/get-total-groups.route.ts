import { FastifyPluginCallback } from 'fastify'
import { geteTotalGroupsFunction } from '../functions/get-total-groups.function.ts'

export const getTotalGroupsRoute: FastifyPluginCallback = (app) => {
  app.get('/get-total-groups', async (request, reply) => {
    try {
      const groups = await geteTotalGroupsFunction()

      return reply.status(200).send(groups)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
