import React,{useState,useEffect} from 'react'
import './App.css';
import MovieCard from './MovieCard';
import SeachIcon from './Search.svg';
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=b1070899";

const App = () => {
  const [search,setSearch] = useState([]);
  const [movies,setMovies] = useState([]);


  useEffect(()=>{
      search?.length === 0 ? searchMovies("Batman") : searchMovies(search)
  },[])

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search)
    setMovies(data.Search);
  };

  return (
    <div className='app'>
      <h1>MovieBuzz</h1>

      <div className="search">
        <input 
          placeholder='Search your movie'
          onChange={(e)=> {
            setSearch(e.target.value);
          }}/>
        <img src={SeachIcon}
          alt="Search"
          onClick={()=>searchMovies(search)}
         />
      </div>

      <div className="container">
        {
          movies?.length > 0 ?
          (<div className='container'>
             {
              movies.map((movie)=> (
                <MovieCard movie ={movie} />))
            }
            </div>
          ) 
          :
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        }

      </div>
    
    
    </div>
  )
}

export default App