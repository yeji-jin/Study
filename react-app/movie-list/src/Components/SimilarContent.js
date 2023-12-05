import React, { useEffect, useState } from "react"; 
import SlideMovie from '../Components/SlideMovie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export default function SimilarContent(props) {
  
    const SimilarContentList = props.similarContents.slice(0,10);
    return (
      <>
        {
          SimilarContentList.length > 0 && 
            <section className="recommend-similar-contents">
              <h3 className="contents-title">이 작품은 어떠세요? 비슷한 콘텐츠를 추천해드려요.</h3>
              <Swiper
                className="slide-movie-container"
                spaceBetween={20}
                slidesOffsetBefore={40}
                slidesOffsetAfter={40}
                slidesPerView={'auto'}
                navigation
                modules={[Navigation]}>
                {SimilarContentList.map((item, j) => (
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
        }
      </>
    );
  }