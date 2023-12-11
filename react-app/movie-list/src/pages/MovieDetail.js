import { React, useEffect, useState } from "react"; 
import { useLocation, useParams } from "react-router-dom";
import { IMG_BASE_URL } from "../Components/Movie";
import SimilarContent from "../Components/SimilarContent";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';

function MovieDetail() {

    const { title } = useParams();
    const { state } = useLocation();
    console.log(title, state);

    const movieGenre = state.genre_ids;
    const [similarContents, setSimilarContents] = useState([]);
    const [actors, setActors] = useState([]);
    const [movieDetail, setMovieDetail] = useState([]);
    const [wish, setWish] = useState([]);
    
    // 데이터 저장
    const saveToLocalStorage = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };
    // 데이터 가져오기
    const getFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };
    const [wishList, setWishList] = useState(getFromLocalStorage('wishList') || []);
    
    const checkWishMovie = () => {
      if(wishList.length >= 1){
        return wishList.some(movie => movie.title === state.title);
      }
    }

    const saveWishList = ()=> {
      setWish(!wish);
      if(wish){
        setWishList((prev) => [...prev, state]);
        saveToLocalStorage('wishList', [...wishList, state]);
      }else{ //storage remove
        const updatedWishList = wishList.filter(movie => movie.title !== state.title);
        saveToLocalStorage('wishList', updatedWishList);
      }
    }

    useEffect(()=>{
      const getActorsName = async () => { 
        try {
          const response = await fetch(`${BASE_URL}/movie/${state.id}/credits?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`);
          if (!response.ok) {
            throw new Error('Failed to fetch getActorsName');
          }
          const data = await response.json();
          setActors(data.cast.slice(0,8).map(item => ({
            name: item.name,
            profile_path: item.profile_path
          })));

        } catch (error) {
          console.error('Error fetching getActorsName:', error);
        }
      };
      const getMovieDetail = async () => {
        try {
          const response = await fetch(`${BASE_URL}/movie/${state.id}?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`);
          // const response = await fetch(`{BASE_URL}/tv/${state.genre_ids[0]}?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`)
          if (!response.ok) {
            throw new Error('Failed to fetch getMovieDetail');
          }
          const data = await response.json();
          setMovieDetail([
            {genres: data.genres},
            {tagline: data.tagline},
            {runtime: parseInt(data.runtime)}
          ]);
        } catch (error) {
          console.error('Error fetching getMovieDetail:', error);
        }
      };
      const getSimilarContents = async () => {
        try{
          const response = await fetch(`${BASE_URL}/movie/${movieGenre[0]}/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`);
          if (!response.ok) {
            throw new Error('Failed to fetch getSimilarContent');
          }
          const data = await response.json();
          setSimilarContents(data.results.map(item => ({
            title: item.title,
            releaseDate: item.release_date,
            poster_path: item.poster_path,
            vote_average: item.vote_average,
            overview: item.overview,
            genre_ids: item.genre_ids,
            original_title: item.original_title,
            id: item.id 
          })));
        }catch (error){
          console.error('Error fetching getSimilarContent:', error);
        }
      }
      state.id && getActorsName();
      state.id && getMovieDetail();
      movieGenre && getSimilarContents();
      checkWishMovie() ? setWish(false) : setWish(true);
  },[title]);
  // console.log('movieDetail', movieDetail);

    return (
        <div className="detail-container">
          <div className="movie-detail">
            <div className="movie-detail__thumb">
              <img src={IMG_BASE_URL + state.poster_path} alt={`영화 ${title}포스터`} />
            </div>
            <div className="movie-detail__info">
              <span className="original-title">{state.original_title}</span>
              <div className="movie-title">{title}</div>
              {movieDetail[1] && <strong className="movie-tagline">{movieDetail[1].tagline}</strong>}
              <div className="movie-sub__info">
                <div className="genre">
                  장르 🎬 : &nbsp; 
                  {
                    movieDetail[0] && movieDetail[0].genres.map((item, index) => (
                      <span key={index}>{item.name}</span>
                      ))
                    }
                </div>
                <p className="date">개봉날짜 🗓️ : &nbsp; {state.releaseDate}</p>
                <p className="average">평점 ⭐️ : &nbsp; {state.vote_average ? `${state.vote_average.toFixed(1)}` : '-'}</p>
                {
                  movieDetail[2] && <p>
                    상영시간 🕖 : &nbsp; 
                    {Math.floor(movieDetail[2].runtime / 60)} 시간 
                    {movieDetail[2].runtime % 60} 분
                  </p>
                }
                { state.overview && <p className="movie-overview">{state.overview}</p> }
              </div>
              
              <div className="actors-container">
                <h4>출연진</h4> 
                <div className="actors">
                  {
                    actors && actors.map((actor, i) => (
                      <div className="actor" key={i}>
                        <img src={IMG_BASE_URL + actor.profile_path} alt={`${actor.name} 프로필사진`}/>
                        <span className="actor-name">{actor.name}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
              
              <div className="btn-content__detail">
                <button type="button"
                  className="btn-wish"
                  onClick={()=> saveWishList()}>
                <svg viewBox="0 0 512 512" height="1.5rem" width="1.5rem" xmlns="http://www.w3.org/2000/svg">
                  {
                    wish ? 
                    <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>    
                    :
                    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                  }
                  
                </svg>
                좋아요
                </button>
                <button type="button"
                  className="btn-share">
                    공유하기
                </button>
              </div>
            </div>
          </div>

          {/* SimilarContent */}
          <SimilarContent similarContents = {similarContents}/>

        </div>
    );
}  
export default MovieDetail;
  