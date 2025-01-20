import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'


const database = new DatabaseMemory()

const server = fastify()
server.listen({port: 3333})
server.get('/', () => {return 'Hello, World raiz'}) //quando o cliente acessar a pasta raiz abre nessa função
server.get('/1', () => {return 'Hello, World 1'})
server.get('/2', () => {return 'Hello, World 2'})
server.post('/video', () => {
    database.create({
        tittle : 'titulo',
        description : "descricao",
        duration : 180
    })
    console.log(database.list())
})
server.get('/video', () => {})
server.put('/video/:id', () => {})
server.delete('/video/:id', () => {})




