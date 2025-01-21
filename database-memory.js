import { randomUUID } from 'node:crypto'


export class DatabaseMemory{
    #videos = new Map()
    list(search)
    {
        return Array.from(this.#videos.entries()).map((videoArray) =>{ //encapsula o iterator para array
            const id = videoArray[0]
            const data = videoArray[1]
            return {
                id,
                ...data, //spread populator do Js
            } 
        }).filter(video => {
            if(search){ //se tiver search
                return video.tittle.includes(search) 
            }
            return true //se não tiver, manda todos 
        })
    }
    create(video)
    {
        const videoId = randomUUID()
        this.#videos.set(videoId, video)
    }
    update(id, video)
    {
        this.#videos.set(id, video)
    }
    delete(id)
    {
        this.#videos.delete(id)
    }

}