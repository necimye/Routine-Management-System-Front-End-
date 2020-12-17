import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Routine.css";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

// function MultipleTable()
// {

// }

export default function SpanningTable() {
  const classes = useStyles();

  const [routine, setRoutine] = useState();
  const datae = {};

  useEffect(async () => {
    let res = await axios.get("http://localhost:5000/api/class");
    let data = res.data;
    
    if (data) {
      data.data.map((item, index) => {
        if (!datae[item.routineFor.programName]) {
          datae[item.routineFor.programName] = {};
        }
        if (!datae[item.routineFor.programName][item.weekDay]) {
          datae[item.routineFor.programName][item.weekDay] = {};
        }
        if (
          !datae[item.routineFor.programName][item.weekDay][item.startingPeriod]
        ) {
          datae[item.routineFor.programName][item.weekDay][
            item.startingPeriod
          ] = {};
        }
        datae[item.routineFor.programName][item.weekDay][
          item.startingPeriod
        ] = {};
        datae[item.routineFor.programName][item.weekDay][
          item.startingPeriod
        ] = item;
      });
    }
    
    setRoutine(datae);
  }, []);

  

  // if(routine){
  // Object.keys(routine).map((name,index)=>
  // {

  //const dummy = { bct074ab: dum, bct073ab: dum };

  const dum = {
    sunday: [1, 2, 3, 4, 5, 6, 7, 8],
    monday: [1, 2, 3, 4, 5, 6, 7, 8],
    tuesday: [1, 2, 3, 4, 5, 6, 7, 8],
    wednesday: [1, 2, 3, 4, 5, 6, 7, 8],
    thursday: [1, 2, 3, 4, 5, 6, 7, 8],
    friday: [1, 2, 3, 4, 5, 6, 7, 8],
  };

  let dummy={};

  if(routine){
  Object.keys(routine).map((name)=>
  {
    
    if(!dummy[name]){
      dummy[name]={};
    }
    dummy[name]=dum;
  }
  )
  }
  
  
  if (routine) {
    Object.keys(routine).map((name)=>{//074bctab
      Object.keys(routine[name]).map((val, index) => {//day
        Object.keys(routine[name][val]).map((start, index) => {//starting preiod
          for (
            var i = parseInt(start) + 1;
            i < parseInt(start) + parseInt(routine[name][val][start].noOfPeriod);
            i++
          ) {
            dummy[name][val].splice(dummy[name][val].indexOf(i), 1);
          }
        });
      });
    })
  }
  
  //const cur = 1;

  //to loop through multiple teachers name
  function loopTeacher(teacherName) {
    let teacherArr = [];
    for (let i = 0; i < teacherName.length; i++) {
      if (i == teacherName.length - 1) {
        teacherArr.push(<>{teacherName[i].shortName}</>);
      } else {
        teacherArr.push(<>{teacherName[i].shortName} + </>);
      }
    }
    return teacherArr;
  }

  return (
    <div>
      {routine
        ? Object.keys(routine).map((data) => {
            return (
              <div>
                <h1>{data}</h1>
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
                      <TableRow className="relative">
                        <TableCell className="border">SUNDAY</TableCell>
                        {routine && dummy
                          ? dummy[data].sunday.map((temp, index) => {
                            console.log(routine);
                            console.log(data);
                            console.log(temp);
                            console.log(routine[data]);
                              return routine[data].sunday && routine[data].sunday[temp] ? (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={routine[data].sunday[temp].noOfPeriod}
                                >
                                  {routine[data].sunday[temp].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routine[data].sunday[temp].teacherName
                                  )}
                                  )<br></br>[{routine[data].sunday[temp].classCode}]
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                ></TableCell>
                              );
                            })
                          : ""}
                      </TableRow>

                       <TableRow className="relative">
                        <TableCell className="border">MONDAY</TableCell>
                        {routine && dummy
                          ? dummy[data].monday.map((temp, index) => {
                              return routine[data].monday && routine[data].monday[temp] ? (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={routine[data].monday[temp].noOfPeriod}
                                >
                                  {routine[data].monday[temp].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routine[data].monday[temp].teacherName
                                  )}
                                  )<br></br>[{routine[data].monday[temp].classCode}]
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                ></TableCell>
                              );
                            })
                          : ""}
                      </TableRow>

                      <TableRow className="relative">
                        <TableCell className="border">TUESDAY</TableCell>
                        {routine && dummy
                          ? dummy[data].tuesday.map((temp, index) => {
                              return routine[data].tuesday && routine[data].tuesday[temp] ? (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={routine[data].tuesday[temp].noOfPeriod}
                                >
                                  {routine[data].tuesday[temp].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routine[data].tuesday[temp].teacherName
                                  )}
                                  )<br></br>[{routine[data].tuesday[temp].classCode}]
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                ></TableCell>
                              );
                            })
                          : ""}
                      </TableRow>

                      <TableRow className="relative">
                        <TableCell className="border">WEDNESDAY</TableCell>
                        {routine && dummy
                          ? dummy[data].wednesday.map((temp, index) => {
                              return routine[data].wednesday && routine[data].wednesday[temp] ? (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={routine[data].wednesday[temp].noOfPeriod}
                                >
                                  {routine[data].wednesday[temp].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routine[data].wednesday[temp].teacherName
                                  )}
                                  )<br></br>[{routine[data].wednesday[temp].classCode}
                                  ]
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                ></TableCell>
                              );
                            })
                          : ""}
                      </TableRow>

                      <TableRow className="relative">
                        <TableCell className="border">THURSDAY</TableCell>
                        {routine && dummy
                          ? dummy[data].thursday.map((temp, index) => {
                              return routine[data].thursday && routine[data].thursday[temp] ? (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={routine[data].thursday[temp].noOfPeriod}
                                >
                                  {routine[data].thursday[temp].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routine[data].thursday[temp].teacherName
                                  )}
                                  )<br></br>[{routine[data].thursday[temp].classCode}]
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                ></TableCell>
                              );
                            })
                          : ""}
                      </TableRow>

                      <TableRow className="relative">
                        <TableCell className="border">FRIDAY</TableCell>
                        {routine && dummy
                          ? dummy[data].friday.map((temp, index) => {
                              return routine[data].friday && routine[data].friday[temp] ? (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={routine[data].friday[temp].noOfPeriod}
                                >
                                  {routine[data].friday[temp].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routine[data].friday[temp].teacherName
                                  )}
                                  )<br></br>[{routine[data].friday[temp].classCode}]
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                ></TableCell>
                              );
                            })
                          : ""}
                      </TableRow> 
                    </TableBody>
                  
                   
                  </Table>
                </TableContainer>
              
              
              </div>
            );
          })
        : ""}
    </div>
  );
}
