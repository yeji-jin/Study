import React, { useEffect, useState } from "react"; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Genres from './pages/Genres';
import Tv from './pages/Tv';
import NotFound from './pages/NotFound';
import Header from './Components/Header';
import MovieDetail from './pages/MovieDetail';
import Footer from './Components/Footer';
import MyList from "./pages/MyList";
import SearchDetail from "./pages/searchDetail";
import SearchResult from "./pages/searchResult";


const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_LANG = 'ko';
const BASE_REGION = 'KR';

export const getPopularMovies = () => { //https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=ko-KR&page=1&region=KR-11
  return `${BASE_URL}/movie/popular?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
};
export const getPopularTv = () => {
  return `${BASE_URL}/tv/popular?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
};
export const getNowPlayingMovies = () => {
  return `${BASE_URL}/movie/now_playing?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
}
export const getTopRatedMovies = () => {
  return `${BASE_URL}/movie/top-rated?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
}
export const getUpCommingMovies = () => {
  return `${BASE_URL}/movie/upcoming?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`;
}
export const getPerson = () => {
  // 'https://api.themoviedb.org/3/search/company?query=netflix&page=1'
  // https://api.themoviedb.org/3/search/collection?include_adult=false&language=en-US&page=1'
  // api.themoviedb.org/3/company/{company_id}?api_key=<<api_key>>

  // https://api.themoviedb.org/3/person/popular?language=en-US&page=1

  // https://api.themoviedb.org/3/search/company?query=609681&page=1

  
  // return `${BASE_URL}/movie/{장르아이드 or 영화아이디}/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; //해리포터랑 비슷한거 추천

  // return `${BASE_URL}/movie/671?api_key=${TMDB_KEY}&language=${BASE_LANG}&region=${BASE_REGION}`; 
  return `${BASE_URL}/genre/movie/list?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; //장르
  
}
// Images SAMPLE
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
//https://image.tmdb.org/t/p/w1280/${backdrop_path": "/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",}
export const getImageUrl = (path, size = 400) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

// --test
function App() {

  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/movie' element={<Movies/>} />
          <Route path='/movie/:title' element={<MovieDetail/>} />
          <Route path='/tv' element={<Tv/>} /> 
          <Route path='/genres' element={<Genres/>} />
          <Route path='/mylist' element={<MyList/>} />
          <Route path='/search/detail' element={<SearchDetail/>} />
          <Route path='/search' element={<SearchResult/>} />
          <Route path='/*' element={<NotFound/>} /> 
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
