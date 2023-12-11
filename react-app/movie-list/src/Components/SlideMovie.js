import React, { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280";

function SlideMovie(props) {

    const navigater = useNavigate();
    const onClickMoiveItem = ()=>{
        navigater(`/movie/${props.title}`,{
            state: props
        });
        window.scrollTo(0,0);
    }

    return (
        <div className="slide-movie-item" onClick={onClickMoiveItem}>
            <div className="movie-thumb">
                <img src={`${IMG_BASE_URL+props.poster_path}`} alt={`영화 ${props.title} 포스터`}/>
            </div>
            <div className="movie-info">
                <h4>{props.title}</h4>
                <span>{props.vote_average ? `⭐️ ${props.vote_average.toFixed(1)}` : '⭐️ -'}</span>
            </div>
        </div>
    );
}  
export default SlideMovie;
  