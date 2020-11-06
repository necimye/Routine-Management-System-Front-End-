import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
// import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import axios from 'axios';
import { navigate } from '@reach/router';
import { Table, Tag, Space, Card, Input, TimePicker, Menu, Dropdown, Typography, Button, Radio, message } from 'antd';
import { DeleteOutlined, EditOutlined, UserOutlined, VideoCameraOutlined, NumberOutlined, PushpinOutlined } from '@ant-design/icons';
const { Title } = Typography;

export class Program extends Component {
    constructor(props) {
        super(props)

        this.state = {
            programData: {}
        }
    }

    componentDidMount() {

        this.getProgramData();
    }
    getProgramData = async () => {
        let res = await axios.get('http://localhost:5000/api/program');
        let data = res.data;
        console.log(data);
        this.setState({ programData: data })
    }

    render() {
        const { programData } = this.state
        const columns = [
            {
                title: 'Program Name',
                dataIndex: 'programName',
                key: 'programName'
            },
            {
                title: 'Year',
                dataIndex: 'year',
                key: 'year',
            },
            {
                title: 'Part',
                dataIndex: 'part',
                key: 'part',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Link to={`/editProgram/${record._id}`} ><EditOutlined style={{ fontSize: '22px', color: 'blue' }} /></Link>
                        <a onClick={() => {
                            axios
                                .delete(`http://localhost:5000/api/program/delete/${record._id}`)
                                .then(message.success("Programme Deleted Sucessfully"))
                                .then(this.getProgramData)
                        }}><DeleteOutlined style={{ fontSize: '22px', color: 'red' }} /></a>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                <Link to='/addProgram'><Button type="primary">Add Program</Button></Link>
                <Title className="input" level={3}>All Programme </Title>
                <Table columns={columns} dataSource={programData.data} />
            </div>
        )
    }
}

export default (Program)
