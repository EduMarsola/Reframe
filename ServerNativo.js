import { createServer, Server } from 'node:http' //node:crypto -> hash


const server = createServer((request, response) => { 
    console.log("ola")      
    response.write("oi")
    return response.end()
})

server.listen(3334)





