const mongoose  = require('mongoose')

const userSchema = new mongoose.Schema({
    username:String,
    password:String
})

const questionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],
    correctOption: String,
});
 

const examSchema = new mongoose.Schema({
    title: String,
    numQuestions: Number,
    timeLimit: Number,
    scoringMechanism: {
        type: String,
        pointValue: Number
    },
    
    questions: [questionSchema],
})
const User = mongoose.model('User',userSchema)
const Exam = mongoose.model('Exam', examSchema);

module.exports={User,Exam}