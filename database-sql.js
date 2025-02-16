import { randomUUID } from 'node:crypto'
import { serialize } from 'node:v8'
import mysql from 'mysql2'
import  dotenv  from 'dotenv'
import { title } from 'node:process'

dotenv.config()

const pool = mysql.createPool({
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export class DatabaseSQL{
    #videos = new Map()
    
    async List(search = '')
    {
        let resposta
        if(search){ resposta = await pool.query(`"select * from Videos where title like "%${search}%" `)}
        else{ resposta = await pool.query("select * from Videos")}
        return resposta[0]
    }
    async Create(video)
    {
        const id = randomUUID()
        const {title, description, duration} = video
        await pool.query(`insert into Videos (id, title, description, duration) values ('${id}', '${title}', '${description}', ${duration})`)
    }
    async Update(videoId, video)
    {
        const {title, description, duration} = video
        await pool.query(`update Videos set title = '${title}', description = '${description}', duration = ${duration} where id = '${videoId}'`)
        //return await pool.query(`select * from Videos where id = '${videoId}'`)
    }
    async Delete(videoId)
    {
        await pool.query(`delete from Videos where id='${videoId}'`)
    }
    async CreateTableVideos()
    {
        await pool.query("create table Videos(id varchar(60) primary key, title text, description text, duration int)")
    }
}