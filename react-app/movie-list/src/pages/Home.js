import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import SlideMovie from '../Components/SlideMovie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';
const getPopularMovies = () => { 
    return `${BASE_URL}/movie/popular?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
};
const getNowPlayingMovies = () => {
    return `${BASE_URL}/movie/now_playing?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
}
const getUpCommingMovies = () => {
  return `${BASE_URL}/movie/upcoming?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
}

function Home() {
    
    const [popularMovies, setPopularMovies] = useState([]);
    const [upCommingMovies, setUpCommingMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies ] = useState([]);
    const [randomNum, setRandomNum] = useState(0);

    useEffect(()=>{
        const fetchMovies = async () => {
          try {
            const response = await fetch(getPopularMovies()); 
            if (!response.ok) {
              throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setPopularMovies(data.results.map(item => ({
              title: item.title,
              releaseDate: item.release_date,
              poster_path: item.poster_path,
              vote_count: item.vote_count,
              vote_average: item.vote_average,
              overview: item.overview,
              genre_ids: item.genre_ids,
              original_title: item.original_title,
              id: item.id 
            })));
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
        const fetchNowMovies = async () => {
          try {
            const response = await fetch(getNowPlayingMovies()); 
            if (!response.ok) {
              throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setNowPlayingMovies(data.results.map(item => ({
              title: item.title,
              releaseDate: item.release_date,
              poster_path: item.poster_path,
              vote_count: item.vote_count,
              vote_average: item.vote_average,
              overview: item.overview,
              genre_ids: item.genre_ids,
              original_title: item.original_title,
              id: item.id 
            })));
          } catch (error) {
            console.error('Error fetching movies:', error);
          }
        };
        const fetchUpCommingMovies = async ()=> {
          try {
            const response = await fetch(getUpCommingMovies()); 
            if (!response.ok) {
              throw new Error('Failed to upcooming movies');
            }
            const data = await response.json();
            setUpCommingMovies(data.results.map(item => ({
              title: item.title,
              releaseDate: item.release_date,
              poster_path: item.poster_path,
              vote_count: item.vote_count,
              vote_average: item.vote_average,
              overview: item.overview,
              genre_ids: item.genre_ids,
              original_title: item.original_title,
              id: item.id 
            })));
          } catch (error) {
            console.error('Error fetching upcooming movies:', error);
          }      
        }
        fetchMovies();
        fetchNowMovies();
        fetchUpCommingMovies();
        setRandomNum(Math.floor(Math.random() * 10));
      },[]);

    const allMovies = [
        [...popularMovies.slice(0, 10)],
        [...nowPlayingMovies.slice(0, 10)],
        [...upCommingMovies.slice(0, 10)],
    ];
    const moviesTitle = ['인기 영화', '상영중인 영화', '상영예정 영화'];
    const mainMovie = popularMovies[randomNum];
    const navigater = useNavigate();
    const onClickMoiveItem = ()=>{
        navigater(`/movie/${mainMovie.title}`,{
            state: mainMovie
        });
    }
    
    return (
        <>
            {/* recommend movies */}
            <article className="recommend-movie" 
                style={{ 
                position:'relative',
                height:'70vh',
                background:`linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0)), url(${IMG_BASE_URL}${mainMovie?.poster_path}) no-repeat center / cover`
                }}>
                <h2 className="movie-title">{mainMovie?.title}</h2>
                <p className="movie-ranking">오늘의 인기 영화 {randomNum + 1}위</p>
                <p className="movie-overview">{mainMovie?.overview}</p>
                <button 
                    className="btn-movie__detail"
                    onClick={onClickMoiveItem}>자세히 보기 &gt;</button>
            </article>
            {/* ---- recommend movies */}   

            {/* movies-container */}
            <div className="movies-container main">
                {allMovies.map((movieList, i) => (
                    <section className="movies-list" key={i}>
                        <div className="movies-header">
                            <h3 className="subject">{moviesTitle[i]}</h3>
                            <span>더 보러가기 &gt;</span>
                        </div>
                        <Swiper
                            className="slide-movie-container"
                            spaceBetween={20}
                            slidesOffsetBefore={40}
                            slidesOffsetAfter={40}
                            slidesPerView={'auto'}
                            navigation
                            modules={[Navigation]}>
                            {movieList.map((item, j) => (
                                <SwiperSlide key={j}>
                                    <SlideMovie
                                        title={item.title}
                                        poster_path={item.poster_path}
                                        vote_average={item.vote_average}
                                        releaseDate={item.releaseDate}
                                        overview={item.overview}
                                        genre_ids={item.genre_ids}
                                        original_title={item.original_title}
                                        id={item.id}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                ))}
            </div>
            {/* ---- movies-container */}
        </>
       
    );
}  
export default Home;
  