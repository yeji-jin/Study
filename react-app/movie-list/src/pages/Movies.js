import React from "react"; 
import { dummy } from '../api/MovieDummy';
import Movie from '../Components/Movie';

function Movies() {
    return (
        <div className="movies-container">
            {
                dummy.results.map(item =>{
                return (
                    <Movie
                        key={item.title}
                        title={item.title}
                        poster_path={item.poster_path}
                        vote_average={item.vote_average}/>
                )
                })
            }
        </div>
    );
}  
export default Movies;
  