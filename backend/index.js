const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth')
const examRoutes = require('./routes/exam')
const cors = require('cors')

const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes);
app.use('/exam',examRoutes)
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`)
})

mongoose.connect('mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/MCQ-Exam', { dbName: "MCQ-Exam" })