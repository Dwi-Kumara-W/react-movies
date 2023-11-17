// third party
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);
    
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await axios(`http://127.0.0.1:8000/api/movie`)
                await setMovies(result.data.data)
                setLoaded(true)
            } catch (error) {
                seterrorMessage(error.response.data.message)
            }
        }
        fetchMovies()
    }, []);
    
    return (
        <>
            { !loaded ? (
                (() => {
                    if (errorMessage) {
                        return (
                            <div className="row">
                                <p>Ooops....{errorMessage}</p>
                            </div>
                        )
                    }else{
                        return (
                            <div className="row">
                                <p>Loading...</p>
                            </div>
                        )
                    }
                })()
            ) : (
                <div className="row">
                {movies.map((movie, index) => (
                    <div className="col-sm-4 mb-2" key={index}>
                        <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">
                            {movie.Description}
                            </p>
                            <Link to={`/movies/${movie.id}`} className="btn btn-primary">
                                Read more
                            </Link>
                        </div>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </>
    )
}

export default MovieList