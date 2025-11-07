import { FastifyPluginCallback } from 'fastify'
import z from 'zod'
import { DeleteGroupFuntion } from '../functions/delete-group.funtion.ts'

const schemaParms = z.object({
  groupId: z.string(),
})

export const deleteGroupRoute: FastifyPluginCallback = (app) => {
  app.delete('/delete-group/:groupId', async (request, reply) => {
    try {
      const { groupId } = schemaParms.parse(request.params)
      const { message } = await DeleteGroupFuntion({ groupId })
      return reply.status(200).send(message)
    } catch (error) {
      return reply.status(400).send(error)
    }
  })
}
