import React, { Component } from "react";
// import { navigate } from "@reach/router";
import {
  Form,
  Select,
  Card,
  InputNumber,
  Input,
  Typography,
  Button,
  // message,
  // TimePicker,
  // Menu,
  // Dropdown,
  // Radio,
} from "antd";
import // UserOutlined,
// VideoCameraOutlined,
// NumberOutlined,
// PushpinOutlined,
"@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.css";

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
    offset: 8,
    span: 16,
  },
};
const { Title } = Typography;

class EditClassPopupForm extends Component {
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
    this.getClassData();
  }

  getClassData = async () => {
    let { data: res } = await axios.get(
      `http://localhost:5000/user/admin/api/class/${this.props.id}`
    );
    let data = res.data;

    this.setState({
      teacherData: data.teacherData,
      programData: data.programData,
      routineFor: data.routineFor,
      subjectName: data.subjectName,
      teacherName: data.teacherName,
      classCode: data.classCode,
      classGroup: data.classGroup,
      startingPeriod: data.startingPeriod,
      noOfPeriod: data.noOfPeriod,
      courseCode: data.courseCode,
      link1: data.link1,
      weekDay: data.weekDay,
    });
  };

  render() {
    console.log(this.props.id);
    // const paramsid = this.props.id;
    const {
      programData,
      teacherData,
      routineFor,
      subjectName,
      teacherName,
      classCode,
      classGroup,
      startingPeriod,
      noOfPeriod,
      courseCode,
      link1,
      weekDay,
    } = this.state;
    console.log(
      programData,
      teacherData,
      routineFor,
      subjectName,
      teacherName,
      classCode,
      classGroup,
      startingPeriod,
      noOfPeriod,
      courseCode,
      link1,
      weekDay
    );
    return (
      <Form
        {...layout}
        ref={this.formRef}
        name="control-ref"
        onFinish={this.onFinish}
      >
        {/* <Form.Item
                        name="routineFor"
                        label="Routine For"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a programme',

                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={(value) => this.setState({ routineFor: value })}
                            allowClear
                        >
                            {Object.values(programData).map((item, index) => {
                                return (<Option value={item._id}>{item.programName}_{item.year}year_{item.part}part</Option>)
                            })}

                        </Select>
                    </Form.Item> */}

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
          <Input value={subjectName} />
        </Form.Item>

        {/* <Form.Item
                        name="teacherName"
                        label="Select Teachers"
                        rules={[
                            {
                                required: true,
                                message: 'Please select teachers name',
                                type: 'array',
                            },
                        ]}
                    >
                        <Select mode="multiple" placeholder="Select a option and change input text above" onChange={(value) => this.setState({ teacherName: value })}>
                            {Object.values(teacherData).map((item, index) => {
                                return (<Option value={item._id}>{item.teacherName}</Option>)
                            })}

                        </Select>
                    </Form.Item> */}

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
          <Input />
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
          <Input />
        </Form.Item>

        <Form.Item label="Starting Period">
          <Form.Item
            name="startingPeriod"
            rules={[
              {
                required: true,
                message: "Please enter Starting Period",
              },
            ]}
            noStyle
          >
            <InputNumber value={startingPeriod} min={1} max={8} />
          </Form.Item>
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
            <InputNumber min={1} max={8} />
          </Form.Item>
        </Form.Item>

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
          name="link1"
          label="Class Link"
          rules={[
            {
              required: false,
              message: "Please enter Class Link",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="weekDay"
          label="Week Day"
          rules={[
            {
              required: true,
              message: "Please select a Week Day",
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={value => this.setState({ weekDay: value })}
            allowClear
          >
            <Option value="sunday">Sunday</Option>
            <Option value="monday">Monday</Option>
            <Option value="tuesday">Tuesday</Option>
            <Option value="wednesday">Wednesday</Option>
            <Option value="thursday">Thursday</Option>
            <Option value="friday">Friday</Option>
          </Select>
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
    );
  }
}
class EditClass extends Component {
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
    this.getClassData();
  }

  getClassData = async () => {
    let res = await axios.get(
      `http://localhost:5000/user/admin/api/class/${this.props.id}`
    );
    let data = res.data.data;
    //cosole.log(data);
    this.setState({
      teacherData: data.teacherData,
      programData: data.programData,
      routineFor: data.routineFor,
      subjectName: data.subjectName,
      teacherName: data.teacherName,
      classCode: data.classCode,
      classGroup: data.classGroup,
      startingPeriod: data.startingPeriod,
      noOfPeriod: data.noOfPeriod,
      courseCode: data.courseCode,
      link1: data.link1,
      weekDay: data.weekDay,
    });
  };

  render() {
    console.log(this.props.id);
    // const paramsid = this.props.id;
    const {
      programData,
      teacherData,
      routineFor,
      subjectName,
      teacherName,
      classCode,
      classGroup,
      startingPeriod,
      noOfPeriod,
      courseCode,
      link1,
      weekDay,
    } = this.state;
    console.log(
      programData,
      teacherData,
      routineFor,
      subjectName,
      teacherName,
      classCode,
      classGroup,
      startingPeriod,
      noOfPeriod,
      courseCode,
      link1,
      weekDay
    );
    return (
      <Card
        className="card"
        style={{ backgroundColor: "#F3F1FF", margin: "12px" }}
      >
        <Title className="input" level={3}>
          Add/Edit Class
        </Title>
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onFinish={this.onFinish}
        >
          {/* <Form.Item
                        name="routineFor"
                        label="Routine For"
                        rules={[
                            {
                                required: true,
                                message: 'Please select a programme',

                            },
                        ]}
                    >
                        <Select
                            placeholder="Select a option and change input text above"
                            onChange={(value) => this.setState({ routineFor: value })}
                            allowClear
                        >
                            {Object.values(programData).map((item, index) => {
                                return (<Option value={item._id}>{item.programName}_{item.year}year_{item.part}part</Option>)
                            })}

                        </Select>
                    </Form.Item> */}

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
            <Input value={subjectName} />
          </Form.Item>

          {/* <Form.Item
                        name="teacherName"
                        label="Select Teachers"
                        rules={[
                            {
                                required: true,
                                message: 'Please select teachers name',
                                type: 'array',
                            },
                        ]}
                    >
                        <Select mode="multiple" placeholder="Select a option and change input text above" onChange={(value) => this.setState({ teacherName: value })}>
                            {Object.values(teacherData).map((item, index) => {
                                return (<Option value={item._id}>{item.teacherName}</Option>)
                            })}

                        </Select>
                    </Form.Item> */}

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
            <Input />
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
            <Input />
          </Form.Item>

          <Form.Item label="Starting Period">
            <Form.Item
              name="startingPeriod"
              rules={[
                {
                  required: true,
                  message: "Please enter Starting Period",
                },
              ]}
              noStyle
            >
              <InputNumber value={startingPeriod} min={1} max={8} />
            </Form.Item>
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
              <InputNumber min={1} max={8} />
            </Form.Item>
          </Form.Item>

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
            name="link1"
            label="Class Link"
            rules={[
              {
                required: false,
                message: "Please enter Class Link",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="weekDay"
            label="Week Day"
            rules={[
              {
                required: true,
                message: "Please select a Week Day",
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              onChange={value => this.setState({ weekDay: value })}
              allowClear
            >
              <Option value="sunday">Sunday</Option>
              <Option value="monday">Monday</Option>
              <Option value="tuesday">Tuesday</Option>
              <Option value="wednesday">Wednesday</Option>
              <Option value="thursday">Thursday</Option>
              <Option value="friday">Friday</Option>
            </Select>
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
      </Card>
    );
  }
}

export { EditClass, EditClassPopupForm };
