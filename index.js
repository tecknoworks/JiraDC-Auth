const express = require("express")
const mongoose = require("mongoose")
const User = require('./models/user')
var cors = require('cors')
const app = express()
const authRoute = require('./routes/auth')

const  dbURI = 'mongodb+srv://Damaris:12345@cluster0.gdp4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
app.use(express.json())
app.use(cors({origin: '*'}))
app.use('', authRoute)
mongoose.connect(dbURI , {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
// const router = express.Router()

// router.post('/signup', (req, res) => {
//     console.log("merge!")
//     res.status(200).json("")
// })

// app.use('', router)
app.get('/allusers', async (req, res) => {
    console.log("ana")
    const record= await User.find({})
    console.log(record)
    res.json(record)
});


db.on("error", (err)=>{console.error(err)})
db.once("open", () => {console.log("DB started successfully")})

app.listen(8082, () => {console.log("Server started: 8082")})