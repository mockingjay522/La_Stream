const express = require('express');
const app = express();
const mysql = require("mysql")
const cors = require('cors')
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const {v4: uuidV4} = require('uuid')

app.use(fileUpload())
app.use(cors({origin: true, credentials: true}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

//Initialization of database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'la_stream'
})

//Check if administrative user with the same email address exists during admin registration
app.post("/validateadminemail", (req,res)=>{
    const email = req.body.email;
    const stmt = "SELECT * FROM organization WHERE email = ?;"
    db.query(stmt, [email], (err, result)=>{
        if(result.length!=0){
                res.send({exists:true})
        }else{
            res.send({exists:false})
        }
    })
})

//create an administrative user
app.post("/createUser", async(req,res)=>{
    const orgname = req.body.orgname;
    const industry = req.body.industry;
    const service = req.body.service;
    const numberemp = req.body.numberemp;
    const email = req.body.email;
    const password = req.body.password;

    //Create a new administrative user
    const sqlInsert = "INSERT INTO organization (orgname, industry, service, numberemp, email, password) VALUES (?,?,?,?,?,?);"
    await db.query(sqlInsert, [orgname, industry, service, numberemp, email, password], (err, result)=>{
    })

    //To alert the user that account has been created and the organization id
    const stmt = "SELECT orgid FROM organization WHERE email = ?;"
    db.query(stmt, [email], (err, result)=>{
        res.send({exists:false, orgid: result[0].orgid})
    }) 
})

//Check if employee with the same email address exists for the organization. Employee email must be unique
app.post("/validateemployeeemail", (req,res)=>{
    const email = req.body.email;
    const orgid = req.body.orgid;
    const stmt = "SELECT * FROM employee WHERE email = ? AND orgid = ?;"
    db.query(stmt, [email, orgid], (err, result)=>{
        if(result.length!=0){
                res.send({exists:true})
        }else{
                res.send({exists:false})
        }
    })
})

//Check if employee with the same employee id exists for the organization. Employee id must be unique
app.post("/validateemployeeid", (req,res)=>{
    const orgid = req.body.orgid;
    const empid = req.body.empid;
    const stmt = "SELECT * FROM employee WHERE empid = ? AND orgid = ?;"
    db.query(stmt, [empid, orgid], (err, result)=>{
        if(result.length!=0){
                res.send({exists:true})
        }else{
                res.send({exists:false})
        }
    })
})
 
//Create a new employee
app.post("/createEmployee", async(req,res)=>{
    const orgid = req.body.orgid;
    const empid = req.body.empid 
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const middleName = req.body.middleName
    const contactno =  req.body.contactno
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const departmentid = req.body.departmentid
    const supervisorid = req.body.supervisorid
    const salary = req.body.salary
    const emergencycontact = req.body.emergencycontact
    const emergencycontactno = req.body.emergencycontactno
    const hiredate = req.body.hiredate
    const post = req.body.post
    const gender = req.body.gender
    const birthdate = req.body.birthdate
    const imgid = req.body.imgid
    
    
    const sqlInsert = "INSERT INTO employee (orgid, empid, firstName, lastName, middleName, contactno, email, password, address, departmentid, supervisorid, salary, emergencycontact, emergencycontactno, hiredate, post, gender, birthdate, imgid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    db.query(sqlInsert, [orgid, empid, firstName, lastName, middleName, contactno, email, password, address, departmentid, supervisorid, salary, emergencycontact, emergencycontactno, hiredate, post, gender, birthdate, imgid], (err, result)=>{
        console.log(err)
        res.send({status: "ok"})
    })
})


//Create a new employee
app.post("/updateEmployee", async(req,res)=>{
    const orgid = req.body.orgid;
    const empid = req.body.empid 
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const middleName = req.body.middleName
    const contactno =  req.body.contactno
    const email = req.body.email
    const password = req.body.password
    const address = req.body.address
    const departmentid = req.body.departmentid
    const supervisorid = req.body.supervisorid
    const salary = req.body.salary
    const emergencycontact = req.body.emergencycontact
    const emergencycontactno = req.body.emergencycontactno
    const hiredate = req.body.hiredate
    const post = req.body.post
    const gender = req.body.gender
    const birthdate = req.body.birthdate
    
    const sqlInsert = "UPDATE employee SET firstName=?, lastName=?, middleName=?, contactno=?, email=?, password=?, address=?, departmentid=?, supervisorid=?, salary=?, emergencycontact=?, emergencycontactno=?, hiredate=?, post=?, gender=?, birthdate=? WHERE empid=? and orgid=?"
    db.query(sqlInsert, [firstName, lastName, middleName, contactno, email, password, address, departmentid, supervisorid, salary, emergencycontact, emergencycontactno, hiredate, post, gender, birthdate, empid, orgid], (err, result)=>{
        console.log(err)
        res.send({status: "ok"})
    })
})

//verify administrative credentials
app.post("/adminsignin/verify", async(req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;
    const password = req.body.password;

    const stmt = "SELECT * FROM organization WHERE orgid = ?;"
    db.query(stmt, [orgid], (err, result)=>{
        if (email === result[0].email && password === result[0].password){
            res.send({status:"ok", privilige:"admin"})
        }else{
            res.send({status:"notok"})
        }
    })
})

//verify employee credentials
app.post("/employeesignin/verify", async(req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;
    const password = req.body.password;

    const stmt = "SELECT * FROM employee WHERE orgid = ? AND email =?;"
    db.query(stmt, [orgid, email], (err, result)=>{
        try{
            if (email === result[0].email && password === result[0].password){
                //Log into timesheet
                const timestmt = "INSERT INTO timesheet (orgid, email, type, timestamp) VALUES (?,?,?,?);"
                db.query(timestmt, [orgid, email, "IN", new Date()], (err, result)=>{
                        console.log(err)
                })
                res.send({status:"ok"})
            }else{
                res.send({status:"notok"})
            }
        }catch(e){
            res.send({status:"notok"})
        }
    })
})

//get the admin data from email address
app.post("/adminData", (req,res) =>{
    const email = req.body.email;
    const stmt = "SELECT * FROM organization WHERE email = ?;"
    db.query(stmt, [email], (err, result)=>{
        if(result.length!=0){
            res.send(result[0])
        }else{
            res.send({exists:false})
        }
    })
})

//get the employee data from email address
app.post("/employeeData", (req,res) =>{
    const email = req.body.email;
    const orgid = req.body.orgid;
    const stmt = "SELECT * FROM employee WHERE email = ? AND orgid = ?;"
    db.query(stmt, [email, orgid], (err, result)=>{
        if(result.length!=0){
            res.send(result[0])
        }else{
            res.send({exists:false})
        }
    })
})

//get the organization data from orgid
app.post("/orgData", (req,res) =>{
    const orgid = req.body.orgid;
    const stmt = "SELECT * FROM organization WHERE orgid = ?;"
    db.query(stmt, [orgid], (err, result)=>{
        if(result.length!=0){
            res.send(result[0])
        }else{
            res.send({exists:false})
        }
    })
})


app.post("/timesheet/out", async(req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;

    const timestmt = "INSERT INTO timesheet (orgid, email, type, timestamp) VALUES (?,?,?,?);"
    db.query(timestmt, [orgid, email, "OUT", new Date()], (err, result)=>{
        console.log(err)
    })
    res.send({status:"signedout"})
})

app.post("/postMessage", async(req,res)=>{
    const orgid = req.body.orgid;
    const senderemail = req.body.senderemail;
    const receiveremail = req.body.receiveremail;
    const message = req.body.message;


    const timestmt = "INSERT INTO message (orgid, senderemail, receiveremail, timestamp, message) VALUES (?,?,?,?,?);"
    db.query(timestmt, [orgid, senderemail, receiveremail, new Date(), message], (err, result)=>{
        console.log(err)
    })
    res.send("messagePosted")
})

//Get attendance of everyone in the organization
app.post("/getAllAttendance", async(req,res)=>{
    const orgid = req.body.orgid;

    const stmt = "SELECT * FROM timesheet WHERE orgid = ?;"
    db.query(stmt, [orgid], (err, result)=>{
        console.log(err)
        res.send(result)
    })
    
})

//Get attendance of particular employee
app.post("/getOneAttendance", async(req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.empemail;
    const stmt = "SELECT * FROM timesheet WHERE orgid = ? AND email =?;"
    db.query(stmt, [orgid, email], (err, result)=>{
        console.log(result)
        res.send(result)
    })
})


app.post("/uploadFile", (req,res, next)=>{
    const file = req.files.file
    const fileName = req.files.file.name

    const uploadPath = __dirname+"/proposals/"+fileName
    file.mv(__dirname+"/proposals/"+fileName)
    res.send({filepath: uploadPath, fileName: fileName})
})


//create a new Project
app.post("/createProject", (req, res)=>{
    const orgid = req.body.orgid;
    const name = req.body.proName;
    const lead = req.body.proLead;
    const date = req.body.proDate;
    const file = req.body.proFile;
    const filename = req.body.filename;

    const stmt = "INSERT INTO project (orgid, name, lead, date, file, filename) VALUES (?,?,?,?,?,?);"
    
    db.query(stmt, [orgid, name, lead, date, file, filename], (err, result)=>{
        console.log(err)
        res.send({status:"project_created"})
    })
})

//create a new Conference
app.post("/createConference", (req, res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;
    const time = req.body.confTime;
    const date = req.body.confDate;
    const name = req.body.confName;
    const id = uuidV4()

    const stmt = "INSERT INTO meeting (orgid, createdby, createdon, date, time, subject, roomId) VALUES (?,?,?,?,?,?,?);"
    
    db.query(stmt, [orgid, email, new Date(), date, time, name, id], (err, result)=>{
        console.log(err)
        res.send({status:"conference_created"})
    })
})

//get project data for employee
app.post("/getProjectdata", (req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;

    const stmt = "SELECT * FROM project WHERE orgid = ? AND lead = ? ;"
    db.query(stmt, [orgid, email], (err, result)=>{
        res.send(result)
    })
})

//get conference data for employee
app.post("/getConferencedata", (req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;

    const stmt = "SELECT * FROM meeting WHERE orgid = ? AND createdby = ? ;"
    db.query(stmt, [orgid, email], (err, result)=>{
        res.send(result)
    })
})

//get project data for employee
app.post("/getOtherProject", (req,res)=>{
    const orgid = req.body.orgid;
    const email = req.body.email;

    const stmt = "SELECT * FROM projectTeam WHERE orgid = ? AND email = ? ;"
    db.query(stmt, [orgid, email], (err, result)=>{
        res.send(result)
    })
})

//get project data for employee
app.post("/getOtherconference", (req,res)=>{
    const email = req.body.email;

    const stmt = "SELECT * FROM meetingparticipants WHERE email = ? ;"
    db.query(stmt, [email], (err, result)=>{
        res.send(result)
    })
})

//get project data from projectid
app.post("/oneProjectData", (req,res)=>{
    const proId = req.body.proId;
    const stmt = "SELECT * FROM project WHERE projectId= ?;"
    db.query(stmt, [proId], (err, result)=>{
        res.send(result)
    })
})

//get conference data from conferenceid
app.post("/getoneConferencedata", (req,res)=>{
    const confId = req.body.confId;

    const stmt = "SELECT * FROM meeting WHERE meetingrtid = ?"
    db.query(stmt, [confId], (err, result)=>{
        res.send(result)
    })
})

//get Conference Team data from conferenceid
app.post("/ConferenceTeamData", (req,res)=>{
    const confId = req.body.confId;
    const stmt = "SELECT * FROM meetingparticipants Team WHERE meetingrtid= ?;"
    db.query(stmt, [confId], (err, result)=>{
        res.send(result)
    })
})

//change project progress value
app.post("/changeProgress", (req,res)=>{
    const proId = req.body.proId;
    const progress = req.body.progress;

    console.log(progress)
    const stmt = "UPDATE project SET progress = ? WHERE projectId = ?;"
    db.query(stmt, [progress, proId], (err)=>{
        res.send("done")
    })
})

app.post("/addProjectMember", (req,res)=>{
    const name = req.body.name;
    const orgid = req.body.orgid;
    const proId = req.body.proId;
    const email = req.body.newEmail;
    const role = req.body.newRole;
    const responsibilities = req.body.newResponsibilities;

    const stmt = "INSERT INTO projectTeam (orgid, projectId, name, email, role, responsibilities) VALUES (?,?,?,?,?,?)"
    db.query(stmt, [orgid, proId, name, email, role, responsibilities], (err)=>{
        console.log(err)
    })
})

app.post("/addConferenceMember", (req,res)=>{

    const confid = req.body.confId;
    const email = req.body.newEmail;
    const date = req.body.date;
    const time = req.body.time;
    const subject = req.body.subject
    const roomId = req.body.roomId

    const stmt = "INSERT INTO meetingparticipants (meetingrtid, date, time, subject, email, roomId) VALUES (?,?,?,?,?,?)"
    db.query(stmt, [confid, date, time, subject, email, roomId], (err)=>{
        console.log(err)
    })
})

//get Project Team data from projectid
app.post("/ProjectTeamData", (req,res)=>{
    const proId = req.body.proId;
    const stmt = "SELECT * FROM projectTeam WHERE projectId= ?;"
    db.query(stmt, [proId], (err, result)=>{
        res.send(result)
    })
})

//get Project name from projectid
app.post("/getProjectname", (req,res)=>{
    const orgid = req.body.orgid;
    const projectid = req.body.projectId;
    const stmt = "SELECT name FROM project WHERE orgid= ? AND projectId = ?;"
    db.query(stmt, [orgid, projectid], (err, result)=>{
        res.send(result)
    })
})

//start the server
app.listen(3001, ()=>{
    console.log("Listening on port 3001")
})

const io = require('socket.io')(5001, {
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