// AddExam.js

import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, CssBaseline, Dialog, DialogTitle, DialogContent, Grid,DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import config from '../config';
const theme = createTheme();

const AddExam = () => {
    const backendUrl = config.backendUrl
    const [examData, setExamData] = useState({
        title: '',
        numQuestions: '',
        timeLimit: '',
        questions: [],
    });
    const [isAddingQuestion, setIsAddingQuestion] = useState(false)
    const [newQuestion, setNewQuestion] = useState({
        questionText: '',
        options: ['', '', ''],
        correctOption: ''
    })
    const handleChange = (e) => {
        setExamData({
            ...examData,
            [e.target.name]: e.target.value,
        });
    };

    const handleOptionChange = ( optionIndex, e) => {
        setNewQuestion((prevQuestion)=>{
            const updatedOptions = [... prevQuestion.options]
            updatedOptions[optionIndex] = e.target.value
            return{
                ... prevQuestion,
                options:updatedOptions
            }
        })

        
    };

    const handleCorrectOptionChange = (e) => {
        setNewQuestion({
            ... newQuestion,
            correctOption: e.target.value
        })
    };
    const handleNewQuestionChange = (e) => {
        setNewQuestion({
            ...newQuestion,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddQuestion = () => {
        setExamData({
            ...examData,
            questions: [...examData.questions, newQuestion],
        });
        setIsAddingQuestion(false)
        setNewQuestion({
            questionText: '',
            options: ['', '', ''],
            correctOption: '',
        });
    };
    const openModal = () => {
        setIsAddingQuestion(true);
    };

    const closeModal = () => {
        setIsAddingQuestion(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${backendUrl}exam/create-exam`, {
                method: 'POST',
                body: JSON.stringify(examData),
                headers: {
                    'Content-type': 'application/json',
                     Authorization: "Bearer " + localStorage.getItem("token")
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Exam created successfully:', data);
            } else {
                console.error('Failed to create exam');
            }
        } catch (error) {
            console.error('Error during exam creation:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" style={{ marginTop: '5em' }}>
                <CssBaseline />
                <Paper elevation={3} style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" color="primary">
                        Add Exam
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '20px' }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Title"
                            name="title"
                            value={examData.title}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Number of Questions"
                            name="numQuestions"
                            type="number"
                            value={examData.numQuestions}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Time Limit"
                            name="timeLimit"
                            type="number" 
                            value={examData.timeLimit}
                            onChange={handleChange}
                        />

                        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handleSubmit}>
                            Add Exam
                        </Button>
                        <Button type="button" fullWidth variant="outlined" color="primary" onClick={openModal} style={{ marginTop: '20px' }}>
                            Add Question
                        </Button>
                    </form>
                </Paper>
                <Dialog open={isAddingQuestion} onClose={closeModal}>
                    <DialogTitle>Add Question</DialogTitle>
                    <DialogContent>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            label="Question Text"
                            name='questionText'
                            value={newQuestion.questionText}
                            onChange={handleNewQuestionChange}
                        />
                        <Grid container spacing={2}>
                            {newQuestion.options.map((option, optionIndex) => (
                                <Grid item xs={6} key={optionIndex}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label={`Option ${optionIndex + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange( optionIndex, e)}
                                    />
                                 
                                </Grid>
                            ))}
                               
                        </Grid>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Correct Option"
                                        value={newQuestion.correctOption}
                                        onChange={(e) => handleCorrectOptionChange(e)}
                                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddQuestion} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default AddExam;
