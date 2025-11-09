import app from './app.js'
import http from 'http'
import connector from './DB/database.js'


const server = http.createServer(app)

connector();
const port = 3000

server.listen(port,()=>{
    console.log(`Server Connected at port ${port}`)
});