import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import NavBar from "./components/NavBar";
import React from "react";
import TeachingCalendar from "./pages/TeachingCalendar";
import Lecture from "./pages/Lecture";
import Test from "./components/Test";
import SectionDetailPage from "./pages/SectionDetailPage";
import LessonPage from "./components/LessonPage";

function App() {
  return (<div className="pr-5">
          <NavBar/>
          <Routes>
              <Route path={"/"} element={<HomePage/>} />
              <Route path={"/course"} element={<CoursePage/>} />
              <Route path={"/calendar"} element={<TeachingCalendar />} />
              <Route path={"/lecture"} element={<Lecture />} />
              <Route path={'/test'} element={<Test/>}/>
              <Route path={'/section'} element={<SectionDetailPage/>}/>
              <Route path={'/lesson'} element={<LessonPage/>}/>
          </Routes>
  </div>
  );
}

export default App;
