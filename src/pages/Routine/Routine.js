import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Divider, Switch } from 'antd';
import { Link } from '@reach/router';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import CardView from '../../components/CardView/CardView';
import ListEdit from '../../components/ListEdit';
import { Table, Tag, Space } from 'antd';
import ReactDOM from 'react-dom';

function Routine() {

    const [lectures, setLectures] = useState([]);
    const [labs, setLabs] = useState([]);
    const [filter, setFilter] = useState(true);

    async function foo() {
        const data1 = await ListEdit.getLectures("lectures", filter);
        setLectures(data1);
        console.log(data1)
        const data2 = await ListEdit.getLectures("labs", filter);
        setLabs(data2);
    }

    const columns = [
        {
          title: 'Period',
          dataIndex: 'period',
          key: 'period',
        },
        {
          title: '1',
          dataIndex: '1',
          key: '1',
        },
        {
          title: '2',
          dataIndex: '2',
          key: '2',
        },
        {
            title: '3',
            dataIndex: '3',
            key: '3',
          },
          {
            title: '4',
            dataIndex: '4',
            key: '4',
          },
          {
            title: '5',
            dataIndex: '5',
            key: '5',
          },
          {
            title: '6',
            dataIndex: '6',
            key: '6',
          },
          {
            title: '7',
            dataIndex: '7',
            key: '7',
          },
          {
            title: '8',
            dataIndex: '8',
            key: '8',
          }
      ];
      
      const data = [
        {
          key: '1',
          period : 'SUNDAY',
          1 : 'hfdho',
          2: 'naof',
          3: 'faosd',
          4: 'BREAK',
          5: 'foaijf',
          6: 'jdsadf',
          7: 'faof',
          8: 'aiodf',
        },
      ];
      
      //ReactDOM.render(<Table columns={columns} dataSource={data} />);


    useEffect(() => {
        ListEdit.clearTemp();
        foo();
    }, [filter]);

    return (
        <>
            
            <Table columns={columns} dataSource={data} />
        </>
    );

};

export default Routine;