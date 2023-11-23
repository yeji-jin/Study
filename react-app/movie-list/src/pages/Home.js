import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import SlideMovie from '../Components/SlideMovie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280";

function Home(props) {
    
    const allMovies = [
        [...props.popularMovies.slice(0, 10)],
        [...props.popularTv.slice(0, 10)],
        [...props.nowPlayingMovies.slice(0, 10)]
    ];
    const moviesTitle = [
        '인기 영화',
        '인기 티비프로그램',
        '상영중인 영화'
    ];

    const randomNum = Math.floor(Math.random() * allMovies[0].length);
    const mainMovie = allMovies[0][randomNum];
    console.log('randomMovies', mainMovie );

    const navigater = useNavigate();
    const onClickMoiveItem = ()=>{
        navigater(`/movie/${mainMovie.title}`,{
            state: mainMovie
        });
    }


    return (
        <>
            {/* recommend movies */}
            <div className="recommend-movie" 
                onClick={onClickMoiveItem}
                style={{ 
                height:'75vh',
                background:`linear-gradient(rgba(0, 0, 0, 0), rgb(0, 0, 0)), url(${IMG_BASE_URL}${mainMovie?.poster_path}) no-repeat center / cover`}}>
                <h2 className="movie-title">{mainMovie?.title}</h2>
                <p className="movie-ranking">오늘의 인기 영화 {randomNum + 1}위</p>
                <p className="movie-overview">{mainMovie?.overview}</p>
                <button className="btn-movie__detail">자세히 보기 &gt;</button>
            </div>

            <div className="movies-container">
                {allMovies.map((movieList, i) => (
                    <section className="movies-list" key={i}>
                        <div className="movies-header">
                            <h3 className="subject">{moviesTitle[i]}</h3>
                            <span>더 보러가기 &gt;</span>
                        </div>
                        <Swiper
                            // key={i} 
                            className="slide-movie-container"
                            spaceBetween={20}
                            slidesOffsetBefore={40}
                            slidesOffsetAfter={40}
                            slidesPerView={'auto'}>
                            {movieList.map((item, j) => (
                                <SwiperSlide key={j}>
                                    <SlideMovie
                                        title={item.title}
                                        poster_path={item.poster_path}
                                        vote_average={item.vote_average}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                ))}
            </div>
        </>
       
    );
}  
export default Home;
  