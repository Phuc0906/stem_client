import React, {useEffect, useState} from "react";
import { Document, Page,pdfjs } from 'react-pdf';
import {useLocation} from "react-router-dom";
import axios from "axios";
import {base64ToFile, downloadFile} from "../../components/utils/utils";

const Lecture = () => {
    const location = useLocation();
    const [lesson, setLesson] = useState(location.state.lesson);
    const [course, setCourse] = useState(location.state.course);
    const [file, setFile] = useState(null);
    const [base64Str, setBase64Str] = useState('');
    const [isWaitingDownload, setIsWaitingDownload] = useState(false);
    const [test, setTest] = useState(null);
    const [isAbleDownload, setIsAbleDownload] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/lesson/get-file?name=${lesson.id}.pdf`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setBase64Str(res.data);
            console.log("done ");
        })

        axios.get(`${process.env.REACT_APP_API_URL}api/lesson/get-file?name=${lesson.id}.${lesson.fileId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setFile(base64ToFile(res.data, lesson.name, lesson.fileId));
            console.log("done ");
        })
    }, [])

    useEffect(() => {
        let idx = 0;
        const currentDate = new Date();
        while (idx < course.totalSession) {
            let startDate = new Date(parseInt(course.startDate.split("-")[2]), parseInt(course.startDate.split("-")[1]) - 1, parseInt(course.startDate.split("-")[0]));
            startDate.setDate(startDate.getDate() + idx * 7)
            if (areDatesEqual(currentDate, startDate) && (idx == location.state.idx)) {
                console.log('match')
                setIsAbleDownload(true);
            }
            idx++;
        }
    }, [])

    function areDatesEqual(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }


    useEffect(() => {
        if (isWaitingDownload) {
            downloadFile(file, `${lesson.name}.${lesson.fileId}`);
            setIsWaitingDownload(false);
        }
    }, [file])

    const onDownloadClick = () => {
        if (file === null) {
            setIsWaitingDownload(true);
        }else {
            downloadFile(file, `${lesson.name}.${lesson.fileId}`);
        }

    }

    useEffect(() => {
        console.log(test);
    }, [test])

    return <div className="pl-5 pt-10 pr-5 w-full fixed left-28 overflow-auto h-screen overflow-auto  ">
        <div className=" w-5/6 h-3/4 flex flex-col gap-3">
            <label className="text-3xl font-bold">Bai hoc</label>
            {(isAbleDownload) ? <div className="flex gap-2.5">
                <label className="text-xl">{`${lesson.name}.${lesson.fileId}`}</label>
                <div onClick={onDownloadClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-6 h-6 active:w-7 active:h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                </div>
            </div>: null}
            <div className="w-full h-screen">
                {(base64Str.length !== 0) ? <embed className="w-full h-full" src={`data:application/pdf;base64,${base64Str}`} /> : null}
                {(base64Str.length === 0) ? <div className="px-4 py-2.5 bg-indigo-500 w-fit mt-5 flex gap-5 items-center rounded-xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="30"
                        height="30"
                        fill="#000000"
                        className="animate-spin"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#A084E8"
                            strokeWidth="15"
                            fill="transparent"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="#8BE8E5"
                            strokeWidth="15"
                            fill="transparent"
                            strokeDasharray="180"
                            strokeDashoffset="0"
                        >

                        </circle>
                    </svg>
                    <label className="text-white text-lg">Đang tải file</label>
                </div> : null}
            </div>
        </div>

    </div>

}

export default Lecture;