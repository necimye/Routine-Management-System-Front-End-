import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Divider, Switch } from 'antd';
import { Link } from '@reach/router';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import CardView from '../../components/CardView/CardView';
import ListEdit from '../../components/ListEdit';
import { Table } from 'antd';
import ReactDOM from 'react-dom';
import {routine_data} from '../../dummy'

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

  //sunday arr -> 0

  const columns = [
    {
      title: 'Week Day',
      dataIndex: 'weekDay',
    },
    {
      title: 'Period 1',
      dataIndex: 'period_1',
      render : (text,row,index)=>{
          if(index===0)
          {
            return {
                children: <a>{text}</a>,
                props: {
                  colSpan: 2,
                },
              };
          }
          if(index===2)
          {
              return {
                children: <a>{text}</a>,
                props: {
                  colSpan: 2,
                },
              };
          }
          if(index===3)
            {
                return {
                    children: <a>{text}</a>,
                    props: {
                      colSpan: 0,
                    },
                  };
            }
          return <a>{text}</a>;
      }
    },
    {
      title: 'Period 2',
      dataIndex: 'period_2',
      render : (text,row,index)=>{
        if(index===0)
        {
          return {
              children: <a>{text}</a>,
              props: {
                colSpan: 0,
              },
            };
        }
    }
      //render: renderContent,
    },
    {
      title: 'Period 3',
      dataIndex: 'period_3',
      render : (text,row,index)=>{
        if(index===0)
        {
          return {
              children: <a>{text}</a>,
              props: {
                colSpan: 2,
              },
            };
        }
    }
      //render: renderContent,
    },
    {
      title: 'Period 4',
      dataIndex: 'period_4',
      //render: renderContent,
    },
    {
      title: 'Period 5',
      dataIndex: 'period_5',
      //render: renderContent,
    },
    {
      title: 'Period 6',
      dataIndex: 'period_6',
      //render: renderContent,
    },
    {
      title: 'Period 7',
      dataIndex: 'period_7',
      //render: renderContent,
    },
    {
      title: 'Period 8',
      dataIndex: 'period_8',
      //render: renderContent,
    },
    // {
    //   title: 'Period 2',
    //   colSpan: 2,
    //   dataIndex: '',
    //   render: (value, row, index) => {
    //     const obj = {
    //       children: value,
    //       props: {},
    //     };
    //     if (index === 2) {
    //       obj.props.rowSpan = 2;
    //     }
    //     // These two are merged into above cell
    //     if (index === 3) {
    //       obj.props.rowSpan = 0;
    //     }
    //     if (index === 4) {
    //       obj.props.colSpan = 0;
    //     }
    //     return obj;
    //   },
    // },
  ];

//   const data = [
//     {
//       weekDay: 'Sunday',
//       period_1: 'Operating System',
//       period_2: 'Operating System',
//       period_3: 'Database Management System',
//       period_4: 'Database Management System',
//       period_5: 'BREAK',
//       period_6: 'Minor Project',
//       period_7: 'Minor Project',
//       period_8: 'Minor Project',
//     },
//     {
//       weekDay: 'Monday',
//       period_1: 'Object Oriented Analysis And Design',
//       period_2: 'Object Oriented Analysis And Design',
//       period_3: 'Object Oriented Analysis And Design',
//       period_4: 'BREAK',
//       period_5: 'Minor Project',
//       period_6: 'Operating System',
//       period_7: 'Operating System',
//       period_8: 'Operating System',
//     },
//     {
//       weekDay: 'Tuesday',
//       period_1: 'Operating System',
//       period_2: 'Artificial Intelligence',
//       period_3: '',
//       period_4: 'BREAK',
//       period_5: 'Embedded System',
//       period_6: 'Embedded System',
//       period_7: 'Database Management System',
//       period_8: 'Embedded System',
//     },
//     {
//       weekDay: 'Wednesday',
//       period_1: 'Object Oriented Analysis And Design',
//       period_2: 'Object Oriented Analysis And Design',
//       period_3: 'Database Management System',
//       period_4: 'Artificial Intelligence',
//       period_5: 'Operating System',
//       period_6: '',
//       period_7: '',
//       period_8: '',
//     },
//     {
//       weekDay: 'Thursday',
//       period_1: 'Embedded System',
//       period_2: 'Embedded System',
//       period_3: 'Engineering Economics',
//       period_4: 'Engineering Economics',
//       period_5: 'BREAK',
//       period_6: 'Operating System',
//       period_7: 'Operating System',
//       period_8: 'Operating System',
//     },
//     {
//       weekDay: 'Friday',
//       period_1: 'Artificial Intelligence',
//       period_2: 'Artificial Intelligence',
//       period_3: 'Engineering Economics',
//       period_4: 'Engineering Economics',
//       period_5: 'BREAK',
//       period_6: 'Artificial Intelligence',
//       period_7: 'Artificial Intelligence',
//       period_8: 'Artificial Intelligence',
//     }
//   ];

  return (
    <>
      <Table columns={columns} dataSource={routine_data} bordered />
    </>
  );

}

export default Routine;