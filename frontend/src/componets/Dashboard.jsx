import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';

const ExamList = () => {
    
  const [exams, setExams] = useState([]);
  const [addQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [newQuestion,setNewQuestion] = useState({
        questionText: '',
        options: [],
        correctOption: '',
  })
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:8000/exam/get-myexam', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        const data = await response.json();
        setExams(data);
        console.log(data)
      } else {
        console.error('Failed to fetch exams');
      }
    } catch (error) {
      console.error('Error during exams fetching:', error);
    }
  };
  const handleAddQuestion = (examId) => {
    setNewQuestion({
      questionText: '',
      options: ['','',''],
      correctOption: '',
      examId:examId,
    });
    setAddQuestionModalOpen(true);
  };
  const handleCloseAddQuestionModal = () => {
    setAddQuestionModalOpen(false);
  };

  const handleQuestionTextChange = (value) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      questionText: value,
    }));
  };

  const handleOptionsChange = (index, value) => {
    setNewQuestion((prevQuestion) => {
      const updatedOptions = [...prevQuestion.options];
      updatedOptions[index] = value;
      return {
        ...prevQuestion,
        options: updatedOptions,
      };
    });
  };

  const handleCorrectOptionChange = (value) => {
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      correctOption: value,
    }));
  };


  const handleDeleteExam = async (examId) => {
    try {
      const response = await fetch(`http://localhost:8000/exam/delete-exam/${examId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        fetchExams(); 
      } else {
        console.error('Failed to delete exam');
      }
    } catch (error) {
      console.error('Error during exam deletion:', error);
    }
  };
  
  const handleCloseEditQuestionModal = ()=>{
    setAddQuestionModalOpen(false)
    setNewQuestion({
        questionText: '',
        options: [],
        correctOption: '',
        examId:''
    })
  }
  const handleSaveAddQuestion=async ()=>{

    try{
        const response = fetch(`http://localhost:8000/exam/add-question/${newQuestion.examId}`,{
            method:'POST',
            body:JSON.stringify(newQuestion),
            headers: {
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        })
        if(response.ok){
            handleCloseAddQuestionModal();
            fetchExams();
        }
        else{
            console.log('failed to added')
        }
    }catch(err){
        console.log(err)
    }

  }


  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Exam List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Number of Questions</TableCell>
              <TableCell>Time Limit</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Action</TableCell> 
              <TableCell>Action</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam) => (
              <TableRow key={exam._id}>
                <TableCell>{exam.title}</TableCell>
                <TableCell>{exam.numQuestions}</TableCell>
                <TableCell>{exam.timeLimit}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/exam-details/${exam._id}`} variant="outlined" color="primary">
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteExam(exam._id)}>
                    Delete
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={()=>{handleAddQuestion(exam._id)}}>
                    Add Question
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={addQuestionModalOpen} onClose={handleCloseAddQuestionModal}>
                <DialogTitle>Edit Question</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Question Text"
                        margin='normal'
                        variant="outlined"
                        fullWidth
                        value={newQuestion.questionText}
                        onChange={(e) => handleQuestionTextChange(e.target.value)}
                    />
                    {newQuestion.options.map((option, index) => (
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
                        value={newQuestion.correctOption}
                        onChange={(e) => handleCorrectOptionChange(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditQuestionModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveAddQuestion} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
    </div>
  );
};

export default ExamList;
