import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSerachTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`http://www.omdbapi.com/?s=${title}&apikey=ce4d786`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect( () => {
        searchMovies("Superman");
    }, []);

    return (
        <div className="app">
            <h1>Movie land</h1>

            <div className="search">
                <input placeholder="Search for movies..." value={searchTerm} onChange={(e) => {setSerachTerm(e.target.value)}}/>
                <img src={SearchIcon} alt="search" onClick={() => {
                    searchMovies(searchTerm)
                }}/>
            </div>

            {movies.length > 0? (
                 <div className="container">
                    {movies.map((movie, index) => {
                         return <MovieCard key={index} movie={movie}/>
                    })}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found!</h2>
                </div>
            )}
        </div>
    )
}

export default App;