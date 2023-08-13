import React from "react";

const Test = () => {
    const requestBluetooth = async () => {
        try {
            const device = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['heart_rate'] }], // Replace with your desired service
            });

            // Do something with the connected device, e.g., display information
            console.log('Device:', device);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return <div className={`pl-5 pt-10 pr-5 w-full right-20 fixed left-28 relative h-screen overflow-auto`}>
        <button className="absolute right-20" onClick={requestBluetooth}>Press for bluetooth</button>
        <div className="w-screen h-screen mr-10 pr-10">
            <iframe src={"http://localhost:8601/"} className="h-full w-full"/>
        </div>
    </div>
}

export default Test;
