import { sql } from './db.js'
sql`create table videos(
    title TEXT,
    description TEXT,
    duration INTEGER);
    `.then(() => {console.log("tabela criada")})