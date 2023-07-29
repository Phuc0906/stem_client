import React, {useEffect, useState} from "react";
import Curriculum from "../../components/tab/Curriculum";
import Announcement from "../../components/tab/Announcement";
import Student from "../../components/tab/Student";
import Group from "../../components/tab/Group";
import LegoCurriculum from "../../components/tab/LegoCurriculum";

const CoursePage = () => {
    const [burgerClick, setBurgerClick] = useState(false);
    const content = ['Thông Báo ', 'Giáo Trình', 'Giáo Trình Lego' , 'Nhóm', 'Học Sinh']
    const [selectedContent, setSelectedContent] = useState(parseInt(localStorage.ocean_education_current_course_selected));
    const [students, setStudents] = useState(['Student A', 'Student B', "Student C", 'Student D', "Student E"]);
    const [numberOfGroup, setNumberOfGroup] = useState(1);
    const [groupArr, setGroupArr] = useState(Array.from({ length: 1 }, (_, index) => index + 1));
    const [selectedStudents, setSelectedStudent] = useState(Array.from({ length: numberOfGroup }, () => Array.from({length: 0}, () => "")))
    const courseComponents = [<Announcement/>,
        <Curriculum/>,
        <LegoCurriculum/>,
        <Group students={students} setStudents={setStudents} numberOfGroup={numberOfGroup} setNumberOfGroup={setNumberOfGroup} groupArr={groupArr} setGroupArr={setGroupArr} selectedStudents={selectedStudents} setSelectedStudents={setSelectedStudent}/>,
        <Student/>];
    const [isPhone, setIsPhone] = useState(false);

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

    const SideContentGenerator = ({content, idx, selectedContent, setSelected}) => {

        const onSelectHandle = () => {
            setSelectedContent(idx);
            localStorage.ocean_education_current_course_selected = idx.toString();
        }

        return <div onClick={onSelectHandle} className={`text-2xl w-fit transition delay-75 ${(selectedContent === idx) ? 'text-purple-800 border-l-2 border-purple-900 ' : 'text-blue-500'} pl-3 hover:underline `}>
            <label>{content}</label>
        </div>
    }

    return <div className={`pl-5 pt-10 pr-5 w-full ${!isPhone ? 'fixed left-28 ' : ''}  overflow-auto h-screen overflow-auto`}>
        <div className="">
            <div className="flex items-center gap-8 border-b-2 border-b-gray-500 w-full pb-5 pr-4">
                <div onClick={onBurgerClick}>
                    <div className={`${burgerClick ? 'rotate-90 transition delay-75' : 'rotate-0 transition delay-75'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="blue" className="w-14 h-14">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </div>
                </div>
                <div>
                    <label className="text-3xl text-blue-400">Tên Khoá Học</label>
                </div>
            </div>
        </div>
        <div className="flex flex-row gap-3 pr-5">
            <div className={`mt-10 p-3 duration-300 transition ease-in-out ${burgerClick ? 'hidden' : ''}`}>
                <div className="flex flex-col gap-8">
                    {content.map((label, index) => <SideContentGenerator  content={label} key={index} idx={index} selectedContent={selectedContent} />)}
                </div>
            </div>
            <div className={`mt-10 w-full `}>
                {courseComponents[selectedContent]}
            </div>
        </div>
    </div>
}

export default CoursePage;