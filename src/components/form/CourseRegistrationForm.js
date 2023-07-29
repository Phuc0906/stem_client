import React, {useEffect, useState} from "react";
import {Calendar} from "react-date-range";
import axios from "axios";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const CourseRegistrationForm = ({course, setCourse, setIsAddCourse, isUpdate, setIsUpdate}) => {
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [isSelectingTeacher, setIsSelectingTeacher] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState((isUpdate) ? course.teacherName : '');
    const [isSelectingLevel, setIsSelectingLevel] = useState(false);
    const [teachingLevels, setTeachingLevels] = useState([]);
    const [selectedTeachingLevel, setSelectedTeachingLevel] = useState((isUpdate) ? course.teachingLevel : '');
    const [teachers, setTeachers] = useState([]);
    const [time, setTime] = useState((isUpdate) ? course.startTime : '12:00');
    const [selectedLessons, setSelectedLessons] = useState((isUpdate) ? course.classLessons : []);
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedStudents, setSelectedStudents] = useState((isUpdate) ? course.studentIds : []);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [isSelectingStudent, setIsSelectingStudents] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState(-1);
    const [allStudents, setAllStudents] = useState([]);
    const [teacherClass, setTeacherClass] = useState([]);
    const [isOverLap, setIsOverLap] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/curriculum`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setTeachingLevels(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        axios.get(`${process.env.REACT_APP_API_URL}api/student`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setAllStudents(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        axios.get(`${process.env.REACT_APP_API_URL}api/student/free-student`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setStudents(res.data);
            setFilteredStudents(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        if (isUpdate) {
            axios.get(`${process.env.REACT_APP_API_URL}api/teacher/class-type?id=${course.teacherId}`, {
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
        }
    }, [])

    useEffect(() => {
        console.log(selectedTeachingLevel)
        axios.get(`${process.env.REACT_APP_API_URL}api/teacher/level?level=${selectedTeachingLevel}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setTeachers(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });

        axios.get(`${process.env.REACT_APP_API_URL}api/curriculum/lesson?name=${selectedTeachingLevel}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setLessons(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [selectedTeachingLevel]);

    useEffect(() => {
        console.log(course)
        teacherClass.forEach(classType => {

            if ((course.startDate.length !== 0) && (time !== null) && (time.includes(':'))) {
                if (isUpdate) {
                    if (classType.name !== course.name) {
                        const currentStartDate = new Date(parseInt(course.startDate.split("-")[2]), parseInt(course.startDate.split("-")[1]) - 1, parseInt(course.startDate.split("-")[0]))
                        let startDate = new Date(parseInt(classType.startDate.split("-")[2]), parseInt(classType.startDate.split("-")[1]) - 1, parseInt(classType.startDate.split("-")[0]))
                        for (let i = 0; i < classType.totalSession; i++) {
                            startDate.setDate(startDate.getDate() + i * 7);
                            if (isSameDate(startDate, currentStartDate)) {
                                const startHour = parseInt(classType.startTime.split(":")[0]);
                                const startMinutes = parseInt(classType.startTime.split(":")[1]);
                                let endHour = parseInt(classType.duration / 60) + startHour;
                                const endMinutes = ((parseInt(classType.duration % 60) + startMinutes === 60) ? 0 : parseInt(classType.duration % 60) + startMinutes);
                                const currentStartHour = parseInt(course.startTime.split(":")[0]);
                                const currentStartMinutes = parseInt(course.startTime.split(":")[1]);
                                let currentEndHour = parseInt(course.duration / 60) + currentStartHour;
                                const currentEndMinutes = ((parseInt(course.duration % 60) + currentStartMinutes === 60) ? 0 : parseInt(course.duration % 60) + currentStartMinutes);

                                const startDate = new Date(`2023-07-05T${startHour}:${(startMinutes < 10) ? `0${startMinutes}` : startMinutes}:00`)
                                const endDate = new Date(`2023-07-05T${endHour}:${(endMinutes < 10) ? `0${endMinutes}` : endMinutes}:00`)
                                const currentStartDate = new Date(`2023-07-05T${currentStartHour}:${(currentStartMinutes < 10) ? `0${currentStartMinutes}` : currentStartMinutes}:00`)
                                const currentEndDate = new Date(`2023-07-05T${currentEndHour}:${(currentEndMinutes < 10) ? `0${currentEndMinutes}` : currentEndMinutes}:00`)

                                if (isTimeRangeOverlap(startDate, endDate, currentStartDate, currentEndDate)) {
                                    console.log("class: " + classType.name + " - " + classType.startTime)
                                    setIsOverLap(true)
                                }else {
                                    setIsOverLap(false);
                                }
                            }
                        }
                    }
                }else {
                    const currentStartDate = new Date(parseInt(course.startDate.split("-")[2]), parseInt(course.startDate.split("-")[1]) - 1, parseInt(course.startDate.split("-")[0]))
                    let startDate = new Date(parseInt(classType.startDate.split("-")[2]), parseInt(classType.startDate.split("-")[1]) - 1, parseInt(classType.startDate.split("-")[0]))
                    for (let i = 0; i < classType.totalSession; i++) {
                        startDate.setDate(startDate.getDate() + i * 7);
                        if (isSameDate(startDate, currentStartDate)) {
                            const startHour = parseInt(classType.startTime.split(":")[0]);
                            const startMinutes = parseInt(classType.startTime.split(":")[1]);
                            let endHour = parseInt(classType.duration / 60) + startHour;
                            const endMinutes = ((parseInt(classType.duration % 60) + startMinutes === 60) ? 0 : parseInt(classType.duration % 60) + startMinutes);
                            const currentStartHour = parseInt(course.startTime.split(":")[0]);
                            const currentStartMinutes = parseInt(course.startTime.split(":")[1]);
                            let currentEndHour = parseInt(course.duration / 60) + currentStartHour;
                            const currentEndMinutes = ((parseInt(course.duration % 60) + currentStartMinutes === 60) ? 0 : parseInt(course.duration % 60) + currentStartMinutes);

                            const startDate = new Date(`2023-07-05T${startHour}:${(startMinutes < 10) ? `0${startMinutes}` : startMinutes}:00`)
                            const endDate = new Date(`2023-07-05T${endHour}:${(endMinutes < 10) ? `0${endMinutes}` : endMinutes}:00`)
                            const currentStartDate = new Date(`2023-07-05T${currentStartHour}:${(currentStartMinutes < 10) ? `0${currentStartMinutes}` : currentStartMinutes}:00`)
                            const currentEndDate = new Date(`2023-07-05T${currentEndHour}:${(currentEndMinutes < 10) ? `0${currentEndMinutes}` : currentEndMinutes}:00`)

                            if (isTimeRangeOverlap(startDate, endDate, currentStartDate, currentEndDate)) {
                                console.log("class: " + classType.name + " - " + classType.startTime)
                                setIsOverLap(true)
                            }else {
                                setIsOverLap(false);
                            }
                        }
                    }
                }

            }
        })
    }, [teacherClass, course.startDate, time])

    function isTimeRangeOverlap(startA, endA, startB, endB) {
        return (startA <= endB) && (endA >= startB);
    }

    function isSameDate(date1, date2) {
        const year1 = date1.getFullYear();
        const month1 = date1.getMonth();
        const day1 = date1.getDate();

        const year2 = date2.getFullYear();
        const month2 = date2.getMonth();
        const day2 = date2.getDate();

        return year1 === year2 && month1 === month2 && day1 === day2;
    }

    const handleTimeChange = (selectedTime) => {
        setCourse((prevInfo) => ({
            ...prevInfo,
            startTime: selectedTime
        }))
        setTime(selectedTime);
    }

    const onCourseInfoChange = (e) => {

        const {name, value} = e.target;
        setCourse((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
    }

    const TeachingLevelBuilder = ({level}) => {
        const onSelectedHandle = () => {
            axios.get(`${process.env.REACT_APP_API_URL}api/curriculum/lesson?name=${level.name}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                setLessons(res.data);
            }).catch(err => {
                console.log(err);
            });
            setSelectedTeachingLevel(level.name);
            setIsSelectingLevel(false);
            setSelectedTeacher('')
        }

        return <div onClick={onSelectedHandle} className="hover:bg-gray-100 px-4 py-2 rounded-b-xl">
            <label>{level.name}</label>
        </div>
    }

    const TeacherBuilder = ({teacher, teacherId}) => {
        const onTeacherSelected = () => {
            setIsSelectingTeacher(false);
            setSelectedTeacher(teacher.name)
            setCourse((prevInfo) => ({
                ...prevInfo,
                teacherId: teacherId
            }));

            axios.get(`${process.env.REACT_APP_API_URL}api/teacher/class-type?id=${teacherId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                setTeacherClass(res.data);
            }).catch(err => {
                console.log(err);
            });
        }

        return <div onClick={onTeacherSelected} className="hover:bg-gray-100 px-4 py-2 rounded-b-xl">
            <label>{teacher.name}</label>
        </div>
    }

    function monthNameToNumber(dateTime) {
        const date = new Date(dateTime);
        return `${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getFullYear()}`;
    }

    const selectingDateEnd = (e) => {
        const dateTime = e.toString().split(" ");
        setIsSelectedDate(false);
        setCourse((prevInfo) => ({
            ...prevInfo,
            startDate: monthNameToNumber(dateTime[1] + " " + dateTime[2] + ", " + dateTime[3])
        }))

    }

    const selectingDateStart = () => {
        setIsSelectedDate(true)
    }

    const addCourseHandle = () => {
        if (!isUpdate) {
            axios.post(`${process.env.REACT_APP_API_URL}api/class-type`, course, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                window.location.reload();
            });
            setIsAddCourse(false);
        }else {
            axios.put(`${process.env.REACT_APP_API_URL}api/class-type`, course, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.ocean_education_token,
                }
            }).then(res => {
                // window.location.reload();
            });
            setIsAddCourse(false);
            setIsUpdate(false);
        }
        setCourse({
            "name": "",
            "classCode": "",
            "dateOfWeek": 1,
            "startDate": "",
            "teacherId": 0,
            "startTime": "",
            "duration": 0,
            "totalSession": 1
        })
    }

    useEffect(() => {
        setCourse(prevInfo => ({...prevInfo, "classLessons": selectedLessons}))
    }, [selectedLessons])

    useEffect(() => {
        setCourse(prevInfo => ({...prevInfo, "studentIds": selectedStudents}))
    }, [selectedStudents])

    const RowBuilder = ({lesson, idx}) => {

        return <tr  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{idx + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">{lesson.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{lesson.fileId}</td>
            <td className="whitespace-nowrap px-6 py-4">Lop {lesson.classType}</td>
            <td className="whitespace-nowrap px-6 py-4"><input onChange={(e) => {
                if (e.target.checked) {
                    setSelectedLessons(prevArr =>[...prevArr, lesson.id]);
                }else {
                    setSelectedLessons(prevArr => prevArr.filter(item => item !== lesson.id));
                }
            }} checked={selectedLessons.includes(lesson.id)} type={"checkbox"}/></td>
        </tr>
    }

    const onStudentSearching = (e) => {
        setSelectedStudent(e.target.value);
        const arr = students.filter(student => (student.name.toLowerCase().includes(e.target.value.toLowerCase()) || student.phone.includes(e.target.value)))
        setFilteredStudents(arr);
    }

    const StudentRowBuilder = ({student, idx}) => {
        return <tr  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{idx + 1}</td>
            <td className="whitespace-nowrap px-6 py-4">{student.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{student.phone}</td>
            <td className="whitespace-nowrap px-6 py-4">{student.dateOfBirth}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <div onClick={() => {
                    setSelectedStudents(prevStudent => prevStudent.filter(studentPrev => studentPrev !== student.id))
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </div>
            </td>
        </tr>
    }


    return <div className="fixed inset-0 flex items-center justify-center opacity-100 ">
        <div className="w-4/5 h-screen overflow-auto bg-gray-50 border-2 border-gray-400 p-2 rounded-xl flex flex-col gap-4 relative pb-10 mt-10 mb-10 ">
            <div className="w-full flex flex-row justify-center text-3xl font-bold">
                <label>Form Tao Khoa Hoc</label>
            </div>
            <div>
                <div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Ten Khoa Hoc
                            </label>
                        </div>
                        <div className="w-1/2 border-2 border-gray-300 rounded-xl">
                            <input onChange={onCourseInfoChange}  className="w-full h-full p-3 text-lg bg-gray-200 rounded-xl" value={course.name} name={"name"} placeholder={"Ten Khoa Hoc"} type={"text"} style={{outline: 'none'}} />
                        </div>
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Ma Lop Hoc
                            </label>
                        </div>
                        <div className="w-1/4 border-2 border-gray-300 rounded-xl">
                            <input onChange={onCourseInfoChange}  className="w-full h-full p-3 text-lg bg-gray-200 rounded-xl" value={course.classCode} name={"classCode"} placeholder={"Ma Lop Hoc"} type={"text"} style={{outline: 'none'}} />
                        </div>
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Ngay Khai Giang
                            </label>
                        </div>
                        <div onClick={selectingDateStart} className=" w-3/5">
                            <div className="border-2 rounded-xl w-1/2">
                                <input onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={course.startDate} type="text" style={{outline: 'none'}}/>
                            </div>
                            {isSelectedDate ? <div className={`fixed z-10`}>
                                <Calendar dateDisplayFormat={"MMM d, yyyy"} onChange={selectingDateEnd}  ranges={dateRange}/>
                            </div>: null}
                        </div>
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Bo Cong Cu
                            </label>
                        </div>
                        <div className=" w-4/5 ">
                            <div onClick={() => setIsSelectingLevel(true)} className="border-2 rounded-xl ">
                                <input onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={selectedTeachingLevel}  type="text" style={{outline: 'none'}}/>
                            </div>
                            {isSelectingLevel ? <div className="fixed z-10 border-2 border-gray-200 bg-white w-fit mt-3 rounded-xl">
                                {teachingLevels.map((level, index) => <TeachingLevelBuilder key={index} level={level}   />)}
                            </div> : null}
                        </div>
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Giao Vien
                            </label>
                        </div>
                        <div className=" w-1/5 ">
                            <div onClick={() => setIsSelectingTeacher(true)} className="border-2 rounded-xl ">
                                <input  onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={selectedTeacher}  type="text" style={{outline: 'none'}}/>
                            </div>
                            {isSelectingTeacher ? <div className="fixed z-10 border-2 border-gray-200 bg-white w-fit mt-3 rounded-xl">
                                {teachers.map((teacher, index) => <TeacherBuilder key={index} teacher={teacher} teacherId={teacher.id}  />)}
                            </div> : null}
                        </div>
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Gio Bat Dau
                            </label>
                        </div>
                        <div>
                            <TimePicker
                                onChange={handleTimeChange}
                                value={time}
                                format="HH:mm"
                                disableClock
                            />
                        </div>
                        {isOverLap ? <div className="text-lg text-red-700">
                            <label>Khung gio bi trung voi lop </label>
                        </div> : null}
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                Thoi gian giang day (phut)
                            </label>
                        </div>
                        <div className="w-1/4 border-2 border-gray-300 rounded-xl">
                            <input onChange={onCourseInfoChange}  className="w-full h-full p-3 text-lg bg-gray-200 rounded-xl" value={course.duration} name={"duration"} placeholder={"Thoi gian giang day"} type={"number"} min={1} style={{outline: 'none'}} />
                        </div>
                    </div>
                    <div className="flex gap-5 items-center p-2">
                        <div>
                            <label>
                                So buoi hoc
                            </label>
                        </div>
                        <div className="w-1/4 border-2 border-gray-300 rounded-xl">
                            <input onChange={onCourseInfoChange}  className="w-full h-full p-3 text-lg bg-gray-200 rounded-xl" value={course.totalSession} name={"totalSession"} placeholder={"Thoi gian giang day"} type={"number"} min={1} style={{outline: 'none'}} />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center text-3xl font-bold mt-10 mb-10">
                    <div className="text-center mb-10 flex flex-col justify-center items-center gap-6">
                        <div className="flex justify-center gap-5 items-center ">
                            <label>Bai Hoc</label>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Ten Bai Hoc</th>
                                                <th scope="col" className="px-6 py-4">Ma file</th>
                                                <th scope="col" className="px-6 py-4">Doi tuong</th>
                                                <th scope="col" className="px-6 py-4">Chon</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {lessons.map((lesson, index) => <RowBuilder idx={index} lesson={lesson} />)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center text-3xl font-bold mt-10 mb-10">
                    <div className="text-center mb-10 flex flex-col justify-center items-center gap-6 relative">
                        <div className="flex justify-center gap-5 items-center ">
                            <label>Danh sach hoc sinh</label>
                        </div>
                        <div className="w-full">
                            <div className="flex items-center gap-5 w-full justify-center">
                                <div onClick={() => {
                                    setIsSelectingStudents(true)
                                }} className="border-2 w-1/3 border-gray-300 rounded-xl text-lg font-normal ">
                                    <input
                                        onChange={onStudentSearching}
                                        className="bg-transparent px-4 py-0.5 w-full" value={selectedStudent} type={"text"} style={{outline: 'none'}}/>
                                </div>
                                <div onClick={() => {
                                    if (selectedStudentId !== -1) {
                                        setSelectedStudents(prevStudents => [...prevStudents, selectedStudentId]);
                                        setSelectedStudentId(-1);
                                        setSelectedStudent('')
                                        setIsSelectingStudents(false)
                                    }else {
                                        setIsSelectingStudents(false)
                                    }
                                }} className="text-lg font-normal bg-blue-100 p-1.5 rounded-xl cursor-pointer hover:bg-gray-100 active:bg-gray-400">
                                    <div>
                                        Them Hoc sinh
                                    </div>
                                </div>
                            </div>
                            {isSelectingStudent ? <div  className="absolute z-10 bg-white border-2 left-64 border-gray-200 w-1/2 mt-3.5 rounded-lg text-lg font-normal">
                                {filteredStudents.map((student, index) => {
                                    if (!selectedStudents.includes(student.id)) {
                                        return <div  className="py-2 text-left px-4 hover:bg-gray-400 active:bg-gray-50 cursor-pointer">
                                            <div onClick={() => {
                                                setSelectedStudent(`${student.name} - ${student.phone}`)
                                                setIsSelectingStudents(false);
                                                setSelectedStudentId(student.id);
                                            }}>
                                                {`${student.name} - ${student.phone}`}
                                            </div>
                                        </div>
                                    }else {
                                        return  null
                                    }
                                })}
                            </div>: null}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light">
                                            <thead className="border-b font-medium dark:border-neutral-500">
                                            <tr>
                                                <th scope="col" className="px-6 py-4">#</th>
                                                <th scope="col" className="px-6 py-4">Ten Hoc Sinh</th>
                                                <th scope="col" className="px-6 py-4">So dien thoai</th>
                                                <th scope="col" className="px-6 py-4">Ngay thang nam sinh</th>
                                                <th scope="col" className="px-6 py-4"></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {allStudents.map((student, index) => {
                                                if (selectedStudents.includes(student.id)) {
                                                    return <StudentRowBuilder ke={index} student={student} idx={index} />
                                                } else {
                                                    return null
                                                }
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between ml-3 mr-3 mt-5">
                    <div onClick={addCourseHandle} className="cursor-pointer bg-purple-200 p-2 rounded-xl hover:bg-gray-300 active:bg-gray-500">
                        Them Khoa Hoc
                    </div>
                    <div onClick={() => {
                        setIsAddCourse(false);
                        setCourse(
                            {
                                "name": "",
                                "classCode": "",
                                "dateOfWeek": 1,
                                "startDate": "",
                                "teacherId": 0,
                                "startTime": "",
                                "duration": 0,
                                "totalSession": 1
                            }
                        )
                    }} className="cursor-pointer bg-purple-200 p-2 rounded-xl hover:bg-gray-300 active:bg-gray-500">
                        Cancel
                    </div>
                </div>
            </div>

        </div>
    </div>
}

export default CourseRegistrationForm;