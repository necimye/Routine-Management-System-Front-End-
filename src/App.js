import React, { useEffect } from "react"
import { Router, Link } from "@reach/router"
import { Layout, Menu, Button } from "antd"
import {
  UserOutlined,
  VideoCameraOutlined,
  PlusOutlined,
  GithubFilled,
  AppstoreAddOutlined,
  SwapOutlined,
} from "@ant-design/icons"

import Login from "./pages/Login/Login"
import Profile from "./pages/Profile/Profile"
import LabPage from "./pages/LabPage/LabPage"
import AddPage from "./pages/AddPage/AddPage"
import LecturePage from "./pages/LecturePage/LecturePage"
import AllThings from "./pages/AllThings/AllThings"
import ImpoExpo from "./pages/ImpoExpo/ImpoExpo"
// import AddClass from './pages/AddClass/AddClass';
import Class from "./pages/AddClass/AddClass"
import AppHeader from "./components/Common/Header"
import AppFooter from "./components/Common/Footer"
import AppHome from "./components/Home/Home"
import AddClassForm from "./components/AddClassForm/AddClassForm"
import Routine from "./pages/Routine/Routine"
import AddTeacher from "./components/AddTeacher/AddTeacher"
import AddProgram from "./components/AddProgram/AddProgram"
import EditProgram from "./components/EditProgram/EditProgram"
import EditTeacher from "./components/EditTeacher/EditTeacher"
import EditClass from "./components/EditClass/EditClass"
import Program from "./pages/Program/Program"
import Teacher from "./pages/Teacher/Teacher"
import ReactGa from "react-ga"
import "antd/dist/antd.css"
import "./App.css"

const { Header, Content, Footer } = Layout

function App() {
  useEffect(() => {
    ReactGa.initialize("UA-174022278-1")
    ReactGa.pageview("/")
  })

  return (
    <Layout className="mainLayout">
      {/* <Sider
        width="280px"
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          height: "100vh",
        }}
      >
        <h3 className="logo" style={{ textAlign: "center", color: "#fff" }}>
          Department of Electronics and Computer Engineering
          <span role="img" aria-label="daglo"></span>
        </h3> */}
      {/* <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ fontSize: "20px" }}
        > */}
      {/* <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/">Lectures</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/labs">Labs</Link>
          </Menu.Item> */}
      {/* <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
            <Link to="/all">All Lectures/Labs</Link>
          </Menu.Item> */}
      {/* <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
            <Link to="/program">Program</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
            <Link to="/teacher">Teacher</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreAddOutlined />}>
            <Link to="/class">Add Class</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
            <Link to="/routine">Routine</Link>
          </Menu.Item> */}
      {/* <Menu.Item key="8" icon={<AppstoreAddOutlined />}>
            <Link to="/addTeacher">Add Teacher</Link>
          </Menu.Item> */}
      {/* <Menu.Item key="9" icon={<AppstoreAddOutlined />}>
            <Link to="/addProgram">Add Program</Link>
          </Menu.Item> */}
      {/* </Menu> */}
      {/* </Sider> */}
      <Header>
        <AppHeader />
      </Header>
      <Content
        style={{
          margin: "24px 16px 0",
          height: "100vh",
          //overflowY: "scroll",
          alignContent: "center",
        }}
      >
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Router primary={false}>
            <AppHome exact path="/" />
            <Login path="/user/login" />
            <Routine path="/routine" />
            <ImpoExpo path="/ie" />
            <AllThings path="/user/admin/all" />
            <Class path="/user/admin/class" />
            <LabPage path="/user/admin/labs" />
            <AddPage path="/user/admin/edit" />
            <AddPage path="/user/admin/add" />
            <Teacher path="/user/admin/teacher" />
            <Program path="/user/admin/program" />
            <AddTeacher path="/user/admin/addTeacher" />
            <AddProgram path="/user/admin/addProgram" />
            <AddClassForm path="/user/admin/addClass" />
            <EditProgram path="/user/admin/editProgram/:id">
              {/* {props => (
                <div>
                  {props.match
                    ? props.match.id
                    : "No match"}
                </div>
              )} */}
            </EditProgram>
            <EditTeacher path="/user/admin/editTeacher/:id"></EditTeacher>
            <EditClass path="/user/admin/editClass/:id"></EditClass>
            <Profile path="/user/profile"></Profile>
          </Router>
          <Footer>
            <AppFooter />
          </Footer>
        </div>
      </Content>
    </Layout>
  )
}

export default App
