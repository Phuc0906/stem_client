import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./pages/teacher/HomePage";
import CoursePage from "./pages/teacher/CoursePage";
import NavBar from "./components/NavBarDir/NavBar";
import React, {useEffect, useState} from "react";
import TeachingCalendar from "./pages/teacher/TeachingCalendar";
import Lecture from "./pages/teacher/Lecture";
import SectionDetailPage from "./pages/teacher/SectionDetailPage";
import LessonPage from "./pages/teacher/LessonPage";
import EnterpriseNavBar from "./components/NavBarDir/EnterpriseNavBar";
import PeoplePage from "./pages/enterprise/PeoplePage"
import EnterpriseCoursePage from "./pages/enterprise/EnterpriseCoursePage";
import CourseManagementCalender from "./pages/enterprise/CourseManagementCalender";
import LoginPage from "./pages/auth/LoginPage";
import { RequireAuth } from "react-auth-kit";
import EnterpriseLessonPage from "./pages/enterprise/EnterpriseLessonPage";
import ChangePasswordPage from "./pages/auth/ChangePasswordPage";
import AccountPage from "./pages/auth/AccountPage";
import Test from "./pages/Test";

function App() {
    const [isPhone, setIsPhone] = useState(false);
    const [burgerClick, setBurgerClick] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsPhone(true);
        }else {
            setIsPhone(false);
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setIsPhone(true);
            }else {
                setIsPhone(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const onBurgerClick = () => {
        setBurgerClick(!burgerClick);
    }



    return (<div className="pr-5">
            {(!isPhone ? ((localStorage.ocean_software_role === undefined ? null : (parseInt(localStorage.ocean_software_role) === 1) ? <EnterpriseNavBar/> : <NavBar/>)) : <div className="">
                <div onClick={onBurgerClick}>
                    <div className={` w-fit h-fit ${burgerClick ? 'rotate-90 transition delay-75' : 'rotate-0 transition delay-75'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>)}
            <div className={`h-screen w-screen bg-white fixed  ${burgerClick ? '  ease-out duration-300 opacity-100 z-10' : 'ease-in duration-200 opacity-0 -z-10'}`}>
                <div className="w-full h-full pt-10">
                    <div className="">
                        <div className="flex gap-4 items-center justify-center text-xl p-5 hover:bg-gray-100 ">
                            <label>Tài Khoản</label>
                        </div>
                        <Link onClick={onBurgerClick} to="/">
                            <div className="flex gap-4 items-center justify-center text-xl p-5 hover:bg-gray-100">
                                <label>Lớp Học</label>
                            </div>
                        </Link>
                        <Link onClick={onBurgerClick} to="/calendar">
                            <div className="flex gap-4 items-center justify-center text-xl p-5 hover:bg-gray-100">
                                <label>Lịch</label>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        <Routes>
            <Route path={"/"} element={<RequireAuth loginPath="/login"><HomePage/></RequireAuth>} />
            <Route path={"/login"} element={<LoginPage setIsLogin={setIsLogin}/>} />
            <Route path={"/change-password"} element={<ChangePasswordPage/>}/>
            <Route path={"/course"} element={<RequireAuth loginPath="/login"><CoursePage/></RequireAuth>} />
            <Route path={"/account"} element={<RequireAuth loginPath="/login"><AccountPage/></RequireAuth>} />
            <Route path={"/calendar"} element={<RequireAuth loginPath="/login"><TeachingCalendar /></RequireAuth>} />
            <Route path={"/lecture"} element={<RequireAuth loginPath="/login"><Lecture /></RequireAuth>} />
            <Route path={'/test'} element={<Test/>}/>
            <Route path={'/section'} element={<RequireAuth loginPath="/login"><SectionDetailPage/></RequireAuth>}/>
            <Route path={'/lesson'} element={<RequireAuth loginPath="/login"><LessonPage/></RequireAuth>}/>
            <Route path={'/people'} element={<RequireAuth loginPath="/login"><PeoplePage/></RequireAuth>}/>
            <Route path={'/enterprise/lesson'} element={<RequireAuth loginPath="/login"><EnterpriseLessonPage/></RequireAuth>}/>
            <Route path={'/enterprise/course-page'} element={<RequireAuth loginPath="/login"><EnterpriseCoursePage/></RequireAuth>}/>
            <Route path={"/enterprise/calendar"} element={<RequireAuth loginPath="/login"><CourseManagementCalender /></RequireAuth>} />

        </Routes>
    </div>
    );
}

export default App;
