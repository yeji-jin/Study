import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w154";
const getTopRatedMovies = () => { 
    return `${BASE_URL}/movie/top_rated?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
};
export default function Search() {

  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigater = useNavigate();
  
  const onSearchKeyword = (e)=>{
      e.preventDefault(); 
      navigater(`/search?query=${searchValue}`,{
        state: searchValue
    });
  }
  const onClickMoiveItem = (item)=>{
    console.log(item)
      navigater(`/movie/${item.title}`,{
          state: item
      });
      window.scrollTo(0,0);
  }

  useEffect(()=>{
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch(getTopRatedMovies()); 
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setTopRatedMovies(data.results.map(item => ({
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
    fetchTopRatedMovies();
  },[]);

  return (
    <div className='search-container'>
      <h3 className='search-inner__title search-nav__title'>Quick Menu</h3>
      <nav className='search-nav'>
        <ul>
          <li>
            <Link className="search-nav-item" to="/movie">
              영화
            </Link>
          </li>
          <li>
            <Link className="search-nav-item" to="/tv">
              TV 프로그램
            </Link>
          </li>
          <li>
            <Link className="search-nav-item" to="/genres">
              장르
            </Link>
          </li>
          <li>
            <Link className="search-nav-item" to="/mylist">
              내가 찜한 컨텐츠
            </Link>
          </li>
        </ul>
      </nav>
      <div className='search-box'>
        <div className='search-inner'>
          <form onSubmit={onSearchKeyword}>
            <button type='button'
              onClick={onSearchKeyword}>
              <svg fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem">
                <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
              </svg>
            </button>
            <input 
              type='text' 
              placeholder='제목, 장르, 배우로 찾아보세요'
              value={searchValue}
              onChange={(e)=> setSearchValue(e.target.value)}/>
          </form>
        </div>
      </div>
      <div className='search-recommend-movies'>
        <h3 className='search-inner__title'>평점높은 영화</h3>
        <ul>
          {
            topRatedMovies.map(item => {
              return (
                <li key={item.title}
                  onClick={()=> onClickMoiveItem(item)}>
                  <div className="movie-thumb">
                    <img src={`${IMG_BASE_URL+item.poster_path}`} alt={`영화 ${item.title} 포스터`}/>
                  </div>
                  <span className='search-movie__title'>{item.title}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}