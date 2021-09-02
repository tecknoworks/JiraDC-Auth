const express = require("express")
const mongoose = require("mongoose")
const User = require('./models/user')
var cors = require('cors')
const app = express()
const authRoute = require('./routes/auth')
const { get } = require("mongoose")

const dbURI = 'mongodb+srv://cata:cata@cluster0.wcbqw.mongodb.net/first?retryWrites=true&w=majority'
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('', authRoute)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
app.get('/allusers', async (req, res) => {
    const record = await User.find({})
    res.json(record)
});

app.post('/allusers', async (req, res) => {
    let result = [];
    if (req.body.length) {
        for (let index = 0; index < req.body.length; index++) {
            const user = await User.find({ '_id': req.body[index] })
            result.push(user[0]);
        }
    }

    res.json(result)
});

app.post('/allusersselected', async (req, res) => {
        let result = [];
        if (req.body.length) {
            for (let index = 0; index < req.body.length; index++) {
                if(req.body[index]!==''){
                    const user = await User.find({ '_id': req.body[index] })
                    result.push(user[0]);
                }else{
                    result.push({username:"No assigned user"});
                }
            }
        }
        res.json(result)
});

db.on("error", (err) => { console.error(err) })
db.once("open", () => { console.log("DB started successfully") })

app.listen(8082, () => { console.log("Server started: 8082") })