import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import MovieCard from './components/MovieCard'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  
  return (
    <>
    <MovieProvider>     {/*we use movieprovider so that both the pages i.e home and fav pages can access the fav funtions */}
      <NavBar/>
        <main className='main-content'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Favourites' element={<Favourites/>}/>
          </Routes>
        </main>
      </MovieProvider>
    </>
  );
}
export default App
