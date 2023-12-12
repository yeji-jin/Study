import React, { useState , useEffect } from "react"; 
// import { dummy } from '../api/MovieDummy';
import Movie from '../Components/Movie';

export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w1280/";
const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';
const getPopularMovies = () => { 
    return `${BASE_URL}/movie/popular?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
};

function Movies() {
    const [popularMovies, setPopularMovies] = useState([]);

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
        fetchMovies();
      },[]);

      // console.log('##popularMovies',popularMovies)

    return (
        <div className="movies-container">
            {   
                popularMovies.map(item =>{
                return (
                    <Movie
                        key={item.title}
                        title={item.title}
                        poster_path={item.poster_path}
                        vote_average={item.vote_average}
                        releaseDate={item.releaseDate}
                        overview={item.overview}
                        genre_ids={item.genre_ids}
                        original_title={item.original_title}
                        id={item.id}
                    />
                )
                })
            }
        </div>
    );
}  
export default Movies;
  