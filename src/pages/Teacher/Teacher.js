import React, { Component } from 'react'
import { Router, Link } from '@reach/router';
// import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Modal, Table, Tag, Space, Card, Input, TimePicker, Menu, Dropdown, Typography, Button, Radio, message } from 'antd';
import { ExclamationCircleOutlined ,DeleteOutlined, EditOutlined, UserOutlined, VideoCameraOutlined, NumberOutlined, PushpinOutlined } from '@ant-design/icons';
const { Title } = Typography;



export class Teacher extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacherData: {}
        }
    }

    intervalID;

    componentDidMount() {
        this.getTeacherData();
        this.intervalID=setInterval(this.getTeacherData.bind(this), 400);
    }

    componentWillUnmount(){
        clearInterval(this.intervalID);
    }
    

    getTeacherData = async () => {
        let res = await axios.get('http://localhost:5000/api/teacher');
        let data = res.data;
        console.log(data);
        this.setState({ teacherData: data });
    }

    deleteWarning(record){
        Modal.confirm ({
            title: 'Are you sure?',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you really want to delete these records? This process cannot be undone.',
            okText: 'Confirm',
            okType: 'danger primary',
            cancelText: 'Cancel',
            onOk(){
                axios
                    .delete(`http://localhost:5000/api/teacher/delete/${record._id}`)
                    .then(message.success("Teacher Deleted Successfully"))
                    .then(navigate('/teacher'))
            },
        });
    }

    render() {
        const { teacherData } = this.state;
        const columns = [
            {
                title: 'Teacher Name',
                dataIndex: 'teacherName',
                key: 'teacherName',
            },
            {
                title: 'Short Name',
                dataIndex: 'shortName',
                key: 'shortName',
            },
            {
                title: 'Designation',
                dataIndex: 'designation',
                key: 'designation',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Link to={`/editTeacher/${record._id}`}><EditOutlined style={{ fontSize: '22px', color: 'blue' }} /></Link>
                        <a onClick={ () => {
                                this.deleteWarning(record);
                        }}>
                        <DeleteOutlined style={{ fontSize: '22px', color: 'red' }} /></a>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Link to='/addTeacher'><Button type="primary">Add Teacher</Button></Link>
                <Title className="input" level={3}>All Teachers</Title>
                <Table columns={columns} dataSource={teacherData.data} />
            </div>
        )
    }
}

export default (Teacher)
