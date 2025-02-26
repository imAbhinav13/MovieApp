import MovieCard from "../components/MovieCard"
import { useState ,useEffect} from "react";       //this is called a hook
import { searchMovies } from "../services/api";
import { getPopularMovies } from "../services/api";
import '../css/Home.css'
    
function Home() {
    
    const [searchQuery,setSearchQuery] = useState("");   //what user types into the search box and hit search is upadted and component is re rendered
            //here searchQuery holds the value of the change in state, i.e. in this it holds the updated value in serchbox
    const [movies,setMovies] = useState([]);    //storing in state so that it runs only once and only updates when movie list is updated

    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);  //as soon as we open website,it takes some time to load the data, heance we use this and initally its set to true
                                                //after which in finally block on useEffect, we set it to False

    useEffect(()=>{                                         //it is run when the 
        const loadPopularMovies=async ( )=>{
            try{
                const PopularMovies = await getPopularMovies();
                setMovies(PopularMovies)
            }
            catch(err){
                console.log(err);
                setError("Failed to load movies....");
            }
            finally{
                setLoading(false);
            }
        }
        loadPopularMovies();

    },[])

    const handleSearch= async (e)=>{        //runs when submit button is clicked
        e.preventDefault();
        if(!searchQuery.trim()) return      //.trim - Removes the leading and trailing white space and line terminator characters from a string.
        if(loading) return
        setLoading(true);

        try {
            const searchResults = await searchMovies(searchQuery)       // search for movies using searchQuery
            setMovies(searchResults)    //show movies which was searched
            setError(null)  //if we have an error at catch block, we clear it

        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally{
            setLoading(false);
        }

        setSearchQuery()
    };

    return(
        <>

        <div className="home">
            
                <form onSubmit={handleSearch} className="search-form">     {/*here form a horizontal space */}
                    <input type="text" 
                    placeholder="Enter Movie Name"
                    className="search-input"
                    value={searchQuery}     // here we connect the seachbox to the state
                    onChange={(e)=>setSearchQuery(e.target.value)}  //here, the 'setSearchQuery' function updates the 'searchQuery' variable
                    />

                    <button type="submit">Search</button>
                </form>
                

            {error && <div>{error}</div>}   {/*if theres an error, print error */}

            {loading? <div className="loading"> Loading ....</div> :    //if it is loading, it will show loading else movie grid
            <div className="Movie-grid">
                {movies.map((movie) =>( 
                // movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) &&   - every time you typed in the search bar, it was filtering movies dynamically before you even pressed "Search".
                <MovieCard movie={movie} key={movie.id}></MovieCard> 
                            ))}    
            </div>
            }   
        </div>
        </>
    )
}

export default Home