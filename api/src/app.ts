import fastify from 'fastify'
import { routes } from './routes/index.ts'
import fastifyCors from '@fastify/cors'

export const app = fastify()

await app.register(fastifyCors, {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
})
app.register(routes)
