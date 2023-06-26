import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import NavBar from "./components/NavBarDir/NavBar";
import React, {useEffect, useState} from "react";
import TeachingCalendar from "./pages/TeachingCalendar";
import Lecture from "./pages/Lecture";
import Test from "./components/Test";
import SectionDetailPage from "./pages/SectionDetailPage";
import LessonPage from "./components/LessonPage";
import EnterpriseNavBar from "./components/NavBarDir/EnterpriseNavBar";
import PeoplePage from "./pages/PeoplePage"
import EnterpriseCoursePage from "./pages/EnterpriseCoursePage";

function App() {
    const role = 1;
    const [isPhone, setIsPhone] = useState(false);
    const [burgerClick, setBurgerClick] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsPhone(true);
        }else {
            setIsPhone(false);
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);
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
            {!isPhone ? ((role === 1) ? <EnterpriseNavBar/> : <NavBar/>) : <div className="">
                <div onClick={onBurgerClick}>
                    <div className={` w-fit h-fit ${burgerClick ? 'rotate-90 transition delay-75' : 'rotate-0 transition delay-75'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>}
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
            <Route path={"/"} element={<HomePage/>} />
            <Route path={"/course"} element={<CoursePage/>} />
            <Route path={"/calendar"} element={<TeachingCalendar />} />
            <Route path={"/lecture"} element={<Lecture />} />
            <Route path={'/test'} element={<Test/>}/>
            <Route path={'/section'} element={<SectionDetailPage/>}/>
            <Route path={'/lesson'} element={<LessonPage/>}/>
            <Route path={'/people'} element={<PeoplePage/>}/>
            <Route path={'/enterprise/course-page'} element={<EnterpriseCoursePage/>}/>

        </Routes>
    </div>
    );
}

export default App;
