import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import Movie from '../Components/Movie';

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';

export default function SearchResult() {

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  console.log('searchQuery',searchQuery)
  
  let [page, setPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // const queryString = window.location.search;
    // const arr = queryString.split('=');
    // const query = arr[1];
    // console.log('query : ' + query);

    fetch(`${BASE_URL}/search/multi?api_key=${TMDB_KEY}&language=${BASE_LANG}&query=`+searchQuery+`&include_adult=false&page=`+page)
    // fetch(`${BASE_URL}/search/movie?api_key=${TMDB_KEY}&language=${BASE_LANG}&query=`+searchQuery+`&include_adult=false&page=`+page)
      .then(response => response.json())
      .then(response => setSearchResult(response))
      .catch(err => console.error(err));

  }, [searchQuery])

  return (
    <>
      {
        searchResult.results?.length ?
        // 검색결과 있음
        <div className="movies-container">
          {searchResult.results.map(item => {
            return (
              <Movie 
                key={item.title || item.name}
                title={item.title || item.name}
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
        : 
        // 검색결과 없음
        <div className='empty-container'>
          {
            searchQuery.length === 0 ? <>검색어를 입력해주세요.</> : <>"{searchQuery}" 검색결과가 없습니다.</>
          }
          
        </div>
      }
    </>
    

  );
}