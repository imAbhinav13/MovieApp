import "../css/Favorites.css"
import{useMovieContext} from "../contexts/MovieContext"
import MovieCard from "../components/MovieCard"

function Favourites(){  //shows if and only if theere are any fav

    const {favorites} = useMovieContext();

    if(favorites.length>0){
        return(
            <div className="favorites">
                <h2>Your Favourites</h2>
                <div className="Movie-grid">
                    {favorites.map((movie) =>( 
                    <MovieCard movie={movie} key={movie.id}></MovieCard> 
                                ))}    
                </div>
            </div>
        )
    }

    return( 
        <div className="favorites-empty">
            <h2>No Favourite movies added yet!</h2>
            <p>Start adding movies to Favourites and they will appear here.</p>
        </div>
    )
}

export default Favourites;