'use client'

import React, { useEffect, useState } from 'react';
import TrainIcon from '@mui/icons-material/Train';
import BedIcon from '@mui/icons-material/Bed';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Image from "next/image";
import '../app/styles/home.css';

const Homepage = () => {
    const [numberOfRooms, setNumberOfRooms] = useState(0);
    const [numberOfStaff, setNumberOfStaff] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/home');
                const data = await response.json();
                setNumberOfRooms(data.roomCount);
                setNumberOfStaff(data.staffCount);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        //ถ้าไม่ได้ล็อคอินจะ redirect ไปหน้าล็อคอิน
        sessionStorage.getItem('loggedIn');
        const items = sessionStorage.getItem('loggedIn');
        if(items != 'true'){
            window.location.href = "http://localhost:3000/pages/login";
        }

    fetchData();
}, []);

return (
    <>
        <Image src={"/images/backgrounds/homepagehos.png"} alt="img" width="1600" height="380" />
        {loading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>{error}</div>
        ) : (
            <div className="box-container">
                <div className="box1">
                    <TrainIcon sx={{ fontSize: '50px' }} />
                    <h2>30 เมตรจาก BTS พญาไท</h2>
                </div>
                <div className="box2">
                    <BedIcon sx={{ fontSize: '50px' }} />
                    <h2>มีห้องว่างทั้งหมด {numberOfRooms} ห้อง</h2>
                </div>
                <div className="box3">
                    <LocalHospitalIcon sx={{ fontSize: '50px' }} />
                    <h2>มีแพทย์กว่า {numberOfStaff} คน</h2>
                </div>
                <div className="box4">
                    <h2>เปิดบริการ 24 ชั่วโมง</h2>
                </div>
            </div>
        )}
    </>
);
};

export default Homepage;
