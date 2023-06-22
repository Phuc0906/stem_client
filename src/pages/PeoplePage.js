import React, {useEffect, useState} from "react";

const PeoplePage = () => {
    const [isPhone, setIsPhone] = useState(false);

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
    }, [])

    return <div className={`pl-5 pt-10 pr-5 w-full ${!isPhone ? 'fixed left-28' : ''}  overflow-auto h-screen overflow-auto`}>
        <div>
            <div className="bg-green-100">
                Giao Vien
            </div>
        </div>
    </div>
}

export default PeoplePage;