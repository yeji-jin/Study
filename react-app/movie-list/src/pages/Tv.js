import React from "react"; 
import Movie from '../Components/Movie';

function Tv(props) {
    return (
        <div className="movies-container">
             {props.popularTv.map(item => {
                return (
                    <Movie key={item.title}
                        title={item.title}
                        poster_path={item.poster_path}
                        vote_average={item.vote_average}/>
                )
             })}
        </div>
    );
}  
export default Tv;
  