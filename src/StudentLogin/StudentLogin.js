import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios, { setAuthToken } from '../axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/student/login', {
        email:studentEmail,
        password:studentPassword,
      });
  
      const userData = response.data;
      localStorage.setItem('token', userData.token);
      setAuthToken(userData.token)
      navigate('/student/home')
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container maxWidth="sm" className={"borderContainer"}>
      <Typography variant="h6" align="center" gutterBottom color={"#434141"}>
        STUDENT LOG IN 
      </Typography>
    
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
        label="Password"
        margin="normal"
        type="password"
        value={studentPassword}
        onChange={(e) => setStudentPassword(e.target.value)}
      />
        <Box mt="2rem">
       <Button
        sx={{padding:"10px"}}
        variant="contained"
        className={"globalButton"}
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Login
      </Button>
      </Box>
    </Container>
  );
};

export default StudentLogin;
