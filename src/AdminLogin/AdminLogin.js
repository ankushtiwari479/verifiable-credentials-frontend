import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from '../axios';

const StudentLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [studentPassword, setStudentPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/login', {
        username:adminId,
        password:studentPassword,
      });
  
      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container maxWidth="sm" className={"borderContainer"}>
      <Typography variant="h6" align="center" gutterBottom color={"#434141"}>
        ADMIN LOG IN 
      </Typography>
    
      <TextField
        fullWidth
        variant="outlined"
        label="User Id"
        margin="normal"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
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
