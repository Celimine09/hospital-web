import '../app/styles/home.css';

const Homepage = () => {
  
  return (
    <><nav className="navbar">
      <div className="navbar-links">
        <a href="#">จัดการข้อมูลคนไข้</a>
        <a href="#">จัดการข้อมูลบุคลากร</a>
        <a href="#">ดูห้องว่าง</a>
      </div>
    </nav><img className="img1" src="https://static.hd.co.th/system/hospitals/image2s/000/000/129/original/patrangsit-hospital-02.jpg" /><div className="box-container">
        <div className="box1"></div>
        <div className="box2"></div>
        <div className="box3"></div>
        <div className="box4"></div>
      </div></>
  );
};

export default Homepage;
