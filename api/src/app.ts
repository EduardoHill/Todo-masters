import fastify from 'fastify'
import { routes } from './routes/index.ts'

export const app = fastify()

app.register(routes)
