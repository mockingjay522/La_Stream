const cors = require('cors')
const io = require('socket.io')(5002, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
})


io.on('connection', socket =>{
    const id = socket.handshake.query.id
    socket.join(id)

    socket.on('send-message', ({recipients, text}) =>{
        recipients.forEach(recipient =>{
            const newRecipients = recipients.filter(r => r!==recipient)
            newRecipients.push(id)
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients, sender: id, text
            })
        })
    })
})


                                const kritika = {
                                    position: [
                                        "Web Developer",
                                        "Software Developer",
                                        "Full Stack Developer",
                                        "Machine Learning Engineer"
                                    ],
                                    education: ["Douglas College (CSIS)"],
                                    languages: ["Javascript", "PHP", "Python", "Java"],
                                    interests: ["Coding", "Reading", "Music"]
                                }
