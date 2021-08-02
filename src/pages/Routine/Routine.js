import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import "./Routine.css";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const apiClassUrl = "http://localhost:5000/api/class";

export default function SpanningTable() {
  const classes = useStyles();

  const [routineData, setRoutineData] = useState();
  const datae = {};

  useEffect(async () => {
    let { data: res } = await axios.get(apiClassUrl);

    if (res) {
      res.data.map(item => {
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
        datae[item.routineFor.programName][item.weekDay][item.startingPeriod] =
          item;
      });
    }

    setRoutineData(datae);
  }, []);

  let routineTable = {};

  if (routineData) {
    // Add additional data for routine
    for (let program in routineData) {
      routineTable[program] = {
        sunday: [1, 2, 3, 4, 5, 6, 7, 8],
        monday: [1, 2, 3, 4, 5, 6, 7, 8],
        tuesday: [1, 2, 3, 4, 5, 6, 7, 8],
        wednesday: [1, 2, 3, 4, 5, 6, 7, 8],
        thursday: [1, 2, 3, 4, 5, 6, 7, 8],
        friday: [1, 2, 3, 4, 5, 6, 7, 8],
      };

      for (let weekDay in routineData[program]) {
        for (let startPeriod in routineData[program][weekDay]) {
          for (
            let period = parseInt(startPeriod) + 1;
            period <
            parseInt(startPeriod) +
              parseInt(routineData[program][weekDay][startPeriod].noOfPeriod);
            period++
          ) {
            delete routineTable[program][weekDay][
              routineTable[program][weekDay].indexOf(period)
            ];
          }
        }
      }
    }
  }

  //to loop through multiple teachers name
  function loopTeacher(teacherName) {
    let teacherArr = [];
    for (let i = 0; i < teacherName.length; i++) {
      if (i === teacherName.length - 1) {
        teacherArr.push(<>{teacherName[i].shortName}</>);
      } else {
        teacherArr.push(<>{teacherName[i].shortName} + </>);
      }
    }
    return teacherArr;
  }

  return (
    <div>
      {routineData
        ? Object.keys(routineData).map(program => {
            return (
              <div>
                <h1
                  style={{
                    textAlign: "center",
                    fontSize: "55px",
                    fontWeight: 700,
                    marginTop: 30,
                  }}
                >
                  {program}
                </h1>
                <TableContainer
                  component={Paper}
                  style={{ paddingBottom: "80px" }}
                >
                  <Table className={classes.table} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Periods</TableCell>
                        <TableCell align="center">
                          Period 1<br></br>(10:15-11:05)
                        </TableCell>
                        <TableCell align="center">
                          Period 2<br></br>(11:05-11:55)
                        </TableCell>
                        <TableCell align="center">
                          Period 3<br></br>(11:55-12:45)
                        </TableCell>
                        <TableCell align="center">
                          Period 4<br></br>(12:45-01:35)
                        </TableCell>
                        <TableCell align="center">
                          Period 5<br></br>(01:35-02:25)
                        </TableCell>
                        <TableCell align="center">
                          Period 6<br></br>(02:25-03:15)
                        </TableCell>
                        <TableCell align="center">
                          Period 7<br></br>(03:15-04:05)
                        </TableCell>
                        <TableCell align="center">
                          Period 8<br></br>(04:05-04:55)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Object.keys(routineTable[program]).map(day => {
                        return (
                          <TableRow className="relative">
                            <TableCell className="border">
                              {day.toUpperCase()}
                            </TableCell>
                            {routineTable[program][day].map(idx => {
                              return routineData[program][day] &&
                                routineData[program][day][idx] ? (
                                // return cell with data
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={
                                    routineData[program][day][idx].noOfPeriod
                                  }
                                >
                                  {routineData[program][day][idx].subjectName}
                                  <br></br>(
                                  {loopTeacher(
                                    routineData[program][day][idx].teacherName
                                  )}
                                  )<br></br>[
                                  {routineData[program][day][idx].classCode}]
                                </TableCell>
                              ) : (
                                // return an empty cell
                                <TableCell
                                  align="center"
                                  className="border"
                                  colSpan={1}
                                >
                                  {"-"}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
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
