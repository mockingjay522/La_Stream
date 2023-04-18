const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)

app.set('view engine', 'ejs')
app.use(express.static(`public`))

app.get('/', (req,res)=>{
    
})

io.on('connection', socket=>{
    socket.on('join-room', (roomId, userId)=>{
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })
})

app.get('/:room', (req,res)=>{
    res.render('room', {roomId: req.params.room})
})

server.listen(3003)