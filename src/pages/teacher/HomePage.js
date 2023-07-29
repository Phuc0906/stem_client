import React, {useEffect, useState} from "react";
import CourseCard from "../../components/card/CourseCard";
import axios from "axios";

const HomePage = () => {
    const arr = [0,0,0,0];
    const [isPhone, setIsPhone] = useState(false);
    const [teacherClass, setTeacherClass] = useState([]);

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
        axios.get(`${process.env.REACT_APP_API_URL}api/teacher/class-type?id=1`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setTeacherClass(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [])



    return <div className="flex">
        <div className={`pl-5 pt-10 w-full ${!isPhone ? 'fixed left-28' : ''}  overflow-auto h-screen`}>
            <div className="border-b-2 border-b-gray-300 w-full">
                <label className="text-4xl text-green-600">Khoá Học</label>
            </div>
            <div className="mt-10 flex gap-6 flex-wrap mb-16">
                {teacherClass.map((classType,index) => <CourseCard key={index} course={classType} isEnterprise={false} />)}
            </div>
        </div>
    </div>
}

export default HomePage;