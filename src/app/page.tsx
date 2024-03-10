'use client'
import React, { useEffect, useState } from 'react';
import TrainIcon from '@mui/icons-material/Train';
import BedIcon from '@mui/icons-material/Bed';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Image from "next/image";
import '../app/styles/home.css';

const Homepage = () => {
    const [roomCount, setRoomCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('http://localhost:3000/api/home');
                const data1 = await response1.json();
                setRoomCount(data1.roomCount);

                const response2 = await fetch('http://localhost:3000/api/home');
                const data2 = await response2.json();
                setStaffCount(data2.staffCount);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Image src={"/images/backgrounds/homepagehos.png"}  alt="img" width="1600" height="380" />
            <div className="box-container">
                <div className="box1">
                    <TrainIcon sx={{ fontSize: '50px'}}/>
                    <h2>30 เมตรจาก BTS พญาไท</h2>
                </div>
                <div className="box2">
                    <BedIcon sx={{ fontSize: '50px'}}/>
                    <h2>มีห้องทั้งหมด {roomCount} ห้อง</h2>
                </div>
                <div className="box3">
                    <LocalHospitalIcon sx={{ fontSize: '50px'}}/>
                    <h2>มีแพทย์กว่า {staffCount} คน</h2>
                </div>
                <div className="box4">
                    <h2>เปิดบริการ 24 ชั่วโมง</h2>  
                </div>
            </div>
        </>
    );
};

export default Homepage;
