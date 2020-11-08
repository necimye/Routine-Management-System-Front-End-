import React, { Component } from 'react'
import { Router, Link } from '@reach/router';
// import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Table, Tag, Space, Card, Input, TimePicker, Menu, Dropdown, Typography, Button, Radio, message } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, VideoCameraOutlined, NumberOutlined, PushpinOutlined } from '@ant-design/icons';
import { } from 'antd';
import AddClassForm from '../../components/AddClassForm/AddClassForm';
const { Title } = Typography;


// function AddClass() {
//     return (
//         <>
//             <AddClassForm />
//         </>
//     );
// };

// export default AddClass;

export class Class extends Component {
    constructor(props){
        super(props)
        this.state = {
            classData: {}
        }
    }

    componentDidMount() {
        this.getClassData();
    }
    getClassData = async() => {
        let res = await axios.get('http://localhost:5000/api/class');
        let data = res.data;
        console.log(data);
        this.setState({ classData: data});
    }
    render() {
        const { classData } = this.state;
        const columns = [
            {
                title: 'Routine For',
                dataIndex: 'routineFor',
                key: 'routineFor',
            },
            {
                title: 'Subject Name',
                dataIndex: 'subjectName',
                key: 'subjectName',
            },
            {
                title: 'Class Code',
                dataIndex: 'classCode',
                key: 'classCode',
            },
            {
                title: 'Class Group',
                dataIndex: 'classGroup',
                key: 'classGroup',
            },
            {
                title: 'Starting Period',
                dataIndex: 'startingPeriod',
                key: 'startingPeriod',
            },
            {
                title: 'No Of Period',
                dataIndex: 'noOfPeriod',
                key: 'noOfPeriod',
            },
            {
                title: 'Course Code',
                dataIndex: 'courseCode',
                key: 'courseCode',
            },
            {
                title: 'Week Day',
                dataIndex: 'weekDay',
                key: 'weekDay',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a><EditOutlined style={{ fontSize: '22px', color: 'blue' }} /></a>
                        <a><DeleteOutlined style={{ fontSize: '22px', color: 'red' }} /></a>
                    </Space>
                ),
            },
        ];

        return(
            <div>
                <Link to='/addClass'><Button type="primary">Add Class</Button></Link>
                <Title className="input" level={3}>All Classes</Title>
                <Table columns={columns} dataSource={classData.data} />
            </div>
        )
    }
}

export default Class;