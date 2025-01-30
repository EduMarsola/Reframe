import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'
import { DatabaseSQL } from './database-sql.js'


//const database = new DatabaseMemory()
const database = new DatabaseSQL()

const server = fastify()
server.get('/', () => {return 'Hello, World raiz'}) //quando o cliente acessar a pasta raiz abre nessa função
server.get('/1', () => {return 'Hello, World 1'})
server.get('/2', () => {return 'Hello, World 2'})
    
server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body
    await database.Create({
        title : title,
        description : description,
        duration : duration, //ou somente tittle, description, duration (short sintax)
    })

    return reply.status(201).send() //algo foi criado
})

server.get('/videos', async (request, reply) => {
    const search = request.query.search
    console.log(search)
    const videos = await database.List(search)
    return videos
})


server.put('/videos/:videoId', async (request, reply) => {
    const videoId = request.params.videoId
    const {title, description, duration} = request.body
    await database.Update(videoId, {
        title,
        description,
        duration,
    })
    return reply.status(204).send()
     
})


server.delete('/videos/:id', async (request, reply) => {
    const videoID = request.params.id
    await database.Delete(videoID)
    return reply.status(204).send()//sucesso sem conteúdo na resposta
})


server.get('/create', async () => {
    await database.CreateTableVideos()
    return reply.status(204).send()
})


server.listen({port: process.env.PORT ?? 3333})



