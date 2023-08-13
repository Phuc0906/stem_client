import React, {useEffect, useState} from "react";
import CourseCard from "../../components/card/CourseCard";
import CourseRegistrationForm from "../../components/form/CourseRegistrationForm";
import axios from "axios";

const EnterpriseCoursePage = () => {
    const [arr, setArr] = useState([]);
    const [isPhone, setIsPhone] = useState(false);
    const [isAddCourse, setIsAddCourse] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [course, setCourse] = useState({
        "name": "",
        "classCode": "",
        "dateOfWeek": 1,
        "startDate": "",
        "teacherId": 0,
        "startTime": "12:30",
        "duration": 90,
        "totalSession": 1
    })

    useEffect(() => {
        if (window.innerWidth < 900) {
            setIsPhone(true);
        }else {
            setIsPhone(false);
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
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


    useEffect(() => {
        localStorage.ocean_education_current_course_selected = "0";





        axios.get(`${process.env.REACT_APP_API_URL}api/class-type`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setArr(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);



    return <div className={``}>
        <div className={`pl-5 pt-10 w-5/6 ${!isPhone ? 'fixed left-28' : ''} ${isAddCourse ? 'opacity-20' : 'opacity-100'}  overflow-auto h-screen`}>
            <div className="border-b-2 border-b-gray-300 w-full flex justify-between mr-5 pb-3">
                <div>
                    <label className="text-4xl text-green-600">Khoá Học</label>
                </div>
                <div>
                    <div onClick={() => {
                        setIsUpdate(false)
                        setIsAddCourse(true);
                        setCourse({
                            "name": "",
                            "classCode": "",
                            "dateOfWeek": 1,
                            "startDate": "",
                            "teacherId": 0,
                            "startTime": "12:00",
                            "duration": 90,
                            "totalSession": 1
                        })
                    }} className="cursor-pointer bg-purple-300 p-2 rounded-xl hover:bg-gray-200 active:bg-gray-600">
                        <label>Thêm Khoá Học</label>
                    </div>
                </div>
            </div>
            <div className="mt-10 flex gap-6 flex-wrap mb-16">
                {arr.map((e,index) => <CourseCard course={e} key={index} isEnterprise={true} setIsAddCourse={setIsAddCourse} setCourse={setCourse} setIsUpdate={setIsUpdate} />)}
            </div>
        </div>
        {isAddCourse ? <CourseRegistrationForm course={course} setCourse={setCourse} setIsAddCourse={setIsAddCourse} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/> : null}
    </div>
}

export default EnterpriseCoursePage;