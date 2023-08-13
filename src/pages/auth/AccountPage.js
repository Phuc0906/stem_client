import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const [isPhone, setIsPhone] = useState(false);
    const location = useLocation();
    const [isEnterprise, setIsEnterprise] = useState(location.state.enterprise);
    const [appUser, setAppUser] = useState({
        "name":"",
        "address":"",
        "email":"",
        "phone":"",
        "role":"",
        "taxNumber":null
    });


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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/user/account`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            console.log(res.data);
            setAppUser(res.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const onUpdateHandle = () => {
        console.log(appUser);
        axios.put(`${process.env.REACT_APP_API_URL}api/user/account`, appUser ,{
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.ocean_education_token,
            }
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleInputChange = (field, value) => {
        setAppUser(prevUser => ({
            ...prevUser,
            [field]: value,
        }));
    };

    return <div className={`pl-5 pt-10 pr-5 w-full ${!isPhone ? 'fixed left-28 ' : ''}  overflow-auto h-screen overflow-auto`}>
        <div>
            <div>
                <label className="text-xl font-bold rounded-2xl">Tên Giáo Viên</label>
                <div className="bg-gray-100 w-1/4">
                    <input onChange={(e) => {
                        handleInputChange('name', e.target.value);
                    }} className="bg-transparent p-2.5 rounded-2xl" value={appUser.name} style={{outline: 'none'}} placeholder={"Họ Tên Giáo "}/>
                </div>
            </div>
            <div className=" mt-5">
                <label className="text-xl font-bold rounded-2xl">Email</label>
                <div className="bg-gray-100 w-1/4">
                    <input onChange={(e) => {
                        handleInputChange('email', e.target.value);
                    }} className="bg-transparent p-2.5 rounded-2xl" value={appUser.email} style={{outline: 'none'}} placeholder={"Email"}/>
                </div>
            </div>
            <div className=" mt-5">
                <label className="text-xl font-bold rounded-2xl">Địa Chỉ</label>
                <div className="bg-gray-100 w-1/4">
                    <input onChange={(e) => {
                        handleInputChange('address', e.target.value);
                    }} className="bg-transparent p-2.5 rounded-2xl" value={appUser.address} style={{outline: 'none'}} placeholder={"Địa Chỉ"}/>
                </div>
            </div>
            <div className=" mt-5">
                <label className="text-xl font-bold rounded-2xl">Số Điện Thoại</label>
                <div className="bg-gray-100 w-1/4">
                    <input onChange={(e) => {
                        handleInputChange('phone', e.target.value);
                    }} className="bg-transparent p-2.5 rounded-2xl" value={appUser.phone} style={{outline: 'none'}} placeholder={"Số Điện Thoại"}/>
                </div>
            </div>
            {(isEnterprise) ? <div className=" mt-5">
                <label className="text-xl font-bold rounded-2xl">Mã Số Thuế</label>
                <div  className="bg-gray-100 w-1/4">
                    <input onChange={(e) => {
                        handleInputChange('taxNumber', e.target.value);
                    }} className="bg-transparent p-2.5 rounded-2xl" value={appUser.taxNumber} style={{outline: 'none'}} placeholder={"Mã Số Thuế"}/>
                </div>
            </div> : null}
            <div className=" mt-5">
                <div onClick={onUpdateHandle} className="cursor-pointer hover:bg-gray-50 active:bg-blue-500 py-2.5 px-4 bg-blue-200 w-fit rounded-full">
                    Cập nhật thông tin
                </div>
            </div>
        </div>
    </div>

}

export default AccountPage;