import "../css/MovieCard.css"
import {useMovieContext} from"../contexts/MovieContext" 

function MovieCard({movie}) {
    
    const {isFav,removeFav,addToFav} = useMovieContext();
    const favorite =isFav(movie.id)



    function onFavClick(e){
        e.preventDefault()
        if(favorite) removeFav(movie.id)
        else addToFav(movie)

    }

    return(
            
            <div className="movie-card">                            {/* this is the card of each movie */}
                <div className="movie-poster">                      {/* this is for the image of each movie */}
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />        {/* this shows the eacn movie image to be displayed */}
                    <div className="movie-overlay">                 {/* its basically and overlay for the like button*/}
                        <button className={`favorite-btn ${favorite? "active":""}`} onClick={onFavClick}>  {/* here created a button that is lined with a function called onClick*/}
                            {favorite ? "❤️" : "🤍"}
                        </button>
                    </div>
                </div>
                <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date?.split('-')[0]}</p>   {/*it was relaseDate before hence was not showing date, updated it to release_date */}
                </div>
            </div>
            
    );
}

{/*called as default export */}
export default MovieCard    