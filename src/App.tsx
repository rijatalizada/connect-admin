import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";
import Nav from "./Components/Base/Nav";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import CreateSchool from "./Pages/School/CreateSchool";
import Courses from "./Pages/Course/Courses";

import Schools from "./Pages/School/Schools";
import UpdateSchool from "./Pages/School/UpdateSchool";
import ChooseSchool from "./Pages/Course/ChooseSchool";
import CourseCreate from "./Pages/Course/CourseCreate";
import UpdateCourse from "./Pages/Course/UpdateCourse";
import getCookie from "./CustomHooks/getCookies";
import Users from "./Pages/Users/Users";
import UserDetail from "./Pages/Users/UserDetail";

import Discussions from "./Pages/Discussions/Discussions";
import ShcoolChooseDiscussions from "./Pages/Discussions/SchoolChooseDiscussions";
import CoursesChooseDiscussion from "./Pages/Discussions/CoursesChooseDiscussion";
import Discussion from "./Pages/Discussions/Discussion";
import ChooseItem from "./Pages/HomePage/ChooseItem";
import HeadingText from "./Pages/HomePage/HeadingText";
import UpdateTitle from "./Pages/HomePage/UpdateTitle";
import SliderImges from "./Pages/HomePage/SliderImges";

function App() {
  const { data, isOkay } = getCookie("admin");
  return (
    <Router>
      <div className="App w-full h-full">
        <Routes>
          <Route path="/" element={<Login />} />
          {isOkay && (
            <Route path="" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="schools" element={<Schools />} />
              <Route path="schoolCreate" element={<CreateSchool />} />
              <Route path="updateSchool/:id" element={<UpdateSchool />} />
              <Route path="chooseSchool" element={<ChooseSchool />} />
              <Route path="schools/courses/:schoolId" element={<Courses />} />
              <Route
                path="course/create/:schoolId"
                element={<CourseCreate />}
              />
              <Route path="course/update/:id" element={<UpdateCourse />} />
              <Route path="users" element={<Users />} />
              <Route path="user/:id" element={<UserDetail />} />

              <Route
                path="/discussions/chooseSchoool"
                element={<ShcoolChooseDiscussions />}
              />
              <Route
                path="/discussion/chooseCourse/:schoolId"
                element={<CoursesChooseDiscussion />}
              />
              <Route path="/course/discussions/:id" element={<Discussions />} />
              <Route path="/discussion/:id" element={<Discussion />} />
              <Route path="/HomeItemsChoose" element={<ChooseItem />} />
              <Route path="/headingText" element={<HeadingText />} />
              <Route path="/updateTitle" element={<UpdateTitle/>} />
              <Route path="/homeSliders" element={<SliderImges/>} />
            </Route>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
