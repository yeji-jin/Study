import React, { useEffect, useState } from "react"; 
import Movie from '../Components/Movie';

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';
const getPopularTv = () => {
    return `${BASE_URL}/tv/popular?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
};
function Tv() {
    
    const [popularTv, setPopularTv] = useState([]);
    useEffect(()=>{
        const fetchPopularTv = async ()=> {
            try {
              const response = await fetch(getPopularTv()); 
              if (!response.ok) {
                throw new Error('Failed to fetch tv');
              }
              const data = await response.json();
              setPopularTv(data.results.map(item => ({
                title: item.name,
                releaseDate: item.first_air_date,
                poster_path: item.poster_path,
                vote_count: item.vote_count,
                vote_average: item.vote_average,
                overview: item.overview,
                genre_ids: item.genre_ids,
                original_title: item.original_name,
                id: item.id 
              })));
            } catch (error) {
              console.error('Error fetching movies:', error);
            }      
          }
          fetchPopularTv();
    },[]);

  // console.log('popularTvpopularTvpopularTv', getPopularTv())
    return (
        <div className="movies-container">
             {popularTv.map(item => {
                return (
                    <Movie key={item.title}
                      title={item.title}
                      poster_path={item.poster_path}
                      vote_average={item.vote_average}
                      releaseDate={item.releaseDate}
                      overview={item.overview}
                      genre_ids={item.genre_ids}
                      original_title={item.original_title}
                      id={item.id}/>
                )
             })}
        </div>
    );
}  
export default Tv;
  