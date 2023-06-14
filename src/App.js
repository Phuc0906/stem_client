import {Route, Routes} from "react-router-dom";
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

function App() {
    const role = 1;
    const [isPhone, setIsPhone] = useState(false);
    const [burgerClick, setBurgerClick] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);
            if (window.innerWidth < 700) {
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
            {!isPhone ? ((role === 1) ? <EnterpriseNavBar/> : <NavBar/>) : <div className="pr-5">
                <div onClick={onBurgerClick}>
                    <div className={`${burgerClick ? 'rotate-90 transition delay-75' : 'rotate-0 transition delay-75'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
            </div>}
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
