import React, { useState, useEffect } from 'react';
import { useParams ,Link} from 'react-router-dom';
import {
    Typography,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
} from '@mui/material';

const ExamDetails = () => {
    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [editQuestionModalOpen, setEditQuestionModalOpen] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState({
        questionText: '',
        options: [],
        correctOption: '',
        id: ''
    });
    useEffect(() => {
        fetchExamDetails();
    }, [examId]);

    const fetchExamDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/exam/get-exam/${examId}`, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setExam(data);
            } else {
                console.error('Failed to fetch exam details');
            }
        } catch (error) {
            console.error('Error during exam details fetching:', error);
        }
    };
    const handleEditQuestion = (question) => {
        setEditedQuestion({
            questionText: question.questionText,
            options: question.options,
            correctOption: question.correctOption,
            id: question._id
        })
        setEditQuestionModalOpen(true);
    };
    const handleSaveEditedQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:8000/exam/update-question/${examId}/${editedQuestion.id}`, {
                method: 'PUT',
                body: JSON.stringify(editedQuestion),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                // Refresh the exam details after saving the edited question
                fetchExamDetails();
                handleCloseEditQuestionModal();
            } else {
                console.error('Failed to save edited question');
            }
        } catch (error) {
            console.error('Error during question update:', error);
        }
    };
    const handleQuestionTextChange = (value) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            questionText: value,
        }));
    };
    const handleOptionsChange = (index, value) => {
        setEditedQuestion((prevQuestion) => {
            const updatedOptions = [...prevQuestion.options];
            updatedOptions[index] = value;
            return {
                ...prevQuestion,
                options: updatedOptions,
            };
        });
    };
    const handleCorrectOptionChange = (value) => {
        setEditedQuestion((prevQuestion) => ({
            ...prevQuestion,
            correctOption: value,
        }));
    };
    const handleCloseEditQuestionModal = () => {
        setEditQuestionModalOpen(false);
        setEditedQuestion({
            questionText: '',
            options: [],
            correctOption: '',
        });
    };
    const handleDeleteQuestion = async (questionId) => {
        try {
            const response = await fetch(`http://localhost:8000/exam/delete-question/${examId}/${questionId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                // Refresh the exam details after deleting the question
                fetchExamDetails();
            } else {
                console.error('Failed to delete question');
            }
        } catch (error) {
            console.error('Error during question deletion:', error);
        }
    };
    if (!exam) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Exam Details
            </Typography>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    {exam.title}
                </Typography>
                <Typography>
                    Number of Questions: {exam.numQuestions}
                </Typography>
                <Typography>
                    Time Limit: {exam.timeLimit} minutes
                </Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Questions:
                </Typography>
                <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Question Text</TableCell>
                                <TableCell>Options</TableCell>
                                <TableCell>Correct Option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {exam.questions.map((question) => (
                                <TableRow key={question._id}>
                                    <TableCell>{question.questionText}</TableCell>
                                    <TableCell>{question.options.join(', ')}</TableCell>
                                    <TableCell>{question.correctOption}</TableCell>
                                    <TableCell>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                style={{ marginTop: '20px', marginLeft: '10px' }}
                                                onClick={() => handleDeleteQuestion(question._id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                style={{ marginTop: '20px', marginLeft: '10px' }}
                                                onClick={() => handleEditQuestion(question)}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Link to="/dashboard">Previous Page</Link>
            </Paper>
            {/* Edit Question Modal */}
            <Dialog open={editQuestionModalOpen} onClose={handleCloseEditQuestionModal}>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Question Text"
                        margin='normal'
                        variant="outlined"
                        fullWidth
                        value={editedQuestion.questionText}
                        onChange={(e) => handleQuestionTextChange(e.target.value)}
                    />
                    {editedQuestion.options.map((option, index) => (
                        <TextField
                            key={index}
                            margin='normal'
                            label={`Option ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            value={option}
                            onChange={(e) => handleOptionsChange(index, e.target.value)}
                        />
                    ))}
                    <TextField
                        margin='normal'
                        label="Correct Option"
                        variant="outlined"
                        fullWidth
                        value={editedQuestion.correctOption}
                        onChange={(e) => handleCorrectOptionChange(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditQuestionModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEditedQuestion} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default ExamDetails;
