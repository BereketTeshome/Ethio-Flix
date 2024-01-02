import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import CircularRate from '../components/CircularRating'
import { Link } from 'react-router-dom'
import { BsPlayFill } from 'react-icons/bs'

const SearchPage = ({toggleTheme}) => {
  const [value, setValue] = useState("spider man")
  const [searchResults, setSearchResults] = useState([])
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("movie")

  const handleAdd = () => {
    setCount(count + 1)
  }
  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`https://api.themoviedb.org/3/search/${category}?query=${value}&api_key=80a0e202227d60da50492065dd1e2178&page=${count}`)
        setSearchResults(res.data.results)
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    }
    fetchSearchResults()
  }, [value, category, count])
    
  return (
    <div className='search-main'>
      <Navbar toggleTheme={toggleTheme}/>
      <div className='search-container'>
        <div className='search-btn-container'>
            <button className='watchNow-btn search-btn' onClick={()=>{setCategory('movie')}}>MOVIE</button>
            <button className='watchNow-btn search-btn' onClick={()=>{setCategory('tv')}}>TV</button>
            <button className='watchNow-btn search-btn' onClick={()=>{setCategory('person')}}>PEOPLE</button>
        </div>
        <input type="text" placeholder={`Search ${category}`} onChange={(e)=>setValue(e.target.value)}/>
      </div>

      <div className='movies'>
        {searchResults.map((result)=> {
            const{poster_path, title, id, vote_average, release_date, name, profile_path, first_air_date} = result
            return(
                <Link to={`/${category}/${id}`} key={id}>
                    <div className='movies-container'>
                        <div className='image enlarged-image'>
                          <img src={poster_path || profile_path ? `https://image.tmdb.org/t/p/w500${profile_path || poster_path}` : '../../public/Grey-blank-panel.png'} alt={title} />
                          <div className='image-overlay movie-image-overlay' key={id}>
                              {category === 'person' ? null : <span className='image-overlay-btn'><BsPlayFill size={18}/></span>}
                              {category === 'person' ? null : <CircularRate value={vote_average}/>}
                              <div className="image-date">{release_date  ? release_date .split('-')[0] : null}</div>
                              <div className="image-date">{first_air_date ? first_air_date.split('-')[0] : null}</div>
                              <p className='image-title'>{title || name ? title || name.slice(0, 53) : null}</p>
                          </div>
                        </div>
                    </div>
                </Link>
            )
        })}
        
      <button className='loadMore-btn' onClick={() => handleAdd()}>{loading ? 'Loading...': 'NEXT'}</button>
      <button className='loadMore-btn' onClick={() => handleMinus()}>PREVIOUS</button>
      </div>


    </div>
  )
}

export default SearchPage
