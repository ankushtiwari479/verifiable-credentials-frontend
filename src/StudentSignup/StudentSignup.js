import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from '../axios'
import { useNavigate } from 'react-router-dom';

const StudentSignUp = () => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [courses,setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(''); 
  const [rollNumber, setRollNumber] = useState(''); 
  const navigate = useNavigate()
  useEffect(()=>{
        axios.get('/course/getlist').then(res=>{
            console.log(res?.data)
            setCourses(res?.data)
        });
  },[])

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/student/signup', { name: studentName, email: studentEmail, password: studentPassword, selectedCourse , rollNumber});
      const userData = response.data;
      console.log(userData)
      localStorage.setItem('token',userData?.token)
      if(userData){
        navigate('/student/login')
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container maxWidth="sm" className="borderContainer">
      <Typography variant="h6" align="center" gutterBottom color="#434141">
        STUDENT SIGN UP
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Name"
        margin="normal"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Email"
        margin="normal"
        value={studentEmail}
        onChange={(e) => setStudentEmail(e.target.value)}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="Roll Number"
        margin="normal"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      
       <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Select Course</InputLabel>
        <Select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          label="Select Course"
          sx={{ textAlign: 'left' }} 
        >
          {courses.map((course) => (
            <MenuItem key={course._id} value={course.name}>
              {course.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        margin="normal"
        type="password"
        value={studentPassword}
        onChange={(e) => setStudentPassword(e.target.value)}
      />
      <Box mt="2rem">
        <Button
          sx={{ padding: '10px' }}
          variant="contained"
          className="globalButton"
          color="primary"
          onClick={handleSubmit}
          fullWidth
        >
          Sign Up & Enroll
        </Button>
      </Box>
    </Container>
  );
};

export default StudentSignUp;
