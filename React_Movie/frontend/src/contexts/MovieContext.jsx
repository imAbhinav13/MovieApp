import { createContext,useState,useContext,useEffect } from "react";

const MovieContext=createContext();     //creates a context named MovieContext      MovieContext acts as a storage for the data (state) that we want to share across components.
                                        // it will be used to store and share movie-related state across components.

export const useMovieContext= ()=> useContext(MovieContext);    //here it will use the the function we will define
//any component can call useMovieContext() to access the MovieContext data.
//to access any data or function stored inside MovieContext, we will use useMovieContext() inside our components.  

export const MovieProvider=({children}) => { //this provides state to any of the components that are wrapped around it eg: <UseContext.Provider>
                                    //so what we do here is, wrap the entire app in MovieProvidre context which allows entire app the have access to a state we define
    
    const [favorites,setFavorites]=useState([])          //fav is a state accessed by setFav                      
    
    
    useEffect(() =>{            
    /*here we are making the use of local storage, i.e browser storage, see if we have any fav movies in 
    local storage  */
    
    const storedFavs=localStorage.getItem("favorites"); //localStorage stores data as a string, so the retrieved value is a stringified JSON.
    if (storedFavs) {                              // Checks if there is any data stored in localStorage under the key "favorites".
            setFavorites(JSON.parse(storedFavs));  // Converts the stored string back into an JSON object using JSON.parse() 
                                                   // and updates the favorites state. This ensures the app can properly 
                                                   // manage and display favorite movies as an array.
        }   
    },[])

    useEffect(()=>{         //here anytime the fav state changes, we update what we store in localstorage
        localStorage.setItem('favorites',JSON.stringify(favorites))     //we convert the array (JSON obj) into a string(coz vrowser stores data in string format)
    },[favorites])

    //FUNCTIONS
    const addToFav=(movie)=>{   //adding Fav
        setFavorites(prev =>[...prev,movie]);
    }

    const removeFav=(movieId)=>{    //removing FAV
        setFavorites(prev => prev.filter(movie=> movie.id !==movieId));  /*making use of filter to rewrite the array where 
                                                                            it does not have movie of MovieID*/
    }                                                                       

    const isFav=(movieId)=>{
        return favorites.some(movie=>movie.id===movieId)
    }

   
    const values= {favorites,removeFav,addToFav,isFav}

    return <MovieContext.Provider value= {values}>  
        {children}                              
    </MovieContext.Provider>              
                                        //the children can access all of these things mentioned in values
                                        //here the componet which is wrapped around it becomes as a child and it can access the the state                    
};