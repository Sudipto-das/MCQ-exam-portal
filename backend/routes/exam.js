const express = require('express');
const { Exam } = require('../database');
const router = express.Router();
const {authentication} = require('../middleware/')

router.post('/create-exam',authentication,async (req, res) => {
    try {
        const { title, numQuestions, timeLimit,  questions } = req.body;
        const pointValue =1
        const newExam = new Exam({
            title,
            numQuestions,
            timeLimit,
            scoringMechanism: JSON.stringify({ type: 'simple', pointValue }),
            questions,

        });
        const savedExam = await newExam.save();
        return res.json(savedExam);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
    }
})
router.get('/get-exams',authentication,async(req,res)=>{
    try{
        const exams = await Exam.find({})
        res.json(exams)

    }catch(err){
        res.status(500).json({err:err.message})
    }
})
// Get details of an exam including questions
router.get('/get-exam/:examId',authentication, async (req, res) => {
    try {
        const examId = req.params.examId;
        const exam = await Exam.findById(examId);
        return res.json(exam);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

// Update an existing exam (including questions)
router.put('/update-exam/:examId',authentication, async (req, res) => {
    try {
        const examId = req.params.examId;
        const { title, numQuestions, timeLimit, questions } = req.body;
        const pointValue = 1;

        const updatedExam = await Exam.findByIdAndUpdate(
            examId,
            {
                title,
                numQuestions,
                timeLimit,
                scoringMechanism: JSON.stringify({ type: 'simple', pointValue }),
                questions,
            },
            { new: true }
        );

        return res.json(updatedExam);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});
// Delete an exam
router.delete('/delete-exam/:examId',authentication, async (req, res) => {
    try {
        const examId = req.params.examId;
        const deletedExam = await Exam.findByIdAndDelete(examId);
        return res.json(deletedExam);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});
// Add a new question to an existing exam
router.post('/add-question/:examId', async (req, res) => {
    try {
        const examId = req.params.examId;
        const { questionText, options, correctOption } = req.body;

        const question = {
            questionText,
            options,
            correctOption,
        };

        const updatedExam = await Exam.findByIdAndUpdate(
            examId,
            { $push: { questions: question } },
            { new: true }
        );

        res.json(updatedExam);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// Delete a question from an existing exam
router.delete('/delete-question/:examId/:questionId', async (req, res) => {
    try {
        const examId = req.params.examId;
        const questionId = req.params.questionId;

        const updatedExam = await Exam.findByIdAndUpdate(
            examId,
            { $pull: { questions: { _id: questionId } } },
            { new: true }
        );

        res.json(updatedExam);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
// Update a question in an existing exam
router.put('/update-question/:examId/:questionId', async (req, res) => {
    try {
        const examId = req.params.examId;
        const questionId = req.params.questionId;
        const { questionText, options, correctOption } = req.body;

        const updatedExam = await Exam.findOneAndUpdate(
            { _id: examId, 'questions._id': questionId },
            {
                $set: {
                    'questions.$.questionText': questionText,
                    'questions.$.options': options,
                    'questions.$.correctOption': correctOption,
                },
            },
            { new: true }
        );

        res.json(updatedExam);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;