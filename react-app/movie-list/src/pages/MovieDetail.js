import React from "react"; 
import { useLocation, useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../Components/Movie";

function MovieDetail() {

    const { title } = useParams();
    const { state } = useLocation();

    console.log(title, state)

    return (
        <div className="page-container">
        <div style={{display: 'flex'}}>
          <img style={{width: '300px', height: '450px'}} src={IMG_BASE_URL + state.poster_path} alt={`영화 ${title}포스터`} />
          <div>
            <div style={{ fontSize: "32px" }}>{title}</div>
          </div>
        </div>
        </div>
    );
}  
export default MovieDetail;
  