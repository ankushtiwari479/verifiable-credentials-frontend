import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import styles from './VerifiableCredentialForm.module.css'; // Import the CSS module
import { Box } from '@mui/system';
import axios from '../axios'

const VerifiableCredentialForm = async (e) => {
  const [issuerName, setIssuerName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [courseName, setCourseName] = useState('');
  const [issuanceDate, setIssuanceDate] = useState(new Date());

  const handleCreateCredential = async () => {
      e.preventDefault();
  
      try {
        const response = await axios.post('your-signup-api-url', {
          issuerName,
          studentName,
          rollNumber,
          courseName,
          issuanceDate,
        });
    
        const userData = response.data;
        localStorage.setItem('user', userData);
      } catch (error) {
        console.error('Error signing up:', error);
      }
  };

  return (
    <Container maxWidth="sm" className={"borderContainer"} >
      <Typography variant="h6" align="center" gutterBottom color={"#434141"}>
        CREATE CERTIFICATE
      </Typography>
      <TextField
        className={styles.textField}
        fullWidth
        variant="outlined"
        label="Issuer Name"
        margin="normal"
        value={issuerName}
        onChange={(e) => setIssuerName(e.target.value)}
      />
      <TextField
        className={styles.textField}
        fullWidth
        variant="outlined"
        label="Student Name"
        margin="normal"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
      />
      <TextField
        className={styles.textField}
        fullWidth
        variant="outlined"
        label="Roll No."
        margin="normal"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <TextField
        className={styles.textField}
        fullWidth
        variant="outlined"
        label="Course Name"
        margin="normal"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <TextField
        className={styles.textField}
        fullWidth
        variant="outlined"
        type="date"
        label="Issuance Date"
        margin="normal"
        value={issuanceDate}
        onChange={(e) => setIssuanceDate(e.target.value)}
      />
      <Box mt="2rem">
      <Button
        sx={{padding:"10px"}}
        variant="contained"
        className={"globalButton"}
        color="primary"
        onClick={handleCreateCredential}
        fullWidth
      >
        Create Credential
      </Button>
      </Box>
    </Container>
  );
};

export default VerifiableCredentialForm;
