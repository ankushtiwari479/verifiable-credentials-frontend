import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from '../axios'
import { useParams } from 'react-router-dom';
import generatePDF from 'react-to-pdf';



const VerifyDocument = ({viewOnly}) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [verified,setVerified] = useState(false)
  const [credential,setCredential] = useState({})
  const { id } = useParams();
  const pdfRef = useRef();

  useEffect(()=>{
    if(viewOnly)
    {axios.post('/viewdoc/'+id).then(res=>{
      setCredential(res?.data);
    }).catch(e=>{
      console.log(e)
    })}
  },[viewOnly])
  // Set up options for the PDF generation
  const options = {
    orientation: 'portrait', // 'landscape' for landscape mode
    unit: 'mm',
    format: 'a4',
  };

  // Use the useReactToPdf hook to generate the PDF
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/verify/'+id, {
        password:adminPassword,
      });
      const userData = response.data;
      setCredential(userData)
    //   console.log('user', JSON.stringify(userData));
      setVerified(true)
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleGeneratePDF = () => {
    generatePDF(pdfRef,{ fileName: 'certificate.pdf' , method: 'open',
    page: {
       format: 'A5',
    },
    overrides: {
       pdf: {
          compress: true
       },
       canvas: {
          useCORS: true
       }
    }, });
  };

  return (
      (!verified && !viewOnly) ?
       <>
        <Container maxWidth="sm" className={"borderContainer"}>
      <Typography variant="h6" align="center" gutterBottom color={"#434141"}>
        VERIFY DOCUMENT
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Admin Password"
        margin="normal"
        type="password"
        value={adminPassword}
        onChange={(e) => setAdminPassword(e.target.value)}
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
        Verify
      </Button>
      </Box>
      </Container>
      </>:(
        <>
        <Container ref={pdfRef} maxWidth="sm" mt="2rem" className={"pdfLayout"}>
        <div dangerouslySetInnerHTML={{__html:credential.htmlTemplate}}></div>
        </Container>
        <Box mt={"2rem"}>
            <Button variant='contained' onClick={handleGeneratePDF}>Print</Button>
        </Box>
        {verified && <Container ref={pdfRef} maxWidth="sm" sx={{marginTop:"1rem"}} >
          <Typography variant='body2' sx={{
            fontSize: "12px",
            color: "gray",
          }}>****  This document is verified by TechEdAcademy, ensuring its authenticity and credibility. Inside, you'll find a wealth of knowledge and insights curated by experts in various fields. From cutting-edge technology trends to innovative teaching methodologies, this document serves as a valuable resource for learners and educators alike. ***</Typography>
          </Container>}
        </>
        ));
};

export default VerifyDocument;
