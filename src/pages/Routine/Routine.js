import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
        datae[item.routineFor.programName][item.weekDay][item.startingPeriod] =
          {};
        datae[item.routineFor.programName][item.weekDay][item.startingPeriod] =
          item;
      });
    }

    setRoutine(datae);
  }, []);

  // const dum = {
  //   sunday: [1, 2, 3, 4, 5, 6, 7, 8],
  //   monday: [1, 2, 3, 4, 5, 6, 7, 8],
  //   tuesday: [1, 2, 3, 4, 5, 6, 7, 8],
  //   wednesday: [1, 2, 3, 4, 5, 6, 7, 8],
  //   thursday: [1, 2, 3, 4, 5, 6, 7, 8],
  //   friday: [1, 2, 3, 4, 5, 6, 7, 8],
  // };
  // console.log(dum);
  let dummy = {};

  if (routine) {
    for (var name in routine) {
      dummy[name] = {};
      dummy[name] = {
        sunday: [1, 2, 3, 4, 5, 6, 7, 8],
        monday: [1, 2, 3, 4, 5, 6, 7, 8],
        tuesday: [1, 2, 3, 4, 5, 6, 7, 8],
        wednesday: [1, 2, 3, 4, 5, 6, 7, 8],
        thursday: [1, 2, 3, 4, 5, 6, 7, 8],
        friday: [1, 2, 3, 4, 5, 6, 7, 8],
      };
      console.log(dummy);
      for (var val in routine[name]) {
        for (var start in routine[name][val]) {
          for (
            var i = parseInt(start) + 1;
            i <
            parseInt(start) + parseInt(routine[name][val][start].noOfPeriod);
            i++
          ) {
            // console.log(dummy);
            delete dummy[name][val][dummy[name][val].indexOf(i)];
            // ind.push(dummy[name][val].indexOf(i));
          }
        }
      }
    }
  }

  // console.log(routine);

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

  const generatePDF = () => {
    // const input = document.getElementById('tobePrinted');
    // html2canvas(input)
    //   .then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF({
    //       orientation: '1',
    //       unit: 'pt',
    //       format: [canvas.width, canvas.height]
    //     });
    //     pdf.addImage(imgData, 'JPEG', 0, 0);
    //   //  pdf.output('dataurlnewwindow');
    //     pdf.save("Routine.pdf");
    //   })
    // ;

    var doc = new jsPDF("p", "pt", "a1");

    doc.html(document.querySelector("#tobePrinted"), {
      callback: function (pdf) {
        pdf.save("Routine.pdf");
      },
    });
  };

  return (
    <div>
      <div id="tobePrinted">
        {routine
          ? Object.keys(routine).map((data) => {
              return (
                <div>
                  <h1
                    style={{
                      textAlign: "center",
                      fontSize: "35px",
                      fontWeight: 700,
                    }}
                  >
                    {data}
                  </h1>
                  <TableContainer
                    component={Paper}
                    style={{ paddingBottom: "80px" }}
                  >
                    <Table
                      className={classes.table}
                      aria-label="spanning table"
                    >
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
                        <TableRow className="relative">
                          <TableCell className="border">SUNDAY</TableCell>
                          {routine && dummy
                            ? dummy[data].sunday.map((temp, index) => {
                                return routine[data].sunday &&
                                  routine[data].sunday[temp] ? (
                                  <TableCell
                                    align="center"
                                    className="border"
                                    colSpan={
                                      routine[data].sunday[temp].noOfPeriod
                                    }
                                  >
                                    {routine[data].sunday[temp].subjectName}
                                    <br></br>(
                                    {loopTeacher(
                                      routine[data].sunday[temp].teacherName
                                    )}
                                    )<br></br>[
                                    {routine[data].sunday[temp].classCode}]
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
                                return routine[data].monday &&
                                  routine[data].monday[temp] ? (
                                  <TableCell
                                    align="center"
                                    className="border"
                                    colSpan={
                                      routine[data].monday[temp].noOfPeriod
                                    }
                                  >
                                    {routine[data].monday[temp].subjectName}
                                    <br></br>(
                                    {loopTeacher(
                                      routine[data].monday[temp].teacherName
                                    )}
                                    )<br></br>[
                                    {routine[data].monday[temp].classCode}]
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
                                return routine[data].tuesday &&
                                  routine[data].tuesday[temp] ? (
                                  <TableCell
                                    align="center"
                                    className="border"
                                    colSpan={
                                      routine[data].tuesday[temp].noOfPeriod
                                    }
                                  >
                                    {routine[data].tuesday[temp].subjectName}
                                    <br></br>(
                                    {loopTeacher(
                                      routine[data].tuesday[temp].teacherName
                                    )}
                                    )<br></br>[
                                    {routine[data].tuesday[temp].classCode}]
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
                                return routine[data].wednesday &&
                                  routine[data].wednesday[temp] ? (
                                  <TableCell
                                    align="center"
                                    className="border"
                                    colSpan={
                                      routine[data].wednesday[temp].noOfPeriod
                                    }
                                  >
                                    {routine[data].wednesday[temp].subjectName}
                                    <br></br>(
                                    {loopTeacher(
                                      routine[data].wednesday[temp].teacherName
                                    )}
                                    )<br></br>[
                                    {routine[data].wednesday[temp].classCode}]
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
                                return routine[data].thursday &&
                                  routine[data].thursday[temp] ? (
                                  <TableCell
                                    align="center"
                                    className="border"
                                    colSpan={
                                      routine[data].thursday[temp].noOfPeriod
                                    }
                                  >
                                    {routine[data].thursday[temp].subjectName}
                                    <br></br>(
                                    {loopTeacher(
                                      routine[data].thursday[temp].teacherName
                                    )}
                                    )<br></br>[
                                    {routine[data].thursday[temp].classCode}]
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
                                return routine[data].friday &&
                                  routine[data].friday[temp] ? (
                                  <TableCell
                                    align="center"
                                    className="border"
                                    colSpan={
                                      routine[data].friday[temp].noOfPeriod
                                    }
                                  >
                                    {routine[data].friday[temp].subjectName}
                                    <br></br>(
                                    {loopTeacher(
                                      routine[data].friday[temp].teacherName
                                    )}
                                    )<br></br>[
                                    {routine[data].friday[temp].classCode}]
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
      <div>
        <button onClick={generatePDF} type="primary">
          Download Routine
        </button>
      </div>
    </div>
  );
}
