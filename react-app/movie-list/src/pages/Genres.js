import React,  { useState, useEffect } from "react"; 
import Movie from "../Components/Movie";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';

export const getGenreMovies = () => { 
    // return `${BASE_URL}/movie/35/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 애니메이션
    // return `${BASE_URL}/c/899082/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 판타지
    // return `${BASE_URL}/tv/84958/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 
    // return `${BASE_URL}/tv/210452/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 
    return `${BASE_URL}/movie/18/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`;  //액션
  }

function Genres() {
    
    const [recommendations, setRecommendations ] = useState([]);

    useEffect(()=>{
        const fetchGenreMovies = async ()=> {
            try {
                const response = await fetch(getGenreMovies()); // 실제 API URL로 교체
                if (!response.ok) {
                    throw new Error('Failed to fetch tv');
                }
                const data = await response.json();
                setRecommendations(data.results.map(item => ({
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
        }
        fetchGenreMovies();
    },[]);
    
    return (
        <section>
            <div className="movies-container">
                {recommendations.map(item => {
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

        </section>
    );
}  
export default Genres;
  