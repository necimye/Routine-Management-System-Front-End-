import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Select, Input, Button, Radio, message } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Profile.css";
import "../Routine/Routine.css";
// import adminProfilePic from "./BibhaSthapit.jpeg";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const apiClassUrl = "http://localhost:5000/api/class";

export default function Admin() {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <>
      <RoutineTable isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
    </>
  );
}

function RoutineTable(props) {
  const classes = useStyles();

  const { isUpdating, setIsUpdating } = props;
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

  function handleAddClassForm(program, day, idx) {
    Modal.confirm({
      content: <AddClassForm program={program} day={day} idx={idx} />,
      cancelButtonProps: { style: { display: "none" } },
      okButtonProps: { style: { display: "none" } },
      icon: "",
      width: 720,
    });
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
                                  <Button
                                    type="dashed"
                                    onClick={() =>
                                      handleAddClassForm(program, day, idx)
                                    }
                                    ghost
                                  >
                                    +
                                  </Button>
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

const { Option } = Select;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 16,
  },
};

const apiTeacherUrl = "http://localhost:5000/user/admin/api/teacher";
// const apiProgramUrl = "http://localhost:5000/user/admin/api/program";
const subjects = [
  "Engineering Mathematics I",
  "Computer Programming",
  "Engineering Drawing I",
  "Engineering Physics",
  "Applied Mechanics",
  "Basic Electrical Engineering",

  "Engineering Mathematics II",
  "Engineering Drawing II",
  "Basic Electronics Engineering",
  "Engineering Chemistry",
  "Thermodynamics and heat Transfer",
  "Workshop Technology",

  "Engineering Mathematics III",
  "Object Oriented Programming",
  "Theory of Computation",
  "Electric Circuit Theory",
  "Electronic Devices and Circuits",
  "Digital Logic",
  "Electromagnetics",

  "Applied Mathematics",
  "Numerical Methods",
  "Instrumentation I",
  "Electrical Machines",
  "Discrete Structure",
  "Data Structure and Algorithm",
  "Microprocessor",

  "Communication English",
  "Probability and Stats",
  "Software Engineering",
  "Data Communication",
  "Computer Organization and Architecture",
  "Instrumentation II",
  "Computer Graphics",

  "Engineering Economics",
  "Object Oriented Analysis & Design",
  "Database Management System",
  "Artificial Intelligence",
  "Embedded System",
  "Operating System",
  "Minor Project",

  "Organization and Management",
  "Energy Environment and Society",
  "Project Management",
  "Computer Network",
  "Distributed System",
  "Digital Signal Analysis and Processing",
  "Elective I",

  "Project(Part A)",
  "Professional Practice",
  "Information Systems",
  "Simulation and Modelling",
  "Internet and Intranet",
  "Elective II",
  "Elective III",
  "Project(Part B)",
];
const courseCode = [
  "SH401",
  "CT401",
  "ME401",
  "SH402",
  "CE401",
  "EE401",

  "SH451",
  "ME451",
  "EX451",
  "SH453",
  "ME452",
  "ME453",

  "SH501",
  "CT501",
  "CT502",
  "EE501",
  "EX501",
  "EX502",
  "EX503",

  "SH551",
  "SH553",
  "EE552",
  "EE554",
  "CT551",
  "CT552",
  "EX551",

  "SH601",
  "SH602",
  "CT601",
  "CT602",
  "CT603",
  "EX602",
  "EX603",

  "CE655",
  "CT651",
  "CT652",
  "CT653",
  "CT655",
  "CT656",
  "CT654",

  "ME708",
  "EX701",
  "CT701",
  "CT702",
  "CT703",
  "CT704",
  "CT725",
  "CT707",

  "CE752",
  "CT751",
  "CT753",
  "CT754",
  "CT765",
  "CT785",
  "CT755",
];
class AddClassForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherData: "",
      programData: "",
      routineFor: "",
      subjectName: "",
      teacherName: [""],
      classCode: "",
      classGroup: "",
      startingPeriod: "1",
      noOfPeriod: "",
      courseCode: "",
      link1: "",
      weekDay: "",
    };
  }

  componentDidMount() {
    // this.getProgramData();
    this.getTeacherData();
    // console.log(this.state.programData);
    // console.log(this.state.teacherData)
  }

  getTeacherData = async () => {
    let { data: res } = await axios.get(apiTeacherUrl);
    this.setState({ teacherData: res.data });
  };
  // getProgramData = async () => {
  //   let { data: res } = await axios.get(apiProgramUrl);
  //   this.setState({ programData: res.data });
  // };

  onFinish = values => {
    console.log(this.props);
    const { program, day, idx } = this.props;
    let programID;
    switch (program) {
      case "074BEXAB":
        programID = "5fa6b5dad734150d70d5afb6";
        break;
    }
    axios
      .post(apiClassUrl, {
        routineFor: programID,
        subjectName: values.subjectName,
        teacherName: values.teacherName,
        classCode: values.classCode,
        classGroup: values.classGroup,
        startingPeriod: idx,
        noOfPeriod: values.noOfPeriod,
        courseCode: values.courseCode,
        link1: values.link1,
        weekDay: day,
      })
      .then(message.success("Class Added Sucessfully"));
    window.location.reload();
  };

  render() {
    const {
      // programData,
      teacherData,
      // routineFor,
      // subjectName,
      // teacherName,
      // classCode,
      // classGroup,
      // startingPeriod,
      // noOfPeriod,
      // courseCode,
      // link1,
      // weekDay,
    } = this.state;

    return (
      <>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="subjectName"
            label="Subject"
            rules={[
              {
                required: true,
                message: "Please enter Subject Name",
              },
            ]}
          >
            <Select
              onChange={value => this.setState({ subjectName: value })}
              rules={[
                {
                  required: true,
                  message: "Please enter Subject Name",
                },
              ]}
            >
              {subjects.map((item, index) => {
                return (
                  <Option value={item}>
                    {item + ` (${courseCode[index]})`}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="classCode"
            label="Class Code"
            rules={[
              {
                required: false,
                message: "Please enter Class Code",
              },
            ]}
          >
            <Radio.Group value={"L"}>
              <Radio.Button value="L">Lecture [L]</Radio.Button>
              <Radio.Button value="P">Practical [P]</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="teacherName"
            label="Teachers"
            rules={[
              {
                required: true,
                message: "Please select teachers name",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              // placeholder="Select a option and change input text above"
              onChange={value => this.setState({ teacherName: value })}
            >
              {Object.values(teacherData).map((item, index) => {
                return <Option value={item._id}>{item.teacherName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="classGroup"
            label="Class Group"
            rules={[
              {
                required: false,
                message: "Please enter Class Group",
              },
            ]}
          >
            <Radio.Group value={"D"}>
              <Radio.Button value="C">C</Radio.Button>
              <Radio.Button value="D">D</Radio.Button>
              <Radio.Button value="Both">Both</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="No Of Periods">
            <Form.Item
              name="noOfPeriod"
              rules={[
                {
                  required: true,
                  message: "Please enter No Of Periods",
                },
              ]}
              noStyle
            >
              <Radio.Group value={"1"}>
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Form.Item>

          <Form.Item
            name="link1"
            label="Class Link"
            rules={[
              {
                required: false,
                message: "Please enter Class Link",
              },
            ]}
          >
            <Input placeholder="eg. meet.google.com/...      teams.microsoft.com/..." />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              style={{ backgroundColor: "#141414" }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
