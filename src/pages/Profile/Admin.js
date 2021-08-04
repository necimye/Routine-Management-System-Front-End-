import React, { Component, useState, useEffect } from "react";
import { Link } from "@reach/router";
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
      <AddClassForm />
    </>
  );
}

function RoutineTable(props) {
  const classes = useStyles();

  const { isUpdating, setIsUpdating } = props;
  const [addClassFormVisible, setAddClassFormVisible] = useState(false);
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

  function handleAddClassForm() {
    console.log("handleAddClass");
    setAddClassFormVisible(true);

    Modal.confirm({
      onCancel: () => console.log("modal"),
      content: <AddClassForm />,
      cancelButtonProps: { style: { display: "none" } },
      okButtonProps: { style: { display: "none" } },
      icon: "",
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
                                  {/* <Link to="addClass"> */}
                                  <Button
                                    type="dashed"
                                    onClick={handleAddClassForm}
                                    ghost
                                  >
                                    +
                                  </Button>
                                  {/* </Link> */}
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
    // console.log(this.state.programData)
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
    console.log("Received values of form: ", values.routineFor);
    axios
      .post(apiClassUrl, {
        routineFor: values.routineFor,
        subjectName: values.subjectName,
        teacherName: values.teacherName,
        classCode: values.classCode,
        classGroup: values.classGroup,
        startingPeriod: values.startingPeriod,
        noOfPeriod: values.noOfPeriod,
        courseCode: values.courseCode,
        link1: values.link1,
        weekDay: values.weekDay,
      })
      .then(message.success("Class Added Sucessfully"));
  };

  render() {
    const {
      // programData,
      teacherData,
      // routineFor,
      // subjectName,
      // teacherName,
      classCode,
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
            name="courseCode"
            label="Course Code"
            rules={[
              {
                required: false,
                message: "Please enter Course Code",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="subjectName"
            label="Subject Name"
            rules={[
              {
                required: true,
                message: "Please enter Subject Name",
              },
            ]}
          >
            <Input />
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
            label="Select Teachers"
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
