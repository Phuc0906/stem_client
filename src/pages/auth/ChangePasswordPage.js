import React, {useEffect, useState} from "react";
import {useIsAuthenticated, useSignIn} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import logo from "../../components/assets/ocean-edu-logo.jpg";
import axios from "axios";

const ChangePasswordPage = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [isConfirmMatch, setIsConfirmMatch] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        if (isAuthenticated()) {
            if (localStorage.ocean_software_role == 1) {
                navigate("/people");
            }else {
                navigate("/");
            }
            window.location.reload();
        }
    }, [])

    const onPasswordChangeHandle = () => {
        if (confirmPassword === password) {
            axios.post(`${process.env.REACT_APP_API_URL}api/auth/change-password`, {
                email: localStorage.ocean_education_software_user_email,
                password: currentPassword,
                newPassword: password
            }).then(res => {
                console.log(res);
                signIn({
                    token: res.data.accessToken,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: {email: localStorage.ocean_education_software_user_email}
                });

                if (res.data.role === "ENTERPRISE") {
                    navigate("/people");
                    localStorage.ocean_software_role = 1;
                } else if (res.data.role === "TEACHER") {
                    navigate("/");
                    localStorage.ocean_software_role = 0;
                } else {
                    navigate("/people");
                }
                window.location.reload();
            }).catch(err => {
                console.log(err);
                alert(err.response.data.message);
            })
        }else {
            setIsConfirmMatch(false);
        }
    }

    return <div className="w-screen h-screen flex flex-col bg-gray-50 absolute z-10">
        <div className="mr-auto ml-auto bg-transparent mt-auto mb-auto flex flex-col items-center w-1/2 flex-col items-center ">
            <div className="w-36 h-36">
                <img className="w-full h-full" src={logo} />
            </div>
            <label className="mt-5 text-4xl font-bold">Đổi mật khẩu</label>
            <div className="mt-6 w-1/2 rounded-xl">
                <input onChange={(e) => {
                    setCurrentPassword(e.target.value)
                }} type={"password"} value={currentPassword} className="w-full h-full bg-gray-200 p-4 rounded-xl text-xl focus:border-2 focus:border-purple-400 transition-colors peer " placeholder={"Mật khẩu hiện tại "} style={{outline: 'none'}} />
            </div>
            <div className="mt-6 w-1/2 rounded-xl ">
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} type={"password"} value={password} className="w-full h-full bg-gray-200 p-4 rounded-xl text-xl focus:border-2 focus:border-purple-400 transition-colors peer " placeholder={"Mật khẩu mới "} style={{outline: 'none'}} />
            </div>
            <div className="w-1/2">
                <div className="mt-6 w-full rounded-xl ">
                    <input onChange={(e) => {
                        setIsConfirmMatch(true);
                        setConfirmPassword(e.target.value)
                    }} type={"password"} value={confirmPassword} className="w-full h-full bg-gray-200 p-4 rounded-xl text-xl focus:border-2 focus:border-purple-400 transition-colors peer " placeholder={"Xác Nhận Mật Khẩu mới "} style={{outline: 'none'}} />
                </div>
                {!isConfirmMatch ? <div className="mt-1.5">
                    <label className="text-red-500">Mật khẩu không khớp</label>
                </div>: null}
            </div>
            <div className="w-1/2 mx-8 mt-3 flex justify-center">
                <div onClick={onPasswordChangeHandle} className="text-xl font-bold p-2 bg-red-400 w-full text-center rounded-xl cursor-pointer hover:bg-gray-100 active:bg-red-300">
                    Đổi mật khẩu
                </div>
            </div>
        </div>
    </div>
}

export default ChangePasswordPage;