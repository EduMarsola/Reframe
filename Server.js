import { createServer, Server } from 'node:http' //node:crypto -> hash


const server = createServer((request, response) => { 
    console.log("ola")
    response.write("oi")
    return response.end()
})

server.listen(3333)

/*
resquest : mantem as informações da requisição
response : recebe as informações da resposta
    .write(string texto) -> escreve o texto na página
    .end() -> finaliza a requisição


server = createServer ((request, response) => {função})
    recebe o request e response e passa a função a ser execultada
    .listen(int porta) -> execulta a API quando a porta for chamada ex: .listen(3333) || localhost:3333

*/