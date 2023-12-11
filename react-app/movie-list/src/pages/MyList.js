import React, { useEffect, useState } from "react"; 
import Movie from "../Components/Movie";

function MyList() {

    // const [wishList, setWishList] = useState(getFromLocalStorage('wishList') || []);

    const getFromLocalStorage = (key) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    };
    const [myWishList, setMyWishList] = useState(getFromLocalStorage('wishList') || []);
        // 데이터 가져오기

    // useEffect(()=>{
    //     const savedWishList = getFromLocalStorage('wishList');
    //     if(savedWishList){
    //         setMyWishList([...savedWishList]);
    //     }
    // },[])

    return (
        <div>
            {/* 마이리스트
            {myWishList.map((item, i)=> 
                <p style={{color:'#fff'}}>{item.title}</p>
            )} */}


            <div className="movies-container">
                {   
                    myWishList.map(item =>{
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

        </div>
    );
}  
export default MyList;
  