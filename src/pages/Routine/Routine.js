// import React, { useEffect, useState } from 'react';
// import 'antd/dist/antd.css';
// import { Row, Col, Divider, Switch } from 'antd';
// import { Link } from '@reach/router';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import CardView from '../../components/CardView/CardView';
// import ListEdit from '../../components/ListEdit';
// import { Table } from 'antd';
// import ReactDOM from 'react-dom';
// import { routine_data } from '../../dummy'

// function Routine() {
//   const datae = {};
//   const [data_f, setDataf] = useState({});
//   const [lectures, setLectures] = useState([]);
//   const [labs, setLabs] = useState([]);
//   const [filter, setFilter] = useState(true);


//   useEffect(() => {
//     routine_data.map((item, index) => {
//       if (!datae[item.weekDay]) {
//         datae[item.weekDay] = {}
//       }
//       if (!datae[item.weekDay][item.startingPeriod]) {
//         datae[item.weekDay][item.startingPeriod] = {}
//       }
//       datae[item.weekDay][item.startingPeriod] = []
//       datae[item.weekDay][item.startingPeriod].push(item.subjectName)
//     })
//     console.log(datae)

//     // setDataf(data)
//   });


//   async function foo() {
//     const data1 = await ListEdit.getLectures("lectures", filter);
//     setLectures(data1);
//     console.log(data1)
//     const data2 = await ListEdit.getLectures("labs", filter);
//     setLabs(data2);
//   }

//   //sunday arr -> 0

//   const columns = [
//     {
//       title: 'Week Day',
//       dataIndex: 'weekDay',
//     },
//     {
//       title: 'Period 1',
//       dataIndex: 'period_1',
//       render: (text, row, index) => {
//         if (index === 0) {
//           return {
//             children: <div>{text}</div>,
//             props: {
//               colSpan: 2,
//             },
//           };
//         }
//         if (index === 2) {
//           return {
//             children: <div>{text}</div>,
//             props: {
//               colSpan: 2,
//             },
//           };
//         }
//         if (index === 3) {
//           return {
//             children: <div>{text}</div>,
//             props: {
//               colSpan: 0,
//             },
//           };
//         }
//         return <div>{text}</div>;
//       }
//     },
//     {
//       title: 'Period 2',
//       dataIndex: 'period_2',
//       render: (text, row, index) => {
//         if (index === 0) {
//           return {
//             children: <div>{text}</div>,
//             props: {
//               colSpan: 0,
//             },
//           };
//         }
//       }
//       //render: renderContent,
//     },
//     {
//       title: 'Period 3',
//       dataIndex: 'period_3',
//       render: (text, row, index) => {
//         if (index === 0) {
//           return {
//             children: <div>{text}</div>,
//             props: {
//               colSpan: 2,
//             },
//           };
//         }
//       }
//       //render: renderContent,
//     },
//     {
//       title: 'Period 4',
//       dataIndex: 'period_4',
//       //render: renderContent,
//     },
//     {
//       title: 'Period 5',
//       dataIndex: 'period_5',
//       //render: renderContent,
//     },
//     {
//       title: 'Period 6',
//       dataIndex: 'period_6',
//       //render: renderContent,
//     },
//     {
//       title: 'Period 7',
//       dataIndex: 'period_7',
//       //render: renderContent,
//     },
//     {
//       title: 'Period 8',
//       dataIndex: 'period_8',
//       //render: renderContent,
//     },
//     // {
//     //   title: 'Period 2',
//     //   colSpan: 2,
//     //   dataIndex: '',
//     //   render: (value, row, index) => {
//     //     const obj = {
//     //       children: value,
//     //       props: {},
//     //     };
//     //     if (index === 2) {
//     //       obj.props.rowSpan = 2;
//     //     }
//     //     // These two are merged into above cell
//     //     if (index === 3) {
//     //       obj.props.rowSpan = 0;
//     //     }
//     //     if (index === 4) {
//     //       obj.props.colSpan = 0;
//     //     }
//     //     return obj;
//     //   },
//     // },
//   ];


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

//   return (
//     <>
//       <Table columns={columns} dataSource={data} unbordered />
//     </>
//   );

// }

// export default Routine;

//if()? : 


import React,{Component,useEffect,useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Routine.css'

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable() {
  const classes = useStyles();
  
  const [routine, setRoutine] = useState();
  const datae={};
  useEffect(async() => {
    let res = await axios.get('http://localhost:5000/api/class');
    let data = res.data;
    console.log(data);
    if(data){
    data.data.map((item, index) => {
            if (!datae[item.weekDay]) {
              datae[item.weekDay] = {}
            }
            if (!datae[item.weekDay][item.startingPeriod]) {
              datae[item.weekDay][item.startingPeriod] = {}
            }
            datae[item.weekDay][item.startingPeriod] = {}
            datae[item.weekDay][item.startingPeriod]=item
          })
        }
    console.log(data);
    setRoutine(datae);
  }, []);
  //routine.sunday.
  console.log(routine);
  const dum={sunday:[1,2,3,4,5,6,7,8],monday:[1,2,3,4,5,6,7,8],tuesday:[1,2,3,4,5,6,7,8],wednesday:[1,2,3,4,5,6,7,8],thursday:[1,2,3,4,5,6,7,8],friday:[1,2,3,4,5,6,7,8]};
  
  // for(let i=3;i<5;i++)
  //     {
  //       dum.sunday.splice(dum.sunday.indexOf(i),1);
  //     }
  //   console.log(dum);
  console.log(routine);
  if(routine){
    Object.keys(routine).map((val,index)=>{
      // // console.log(routine[val].startingPeriod);
      // // for(let i=routine[val].startingPeriod+1;i<routine[val].startingPeriod+routine[val].numOfPeriod;i++)
      // // {
      // //   dum.val.splice(dum.val.indexOf(i),1);
      // //   console.log(dum.val);
      // // }
      // console.log(routine[val]);

      Object.keys(routine[val]).map((start,index)=>
      {
        //console.log(start);
        for(var i=parseInt(start)+1;i<parseInt(start)+parseInt(routine[val][start].noOfPeriod);i++)
        {
          dum[val].splice(dum[val].indexOf(i),1);
          //console.log(i);
          //console.log(dum['sunday']);
        }
      })
      
   })
  }

  //const dummy=[1,2,3,4,5,6,7,8];
  //dum.sunday.splice(dum.sunday.indexOf(4),1);
  console.log(dum);
  const cur=1;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Periods</TableCell>
            <TableCell align="center">Period 1</TableCell>
            {/* {temp>0?
            <TableCell align="center">2</TableCell>:null
            } */}
            <TableCell align="center">Period 2</TableCell>
            <TableCell align="center">Period 3</TableCell>
            <TableCell align="center">Period 4</TableCell>
            <TableCell align="center">Period 5</TableCell>
            <TableCell align="center">Period 6</TableCell>
            <TableCell align="center">Period 7</TableCell>
            <TableCell align="center">Period 8</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className='relative'>
            <TableCell className='border' >SUNDAY</TableCell>
            {routine?
              dum.sunday.map((temp,index)=>{
                return(
                    routine.sunday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.sunday[temp].noOfPeriod}>{routine.sunday[temp].subjectName}</TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >MONDAY</TableCell>
            {routine?
              dum.monday.map((temp,index)=>{
                return(
                    routine.monday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.monday[temp].noOfPeriod}>{routine.monday[temp].subjectName}</TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >TUESDAY</TableCell>
            {routine?
              dum.tuesday.map((temp,index)=>{
                return(
                    routine.tuesday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.tuesday[temp].noOfPeriod}>{routine.tuesday[temp].subjectName}</TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >WEDNESDAY</TableCell>
            {routine?
              dum.wednesday.map((temp,index)=>{
                return(
                    routine.wednesday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.wednesday[temp].noOfPeriod}>{routine.wednesday[temp].subjectName}</TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >THURSDAY</TableCell>
            {routine?
              dum.thursday.map((temp,index)=>{
                return(
                    routine.thursday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.thursday[temp].noOfPeriod}>{routine.thursday[temp].subjectName}</TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>

          <TableRow className='relative'>
            <TableCell className='border' >FRIDAY</TableCell>
            {routine?
              dum.friday.map((temp,index)=>{
                return(
                    routine.friday[temp]?
                  <TableCell align="center" className='border' colSpan={routine.friday[temp].noOfPeriod}>{routine.friday[temp].subjectName}</TableCell>:<TableCell align="center" className='border' colSpan={1}></TableCell>
                )
              }
              ):''
            }
          </TableRow>








          {/* <TableRow>
            <TableCell className='border'>MONDAY</TableCell>
            <TableCell align="center" colSpan={3} className='border'>Object Oriented Analysis and Design</TableCell>
            <TableCell align="center" colSpan={1} className='border'>BREAK</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Minor Project</TableCell>
            <TableCell align="center" colSpan={3} className='border'>Operating System</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className='border'>TUESDAY</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Operating System</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Artificial Intelligence</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Object Oriented Analysis and Design</TableCell>
            <TableCell align="center" colSpan={1} className='border'>BREAK</TableCell>
            <TableCell align="center" colSpan={2} className='border'>Embedded System</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Database Management System</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Emebecded System</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>WEDNESDAY</TableCell>
            <TableCell align="center" colSpan={2} className='border'>Object Oriented Analysis and Design</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Database Management System</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Artificial Intelligence</TableCell>
            <TableCell align="center" colSpan={1} className='border'>Operating System</TableCell>
          </TableRow> */}

          {/* {rows.map((row) => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>yarn
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
