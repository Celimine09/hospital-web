import Navbar from "@/app/components/navbar";
import { Typography } from "@mui/material";
import TrainIcon from '@mui/icons-material/Train';
import BedIcon from '@mui/icons-material/Bed';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import '../app/styles/home.css';
import Image from "next/image";

const Homepage = () => {
  
  return <>
      <Image src={"/images/backgrounds/homepagehos.png"}  alt="img" width="1600" height="380" />
      <div className = "box-container">
        <div className = "box1">
          <TrainIcon sx={{ fontSize: '50px'}}/>
          <h2>30 เมตรจาก BTS พญาไท</h2>
        </div>
        <div className = "box2">
          <BedIcon sx={{ fontSize: '50px'}}/>
          <h2>มีห้องทั้งหมด 100 ห้อง</h2>
        </div>
        <div className = "box3">
          <LocalHospitalIcon sx={{ fontSize: '50px'}}/>
          <h2>มีแพทย์กว่า 100 คน</h2>
        </div>
        <div className = "box4">
          <h2>เปิดบริการ 24 ชั่วโมง</h2>  
        </div>
    </div>
    </>
  
};

export default Homepage;