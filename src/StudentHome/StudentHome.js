import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Switch, Grid, Box } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../config';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import styles from './StudentHome.module.css'
const StudentHome = () => {
  // Sample course data (you can replace this with your actual course data)
  const [enrollment, setenrollment] = useState([]);
  const [details,setDetails] = useState(null)
  const [certficate,setCertficate] = useState(null)

  // Function to handle course completion toggle
  const handleToggleCompletion = (enrollmentId,courseId) => {
    setenrollment((prevenrollment) =>
      prevenrollment.map((enrollment) =>
        enrollment._id === enrollmentId ? { ...enrollment, completed: true } : enrollment
      )
    );
    axios.post(baseURL+'/enrollment/mark-completed',{enrollmentId,courseId}).then(res=>{
        console.log('Course completed',res)
        getDetails()
    }).catch(e=>{
        console.error('error fetching course')
    })
  };

  const getDetails = () => {
    axios.get(baseURL+'/student/details').then(res=>{
        console.log("res.data--",res.data)
        setenrollment([res.data.enrollment])
        setDetails(res.data.user)
        setCertficate(res.data.certificate)
    }).catch(e=>{
        console.error('error fetching course')
    })
  }

  const viewCertificate = () => {
    window.open(window.location.origin+'/verifydoc/'+certficate._id)
  }

  useEffect(()=>{
    getDetails()
  },[])

  return (
    <>
    <Box mt={"2rem"}>
    <Typography variant='subtitle' sx={{fontWeight:"bold"}}>YOUR COURSE</Typography>
    </Box>
    <Grid container className={styles.container} spacing={2}>
      {enrollment.map((enrollment) => (
        <Grid item xs={12} sm={5} md={3} key={enrollment.id}>
          <Card sx={{background:"#cde6ff54"}}>
            <CardContent sx={{textAlign:'left'}}>
              <Typography variant="subtitle" sx={{fontWeight:"bold"}}>Course Name: {enrollment.course.name}</Typography>
              <Typography variant="subtitle2">Complete the Course: 
              <Switch
                checked={enrollment.completed}
                onChange={enrollment.completed?()=>{}:() => handleToggleCompletion(enrollment._id,enrollment.course._id)}
                color="primary"
              /></Typography>
              <Typography variant="body2" color={"grey"}>
                * Note toggling on means course is completed and cannot be reverted back
              </Typography>
              <Box pt={"1rem"}  >
                <Button sx={{visibility:certficate?"visible":'hidden'}} variant='contained' onClick={viewCertificate}>
                    View Certificate &nbsp;&nbsp;<RemoveRedEyeIcon/>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default StudentHome;
