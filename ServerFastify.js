import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'


const database = new DatabaseMemory()

const server = fastify()
server.get('/', () => {return 'Hello, World raiz'}) //quando o cliente acessar a pasta raiz abre nessa função
server.get('/1', () => {return 'Hello, World 1'})
server.get('/2', () => {return 'Hello, World 2'})
    
server.post('/videos', (request, reply) => {
    const {tittle, description, duration} = request.body
    database.create({
        tittle : tittle,
        description : description,
        duration : duration, //ou somente tittle, description, duration (short sintax)
    })

    return reply.status(201).send() //algo foi criado
})

server.get('/videos', (request, reply) => {
    const videos = database.list()
    return videos
})

server.put('/videos/:id', (request, reply) => {
    const videoID = request.params.id
    const {tittle, description, duration} = request.body
    database.update(videoID, {
        title,
        description,
        duration
    })
    return reply.statusCode(204).send() //sucesso sem conteúdo na resposta
})


server.delete('/videos/:id', () => {})

server.listen({port: 3333})



