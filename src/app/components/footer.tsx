import React from 'react';
import '../styles/footer.css'; // Import CSS file for styling

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h2>About Us</h2>
            <p>
            ยินดีต้อนรับสู่โรงพยาบาลเรา
            ที่นี่เราให้บริการดูแลสุขภาพที่มีคุณภาพ
            </p>
            <p>
            ด้วยทีมแพทย์และบุคลากรที่มีความเชี่ยวชาญ
            เรามุ่งมั่นที่จะดูแลคุณอย่างเต็มที่
            </p>
            <p>
            เพื่อให้คุณกลับบ้านได้พร้อมกับความสุขและประทับใจ
            </p>
          </div>
          <div className="footer-section">
            <h2>Contact Us</h2>
            <p>หากคุณต้องการข้อมูลเพิ่มเติมหรือต้องการนัดหมาย:</p>
            <div className="contact-info">
              <p><strong>Phone:</strong> 099-999-999</p>
              <p><strong>Email:</strong> NimHospital@nimhos.com</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NimHospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
