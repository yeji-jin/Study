import React from "react"; 
import { Link, useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div>
            <h2 style={{
            marginTop: "64px",
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "32px",
            }}>해당 페이지를 찾지 못했습니다.</h2>
            <p>주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.</p>
            <div onClick={()=> navigate('/')}>메인페이지로 이동</div>
            {/* <Link to="/">메인페이지로 이동</Link> */}
        </div>
    );
}  
export default NotFound;
  