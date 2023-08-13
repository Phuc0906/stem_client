import React, {useEffect, useState} from "react";
import {Calendar} from "react-date-range";
import axios from "axios";
import {useLocation} from "react-router-dom";

const TeacherRegistrationForm = ({setIsAddPeople, isAddPeople, info, setInfo, isTeacher, isUpdate, setIsUpdate, setLoginInfo, setIsLoginInfoShow}) => {
    const location = useLocation();
    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [workingType,setWorkingType] = useState("");
    const [isSelectedDate, setIsSelectedDate] = useState(false);
    const [isSelectingWorkingType, setIsSelectingWorkingType] = useState(false);

    const [isInformationMissing, setIsMissing] = useState(false);
    const [isSelectingMale, setIsSelectingMale] = useState((isUpdate ? ((info.gender === 'Male') ? true : false) : false));
    const [isSelectingLevel, setIsSelectingLevel] = useState(false);
    const [levels, setLevels] = useState([]);


    useEffect(() => {

        axios.get(`${process.env.REACT_APP_API_URL}api/curriculum`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            setLevels(res.data);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });


    }, [])

    const selectingDateStart = () => {
        setIsSelectedDate(true)
    }



    const selectingDateEnd = (e) => {
        const dateTime = e.toString().split(" ");
        console.log(monthNameToNumber(dateTime[1] + " " + dateTime[2] + ", " + dateTime[3]))
        console.log(e);
        setIsSelectedDate(false);
        setInfo((prevInfo) => ({
            ...prevInfo,
            dateOfBirth: monthNameToNumber(dateTime[1] + " " + dateTime[2] + ", " + dateTime[3])
        }))

    }

    const LevelSelection = ({level, setInfo}) => {

        const onSelectHandle = () => {
            setInfo((prevInfo) => ({
                ...prevInfo,
                curriculum: level
            }))
            setIsSelectingLevel(false);
        }

        return <div onClick={onSelectHandle}  className="hover:bg-gray-100 px-4 py-2 rounded-b-xl">
            <label>{level}</label>
        </div>
    }


    const addTeacherHandle = () => {
        setIsUpdate(false);
        setIsMissing(false);
        if (!isUpdate) {
            if (isTeacher) {
                if ((info.name.length !== 0) && (info.workingType.length !== 0) && (info.curriculum.length !== 0) && (info.email.length !== 0) && (info.phone.length !== 0)) {
                    axios.post(`${process.env.REACT_APP_API_URL}api/auth/teacher/register`, info, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.ocean_education_token,
                        }
                    }).then(res => {
                        setIsLoginInfoShow(true);
                        setLoginInfo(res.data);

                    });
                    setIsAddPeople(!isAddPeople);
                }else {
                    setIsMissing(true);
                }
            }else {
                if ((info.name.length !== 0)  && (info.email.length !== 0) && (info.phone.length !== 0)) {
                    axios.post(`${process.env.REACT_APP_API_URL}api/student`, {
                        name: info.name,
                        address: info.address,
                        email: info.email,
                        phone: info.phone,
                        gender: info.gender,
                        dateOfBirth: info.dateOfBirth
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + localStorage.ocean_education_token,
                        }
                    }).then(res => {
                        window.location.reload();
                    });
                    setIsAddPeople(!isAddPeople);
                }else {
                    setIsMissing(true);
                }
            }
        }else {
            if (isTeacher) {
                if ((info.name.length !== 0) && (info.workingType.length !== 0) && (info.curriculum.length !== 0) && (info.email.length !== 0) && (info.phone.length !== 0)) {
                    console.log(info);
                    axios.put(`${process.env.REACT_APP_API_URL}api/teacher`, info).then(res => {
                        window.location.reload();
                    });
                    setIsAddPeople(!isAddPeople);
                }else {
                    setIsMissing(true);
                }
            }else {
                if ((info.name.length !== 0)  && (info.email.length !== 0) && (info.phone.length !== 0)) {
                    axios.put(`${process.env.REACT_APP_API_URL}api/student`, {
                        id: info.id,
                        name: info.name,
                        address: info.address,
                        email: info.email,
                        phone: info.phone,
                        gender: info.gender,
                        dateOfBirth: info.dateOfBirth
                    }).then(res => {
                        window.location.reload();
                    });
                    setIsAddPeople(!isAddPeople);
                }else {
                    setIsMissing(true);
                }
            }
        }

    }

    function monthNameToNumber(dateTime) {
        const date = new Date(dateTime);
        return `${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()}-${(date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getFullYear()}`;
    }

    const inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }))
    };


    return <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-1/2 h-4/5 bg-gray-50 border-2 border-gray-400 p-2 rounded-xl flex flex-col gap-4 relative">
            <div className="w-full flex flex-row justify-center text-3xl font-bold">
                <label>Form Đăng ký giáo viên</label>
            </div>
            <div className="flex gap-4 items-center pl-5 pr-8 justify-between">
                <label>Tên {(isTeacher) ? 'Giáo Vien' : 'Học Sinh'} <span>*</span></label>
                <div className="w-3/5 border-2 border-gray-200 rounded-xl">
                    <input onChange={inputHandleChange} className="bg-transparent w-full h-full p-2" name={"name"} type={"text"} value={info.name} style={{outline: 'none'}}  />
                </div>

            </div>

            <div className="flex gap-4 items-center pl-5 pr-8 justify-between">
                <label>Địa chỉ </label>
                <div className="w-3/5 border-2 border-gray-200 rounded-xl">
                    <input onChange={inputHandleChange} className="bg-transparent w-full h-full p-2" name={"address"} type={"text"} value={info.address} style={{outline: 'none'}}  />
                </div>
            </div>

            <div className="flex gap-4 items-center pl-5 pr-8 justify-between">
                <label>Email <span>*</span> </label>
                <div className="w-3/5 border-2 border-gray-200 rounded-xl">
                    <input onChange={inputHandleChange} className="bg-transparent w-full h-full p-2" name={"email"} type={"email"} value={info.email} style={{outline: 'none'}}  />
                </div>
            </div>
            <div className="flex gap-4 items-center pl-5 pr-8 justify-between">
                <label>Số Điện Thoại <span>*</span> </label>
                <div className="w-3/5 border-2 border-gray-200 rounded-xl">
                    <input onChange={inputHandleChange} className="bg-transparent w-full h-full p-2" name={"phone"} type={"number"} value={info.phone} style={{outline: 'none'}}  />
                </div>
            </div>
            <div className="flex w-full items-center justify-between pl-5 pr-8">
                <label>Giới Tính</label>
                <div className=" w-4/5 ">
                    <div className="flex w-fit gap-4 items-center">
                        <input onChange={(e) => {
                            if (e.target.checked) {
                                setIsSelectingMale(true);
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    gender: "Male"
                                }))
                            }else {
                                setIsSelectingMale(false)
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    gender: "Female"
                                }))
                            }
                        }} className="w-full h-full bg-transparent p-2" checked={isSelectingMale} type="checkbox" style={{outline: 'none'}}/>
                        <label>Nam</label>
                    </div>

                    <div className="flex w-fit gap-4 items-center">
                        <input onChange={(e) => {
                            console.log(e.target.checked);
                            if (e.target.checked) {
                                setIsSelectingMale(false);
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    gender: "Female"
                                }))
                            }else {
                                setIsSelectingMale(true)
                                setInfo((prevInfo) => ({
                                    ...prevInfo,
                                    gender: "Male"
                                }))
                            }
                        }} className="w-full h-full bg-transparent p-2" checked={!isSelectingMale} type="checkbox" style={{outline: 'none'}}/>
                        <label>Nữ</label>
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-between pl-5 pr-8">
                <label>Ngày Tháng Năm Sinh</label>
                <div onClick={selectingDateStart} className=" w-4/5">
                    <div className="border-2 rounded-xl w-1/2">
                        <input onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={info.dateOfBirth} type="text" style={{outline: 'none'}}/>
                    </div>
                    {isSelectedDate ? <div className={`fixed`}>
                        <Calendar dateDisplayFormat={"MMM d, yyyy"} onChange={selectingDateEnd}  ranges={dateRange}/>
                    </div>: null}
                </div>
            </div>
            {isTeacher ? <div className="flex w-full items-center justify-between pl-5 pr-8">
                <label>Hình Thức Làm Việc <span className="text-red-600">*</span></label>
                <div className=" w-4/5 ">
                    <div onClick={() => setIsSelectingWorkingType(true)} className="border-2 rounded-xl ">
                        <input  onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={info.workingType}  type="text" style={{outline: 'none'}}/>
                    </div>
                    {isSelectingWorkingType ? <div className="fixed  border-2 border-gray-200 bg-white w-fit mt-3 rounded-xl">
                        <div onClick={() => {
                            setWorkingType("Part Time")
                            setIsSelectingWorkingType(false);
                            setInfo((prevInfo) => ({
                                ...prevInfo,
                                workingType: "Part Time"
                            }))
                        }} className="hover:bg-gray-100 px-4 py-2 rounded-t-xl">
                            <label>Part time</label>
                        </div>
                        <div onClick={() => {
                            setWorkingType("Full Time")
                            setIsSelectingWorkingType(false);
                            setInfo((prevInfo) => ({
                                ...prevInfo,
                                workingType: "Full Time"
                            }))
                        }}  className="hover:bg-gray-100 px-4 py-2 rounded-b-xl">
                            <label>Full time</label>
                        </div>
                    </div> : null}
                </div>
            </div>: null}
            {isTeacher ? <div className="flex w-full items-center justify-between pl-5 pr-8">
                <label>Cấp Bậc <span className="text-red-600">*</span></label>
                <div className="w-4/5">
                    <div onClick={() => {setIsSelectingLevel(true)}} className="border-2 rounded-xl w-1/2">
                        <input onChange={(e) => {}} className="w-full h-full bg-transparent p-2" value={info.curriculum}  type="text" style={{outline: 'none'}}/>
                    </div>
                    {isSelectingLevel ? <div className="fixed  border-2 border-gray-200 bg-white w-fit mt-3 rounded-xl">
                        {levels.map((level, index) => <LevelSelection level={level.name} setInfo={setInfo} key={index} />)}
                    </div> : null}
                </div>
            </div>: null}
            {isInformationMissing ? <div className="text-center text-red-600">
                <label>Vui Lòng Điền Đầy Đủ Thông Tin</label>
            </div>: null}
            <div className="flex justify-between ml-3 mr-3 mt-5">
                <div onClick={addTeacherHandle} className="cursor-pointer bg-purple-200 p-2 rounded-xl hover:bg-gray-300 active:bg-gray-500">
                    {isUpdate ? '' : ((isTeacher ? 'Thêm Giáo Viên' : 'Thêm Học Sinh'))}
                </div>
                <div onClick={() => {
                    setIsAddPeople(false);
                    setIsUpdate(false);
                }} className="cursor-pointer bg-purple-200 p-2 rounded-xl hover:bg-gray-300 active:bg-gray-500">
                    Thoát
                </div>
            </div>

        </div>
    </div>
}

export default TeacherRegistrationForm;