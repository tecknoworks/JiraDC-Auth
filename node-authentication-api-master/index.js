const express = require("express")
const mongoose = require("mongoose")
var cors = require('cors')
const app = express()
const authRoute = require('./routes/auth')

const  dbURI = "mongodb+srv://Damaris:12345@cluster0.gdp4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
app.use(express.json())
app.use(cors({origin: '*'}))
app.use('', authRoute)

// const router = express.Router()

// router.post('/signup', (req, res) => {
//     console.log("merge!")
//     res.status(200).json("")
// })

// app.use('', router)


mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})

app.listen(8082, () => {console.log("Server started: 8082")})