import React, {useEffect, useState} from "react";
import CurriculumItem from "../card/CurriculumItem";
import {ar} from "date-fns/locale";
import axios from "axios";

const Curriculum = ({course}) => {
    const [lessonAllocated, setLessionAllocated] = useState(new Array(course.totalSession).fill(0));
    const [isUpdate, setIsUpdate] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [appendObj, setAppendObj] = useState(null);
    const [settingLesson, setSettingLesson] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}api/class-type/allocated-lesson?id=${course.id}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }}).then(res => {
            setSettingLesson(res.data);
            console.log(res.data);
            axios.get(`${process.env.REACT_APP_API_URL}api/class-type/lesson?id=${course.id}`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }}).then(resFull => {
                console.log(resFull.data);
                let fullLesson = resFull.data;
                let lessonData = res.data;
                let remainingLesson = [];
                const comparedArr = [];

                const lssA = [...lessonAllocated];
                console.log(lssA);
                let idx = 0;
                lessonData.forEach(lessonSession => {
                    // console.log(lessonSession);
                    lessonSession.lessons.forEach((lesson, index) => {
                        if (lesson !== null) {
                            console.log(index);
                            lssA[idx] = lesson.id;
                            comparedArr.push(lesson);
                        }

                    })
                    idx = idx + 1;
                });
                console.log(lssA);
                setLessionAllocated(lssA);

                remainingLesson = fullLesson.filter(lesson => !comparedArr.some(comparedLesson => comparedLesson.id == lesson.id));
                console.log(remainingLesson);
                setLessons(remainingLesson);
            })
        })


    }, []);

    useEffect(() => {
        console.log(lessonAllocated);
    }, [lessonAllocated]);

    useEffect(() => {
        if (appendObj !== null) {
            setLessons([...lessons, appendObj]);
        }
    }, [appendObj]);

    useEffect(() => {
        console.log(settingLesson);
    }, [settingLesson])

    useEffect(() => {

        console.log(lessons);
    }, [lessons])

    const onUpdateClick = () => {
        console.log(lessonAllocated);
        if (isUpdate) {
            axios.post(`${process.env.REACT_APP_API_URL}api/class-type/assign-lesson?id=${course.id}`, {
                lesson: lessonAllocated
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                console.log(res)
                window.location.reload();
            }).catch(err => {
                console.log(err);
            })
        }
        setIsUpdate(!isUpdate);
    }

    return <div className="w-full ml-5 mr-5">
        <div className="pl-4">
            <div onClick={onUpdateClick} className="py-1.5 px-3 bg-blue-100 w-fit rounded-xl text-xl cursor-pointer hover:bg-gray-100 active:bg-blue-400">
                {isUpdate ? 'Lưu' : 'Chỉnh sửa'}
            </div>
        </div>
        <div className="w-2/3 p-4 w-5/6">
            {settingLesson.map((courseItem, index) => <CurriculumItem course={course} actualLessons={courseItem} lessonAllocated={lessonAllocated} setLessionAllocated={setLessionAllocated} setAppendObj={setAppendObj} setLessons={setLessons} lessons={lessons} isUpdate={isUpdate} title={`Buoi ${index + 1}`} idx={index} key={index} />)}
        </div>
    </div>
}

export default Curriculum;