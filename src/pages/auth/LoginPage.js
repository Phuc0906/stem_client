import React, {useEffect, useState} from "react";
import logo from '../../components/assets/ocean-edu-logo.jpg'
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from 'react-auth-kit';

const LoginPage = ({setIsLogin}) => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
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

    const onLoginHandle = () => {
        axios.post(`${process.env.REACT_APP_API_URL}api/auth/authenticate`, {
            email: email,
            password: password
        }).then(res => {
            setIsLogin(true);
            localStorage.ocean_education_token = res.data.accessToken
            localStorage.ocean_education_software_user_email = email;
            localStorage.ocean_education_software_user_role = res.data.role;

            if (res.data.reset === 1) {
                navigate('/change-password');
                window.location.reload();
                return;
            }else {
                signIn({
                    token: res.data.accessToken,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: {email: email}
                });
            }

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
            alert("Sai ten dang nhap hoac mat khau")
        })
    }



    return <div className="w-screen h-screen flex flex-col bg-gray-50 absolute z-10">
        <div className="mr-auto ml-auto bg-transparent mt-auto mb-auto flex flex-col items-center w-1/2 flex-col items-center ">
            <div className="w-36 h-36">
                <img className="w-full h-full" src={logo} />
            </div>
            <label className="mt-5 text-4xl font-bold">Đăng nhập</label>
            <div className="mt-6 w-1/2 rounded-xl">
                <input onChange={(e) => {
                    setEmail(e.target.value)
                }} type={"email"} value={email} className="w-full h-full bg-gray-200 p-4 rounded-xl text-xl focus:border-2 focus:border-purple-400 transition-colors peer " placeholder={"Email "} style={{outline: 'none'}} />
            </div>
            <div className="mt-6 w-1/2 rounded-xl ">
                <input onChange={(e) => {
                    setPassword(e.target.value)
                }} type={"password"} value={password} className="w-full h-full bg-gray-200 p-4 rounded-xl text-xl focus:border-2 focus:border-purple-400 transition-colors peer " placeholder={"Mật Khẩu "} style={{outline: 'none'}} />
            </div>
            <div onClick={onLoginHandle} className="w-1/2 mx-8 mt-3 flex justify-center">
                <div className="text-xl font-bold p-2 bg-red-400 w-full text-center rounded-xl cursor-pointer hover:bg-gray-100 active:bg-red-300">
                    Đăng nhập
                </div>
            </div>
        </div>
    </div>
}

export default LoginPage;