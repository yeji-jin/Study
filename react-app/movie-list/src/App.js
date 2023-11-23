import React, { useEffect, useState } from "react"; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Celebrity from './pages/Celebrity';
import Tv from './pages/Tv';
import NotFound from './pages/NotFound';
import Header from './Components/Header';
import MovieDetail from './pages/MovieDetail';
import Footer from './Components/Footer';
import MyList from "./pages/MyList";


// test
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

export const getGenreMovies = () => { 
  // return `${BASE_URL}/movie/35/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 애니메이션
  // return `${BASE_URL}/c/899082/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 판타지
  // return `${BASE_URL}/tv/84958/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 
  // return `${BASE_URL}/tv/210452/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`; 
  return `${BASE_URL}/movie/18/recommendations?api_key=${TMDB_KEY}&language=${BASE_LANG}-${BASE_REGION}`;  //액션
}

// Images SAMPLE
// https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
//https://image.tmdb.org/t/p/w1280/${backdrop_path": "/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",}
export const getImageUrl = (path, size = 400) => {
  return `https://image.tmdb.org/t/p/w${size}${path}`;
};

// --test
function App() {

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies ] = useState([]);
  const [recommendations, setRecommendations ] = useState([]);

  useEffect(()=>{
    // const movies = getPopularMovies();
    const person = getPerson();
    console.log('getGenreMovies',getGenreMovies())
    console.log('getPopularMovies',getPopularMovies())

    const fetchMovies = async () => {
      try {
        const response = await fetch(getPopularMovies()); // 실제 API URL로 교체
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        // console.log(data.results);
        setPopularMovies(data.results.map(item => ({
          title: item.title,
          releaseDate: item.release_date,
          poster_path: item.poster_path,
          vote_count: item.vote_count,
          vote_average: item.vote_average,
          overview: item.overview
        })));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    const fetchNowMovies = async () => {
      try {
        const response = await fetch(getNowPlayingMovies()); // 실제 API URL로 교체
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        console.log(data.results);
        setNowPlayingMovies(data.results.map(item => ({
          title: item.title,
          releaseDate: item.release_date,
          poster_path: item.poster_path,
          vote_count: item.vote_count,
          vote_average: item.vote_average,
        })));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    const fetchTv = async ()=> {
      try {
        const response = await fetch(getPopularTv()); // 실제 API URL로 교체
        if (!response.ok) {
          throw new Error('Failed to fetch tv');
        }
        const data = await response.json();
        // console.log(data.results);
        setPopularTv(data.results.map(item => ({
          title: item.name,
          releaseDate: item.release_date,
          poster_path: item.poster_path,
          vote_count: item.vote_count,
          vote_average: item.vote_average,
        })));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }      
    }
    const fetchGenreMovies = async ()=> {
      try {
        const response = await fetch(getGenreMovies()); // 실제 API URL로 교체
        if (!response.ok) {
          throw new Error('Failed to fetch tv');
        }
        const data = await response.json();
        console.log(data.results);
        setRecommendations(data.results.map(item => ({
          title: item.title,
          releaseDate: item.release_date,
          poster_path: item.poster_path,
          vote_count: item.vote_count,
          vote_average: item.vote_average,
        })));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }      
    }

    fetchMovies();
    fetchNowMovies();
    fetchTv();
    fetchGenreMovies();

  },[]);



  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={
          <Home 
            popularMovies={popularMovies}
            popularTv={popularTv}
            nowPlayingMovies={nowPlayingMovies}/>
        }/>
        <Route path='/movie' element={<Movies/>} />
        <Route path='/movie/:title' element={<MovieDetail/>} />
        <Route path='/tv' element={<Tv popularTv={popularTv}/>} />
        <Route path='/person' element={<Celebrity recommendations={recommendations}/>} />
        <Route path='/mylist' element={<MyList/>} />
        <Route path='/*' element={<NotFound/>} /> 
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
