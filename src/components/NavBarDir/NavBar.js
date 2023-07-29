import React, {useState} from "react";
import logo from '../assets/ocean-edu-logo.jpg'
import {Link, useNavigate} from "react-router-dom";
import {useSignOut} from "react-auth-kit";

const NavBar = () => {
    const signOut = useSignOut();
    const [isRequireLogOut, setIsRequireLogOut] = useState(false);
    const navigate = useNavigate();

    return <div>
        <div className="w-fit bg-gray-100 h-screen fixed">
            <div className="m-2 bg-green-500">
                <img src={logo} alt={"logo"} className="w-20 h-20 mx-auto"/>
            </div>
            <div className="py-3 px-4 hover:bg-gray-400 hover:delay-75 hover:ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </div>
            <Link to="/" className="relative">
                <div className="py-3 px-4 hover:bg-gray-400 hover:delay-75 hover:ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                </div>
            </Link>
            <Link to="/calendar">
                <div className="py-3 px-4 hover:bg-gray-400 hover:delay-75 hover:ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                </div>
            </Link>
            <div className="py-3 px-4 hover:bg-gray-400 hover:delay-75 hover:ease-in-out">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
            </div>
            <div onClick={() => {
                setIsRequireLogOut(true)
            }} className="py-3 px-4 hover:bg-gray-400 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="currentColor" className="w-14 h-14">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
            </div>
        </div>
        {isRequireLogOut ? <div className={`z-10 pl-5 pt-10 pr-5 w-5/6 fixed left-28  overflow-auto h-screen w-screen flex items-center justify-center`}>
            <div className="bg-gray-200 w-1/5 h-1/5 text-center p-4 rounded-xl ">
                <label className="text-2xl font-bold">Ban co muon dang xuat</label>
                <div className="text-xl  mt-14 flex justify-center items-center gap-16">
                    <div onClick={() => {
                        signOut();
                        navigate('/login');
                        setIsRequireLogOut(false);
                        window.location.reload();

                    }} className="bg-blue-300 hover:bg-blue-400 active:bg-blue:600 cursor-pointer px-6 py-2 rounded-xl">
                        Co
                    </div>
                    <div onClick={() => {
                        setIsRequireLogOut(false);
                    }} className="bg-blue-300 hover:bg-blue-400 active:bg-blue:600 cursor-pointer px-6 py-2 rounded-xl">
                        Khong
                    </div>
                </div>
            </div>
        </div>: null}
    </div>
}

export default NavBar;