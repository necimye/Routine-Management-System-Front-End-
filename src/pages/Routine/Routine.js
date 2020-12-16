import React,{Component,useEffect,useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Routine.css'

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function SpanningTable() {
  const classes = useStyles();
  
  const [routine, setRoutine] = useState();
  const datae={};



  useEffect(async() => {
    let res = await axios.get('http://localhost:5000/api/class');
    let data = res.data;
    console.log(data);
    if(data){
    data.data.map((item, index) => {
            if (!datae[item.weekDay]) {
              datae[item.weekDay] = {}
            }
            if (!datae[item.weekDay][item.startingPeriod]) {
              datae[item.weekDay][item.startingPeriod] = {}
            }
            datae[item.weekDay][item.startingPeriod] = {}
            datae[item.weekDay][item.startingPeriod]=item
          })
        }
    console.log(data);
    setRoutine(datae);
  }, []);
  // console.log(routine);
  const dum={sunday:[1,2,3,4,5,6,7,8],monday:[1,2,3,4,5,6,7,8],tuesday:[1,2,3,4,5,6,7,8],wednesday:[1,2,3,4,5,6,7,8],thursday:[1,2,3,4,5,6,7,8],friday:[1,2,3,4,5,6,7,8]};

  console.log(routine);
  if(routine){
    Object.keys(routine).map((val,index)=>{

      Object.keys(routine[val]).map((start,index)=>
      {
        for(var i=parseInt(start)+1;i<parseInt(start)+parseInt(routine[val][start].noOfPeriod);i++)
        {
          dum[val].splice(dum[val].indexOf(i),1);
        }
      })
      
   })
  }
  console.log(dum);
  const cur=1;
  
  //to loop through multiple teachers name
  function loopTeacher(teacherName){
    let teacherArr = [];
    for(let i =0;i< teacherName.length; i++){
      if(i==teacherName.length-1){
        teacherArr.push(<>{teacherName[i].shortName}</>);
      }
      else {
        teacherArr.push(<>{teacherName[i].shortName} + </>);
      }
    }
    return teacherArr;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Periods</TableCell>
            <TableCell align="center">Period 1</TableCell>
            <TableCell align="center">Period 2</TableCell>
            <TableCell align="center">Period 3</TableCell>
            <TableCell align="center">Period 4</TableCell>
            <TableCell align="center">Period 5</TableCell>
            <TableCell align="center">Period 6</TableCell>
            <TableCell align="center">Period 7</TableCell>
            <TableCell align="center">Period 8</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className='relative'>
            <TableCell className='border' >SUNDAY</TableCell>
            {routine?
              dum.sunday.map((temp,index)=>{
                return(
                    routine.sunday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.sunday[temp].noOfPeriod}>{routine.sunday[temp].subjectName}<br></br>
                  {loopTeacher(routine.sunday[temp].teacherName)}<br></br>[{routine.sunday[temp].classCode}]
                </TableCell>
                    :<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >MONDAY</TableCell>
            {routine?
              dum.monday.map((temp,index)=>{
                return(
                    routine.monday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.monday[temp].noOfPeriod}>{routine.monday[temp].subjectName}<br></br>
                  {loopTeacher(routine.monday[temp].teacherName)}<br></br>[{routine.monday[temp].classCode}]
                  </TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >TUESDAY</TableCell>
            {routine?
              dum.tuesday.map((temp,index)=>{
                return(
                    routine.tuesday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.tuesday[temp].noOfPeriod}>{routine.tuesday[temp].subjectName}<br></br>
                  {loopTeacher(routine.tuesday[temp].teacherName)}<br></br>[{routine.tuesday[temp].classCode}]
                  </TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >WEDNESDAY</TableCell>
            {routine?
              dum.wednesday.map((temp,index)=>{
                return(
                    routine.wednesday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.wednesday[temp].noOfPeriod}>{routine.wednesday[temp].subjectName}<br></br>
                  {loopTeacher(routine.wednesday[temp].teacherName)}<br></br>[{routine.wednesday[temp].classCode}]
                  </TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >THURSDAY</TableCell>
            {routine?
              dum.thursday.map((temp,index)=>{
                return(
                    routine.thursday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.thursday[temp].noOfPeriod}>{routine.thursday[temp].subjectName}<br></br>
                  {loopTeacher(routine.thursday[temp].teacherName)}<br></br>[{routine.thursday[temp].classCode}]
                  </TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >FRIDAY</TableCell>
            {routine?
              dum.friday.map((temp,index)=>{
                return(
                    routine.friday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.friday[temp].noOfPeriod}>{routine.friday[temp].subjectName}<br></br>
                  {loopTeacher(routine.friday[temp].teacherName)}<br></br>[{routine.friday[temp].classCode}]
                  </TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
