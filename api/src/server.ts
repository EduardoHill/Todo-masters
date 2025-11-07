import { app } from './app.ts'
import 'dotenv/config'
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Servidor rodando')
  })
