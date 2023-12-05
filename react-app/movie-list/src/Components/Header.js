import React, { useState , useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Header() {

  const [searchValue, setSearchValue] = useState('');
  const navigater = useNavigate();
  const onSearchKeyword = (e)=>{
      e.preventDefault(); // 폼 제출 기본 동작 방지
      navigater(`/search?query=${searchValue}`,{
          state: searchValue
      });
  }

  return (
    <div className='header-container'>
      <div className="header-wrap">
        <div className="header-left-wrap">
          <Link style={{ display: 'flex', alignItems: 'center' }} to="/">
            <img
              style={{ width: "154px", height: "20px" }}
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="로고"
            />
          </Link>
          
          <ul>
            <li>
              <Link className="header-nav-item" to="/movie">
                영화
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to="/tv">
                TV 프로그램
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to="/genres">
                장르
              </Link>
            </li>
            <li>
              <Link className="header-nav-item" to="/mylist">
                내가 찜한 컨텐츠
              </Link>
            </li>
          </ul>
        </div>
        <div className='header-right-wrap'>
          <form onSubmit={onSearchKeyword}>
            <input type='text' 
              value={searchValue}
              placeholder='영화를 검색해보세요.'
              onChange={(e)=> setSearchValue(e.target.value)}/>
              <button type='button' onClick={onSearchKeyword}>
                <svg fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height="1.5rem" width="1.5rem">
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}