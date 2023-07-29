import React, {useEffect, useState} from "react";
import axios from "axios";
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {da} from "date-fns/locale";
import TeacherRegistrationForm from "../../components/form/TeacherRegistrationForm"; // theme CSS file

const PeoplePage = () => {
    const [isPhone, setIsPhone] = useState(false);
    const [isTeacher, setIsTeacher] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [isAddPeople, setIsAddPeople] = useState(false);
    const [info, setInfo] = useState({
        "name": "",
        "address": "",
        "email": "",
        "phone": "",
        "role": "TEACHER",
        "gender": "",
        "dateOfBirth": "",
        "workingType": "",
        "enterprise": "Ocean Stem",
        "curriculum": "",
        "password": generateRandomString(12)
    });

    function generateRandomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters.charAt(randomIndex);
        }

        return result;
    }

    const [isUpdate, setIsUpdate] = useState(false);
    const [student, setStudents] = useState([]);
    const [loginInfo, setLoginInfo] = useState({});
    const [isLoginInfoShow, setIsLoginInfoShow] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/teacher`, {
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

        axios.get(`${process.env.REACT_APP_API_URL}api/student`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setStudents(res.data);
        })


    }, []);

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
    }, []);

    const onTeacherClick = () => {
        setIsTeacher(true);
    }

    const onStudentClick = () => {
        setIsTeacher(false);
    }

    const addHandle = () => {
        setIsAddPeople(!isAddPeople);
        setInfo({
            "name": "",
            "address": "",
            "email": "",
            "phone": "",
            "role": "TEACHER",
            "gender": "",
            "dateOfBirth": "",
            "workingType": "",
            "enterprise": "Ocean Stem",
            "curriculum": "",
            "password": generateRandomString(12)
        })
        setLoginInfo({})
        setIsLoginInfoShow(false);
    }

    const RowBuilder = ({teacher, idx}) => {
        const onRowClickHandle = () => {
            setIsUpdate(true)
            setIsAddPeople(true)
            setInfo(teacher);
        }

        return <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{teacher.id}</td>
            <td className="whitespace-nowrap px-6 py-4">{teacher.name}</td>
            <td className="whitespace-nowrap px-6 py-4">{teacher.phone}</td>
            {isTeacher ? <td className="whitespace-nowrap px-6 py-4">{teacher.curriculum}</td>: null}
            <td className="whitespace-nowrap px-6 py-4">{teacher.email}</td>
            <td className="whitespace-nowrap px-6 py-4">{teacher.gender}</td>
            <td className="whitespace-nowrap px-6 py-4">{teacher.dateOfBirth}</td>
            {isTeacher ? <td className="whitespace-nowrap px-6 py-4">{teacher.workingType}</td> : null}
            {isTeacher ? <td className="whitespace-nowrap px-6 py-4"><div className="cursor-pointer bg-blue-200 w-fit px-3 py-1 rounded-xl hover:bg-blue-400 active:bg-blue-500">
                Reset
            </div></td> : null}
            <td className="whitespace-nowrap px-6 py-4"><div onClick={onRowClickHandle} className="cursor-pointer bg-orange-200 w-fit px-3 py-1 rounded-xl hover:bg-orange-400 active:bg-orange-500">
                Update
            </div></td>
        </tr>
    }


    return <div className={`pl-5 pt-10 pr-5 w-5/6 ${!isPhone ? 'fixed left-28' : ''}  overflow-auto h-screen`}>
        <div className={`${isAddPeople ? 'opacity-50' : 'opacity-100'}`}>
            <div className="flex items-center justify-between">
                <div className="flex">
                    <div onClick={onTeacherClick} className={`w-fit pr-3 pl-3 pt-3 pb-2 transition duration-500 border-b-orange-200 border-b-2 ${isTeacher ? 'border-opacity-100' : 'border-opacity-0'}`}>
                        Giao Vien
                    </div>
                    <div onClick={onStudentClick} className={`w-fit pr-3 pl-3 pt-3 pb-2 transition duration-500 border-b-orange-200 border-b-2 ${!isTeacher ? 'border-opacity-100' : 'border-opacity-0'}`}>
                        Hoc Sinh
                    </div>
                </div>
                <div onClick={addHandle} className="bg-purple-300 p-1.5 rounded-xl hover:bg-purple-100 active:bg-purple-500">
                    <div >
                        <label>Them {isTeacher ? 'Giao Vien' : 'Hoc Sinh'}</label>
                    </div>
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
                                        <th scope="col" className="px-6 py-4">Ten</th>
                                        <th scope="col" className="px-6 py-4">So Dien Thoai</th>
                                        {isTeacher ? <th scope="col" className="px-6 py-4">Cap Bac</th>: null}
                                        <th scope="col" className="px-6 py-4">Email</th>
                                        <th scope="col" className="px-6 py-4">Gioi tinh</th>
                                        <th scope="col" className="px-6 py-4">Ngay thang nam sinh </th>
                                        {isTeacher ? <th scope="col" className="px-6 py-4">Phuong thuc lam viec</th>: null}
                                        {isTeacher ? <th scope="col" className="px-6 py-4">Reset Password</th>: null}
                                        <th scope="col" className="px-6 py-4">Chinh sua </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(isTeacher ? teachers.map((teacher, index) => <RowBuilder teacher={teacher} idx={index} key={index} />) : student.map((student, index) => <RowBuilder teacher={student} idx={index} key={index} />))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {isAddPeople ? <TeacherRegistrationForm setIsLoginInfoShow={setIsLoginInfoShow} setLoginInfo={setLoginInfo} setInfo={setInfo} info={info} isAddPeople={isAddPeople} setIsAddPeople={setIsAddPeople} isTeacher={isTeacher} setIsUpdate={setIsUpdate} isUpdate={isUpdate}/> : null}
        {isLoginInfoShow ? <div className="fixed inset-0 flex items-center justify-center">
            <div className="w-1/2 h-2/5 bg-gray-50 border-2 border-gray-400 p-2 rounded-xl flex flex-col gap-4 relative">
                <div className="text-xl font-bold p-4 text-center">
                    <label>Tai Khoan cua giao vien </label>
                </div>
                <div className="text-xl font-bold p-4 text-left">
                    <label>Email dang nhap: {loginInfo.email} </label>
                </div>
                <div className="text-xl font-bold p-4 text-left">
                    <label>Mat khau: {loginInfo.password}</label>
                </div>
                <div onClick={() => {
                    setIsLoginInfoShow(false);
                    window.location.reload();
                }} className="flex justify-center">
                    <div className="bg-blue-200 py-1.5 px-5 rounded-xl hover:bg-gray-200 active:bg-blue-500 cursor-pointer">
                        OK
                    </div>
                </div>
            </div>
        </div> : null}


    </div>
}

export default PeoplePage;