// third party
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const MovieTable = () => {
    const [movies, setMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);
    const confirmDelete = async (id) => {
        const payload = {
            id:id
        }
        await axios.delete(`http://localhost:8000/api/movie/${id}`)
        setMovies([])
        fetchMovies()
        // await axios.delete('http://localhost:8000/api/movie', JSON.stringify(payload))
    }   
    const fetchMovies = async () => {
        try {
            const result = await axios(`http://127.0.0.1:8000/api/movie`)
            if (result.data.data !== null) {
                await setMovies(result.data.data)
                setLoaded(true)
            } else {
                seterrorMessage("data not found")
            }
        } catch (error) {
            seterrorMessage(error.response.data.message)
        }
    }
    useEffect(() => {
        fetchMovies()
    }, []);
    
    return (
        <>
            <div className='row'>
                <div className='col-12'>
                    <Link to={'/admin/movies/create'} className='btn btn-sm btn-primary'>Add</Link>
                </div>
            </div>
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
                <>
                    <div className="row">
                        <div className='col-12'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Name</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                {movies.map((movie, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                                        </td>
                                        <td>
                                            <div className='btn-group'>
                                                <button 
                                                    className='btn btn-secondary btn-sm dropdown-toggle'
                                                    type='button'
                                                    data-bs-toggle='dropdown'
                                                    aria-expanded='false'
                                                >
                                                    Action
                                                </button>
                                                <ul className='dropdown-menu'>
                                                    <li>
                                                        <span className='dropdown-item'>
                                                            <Link to={`/admin/movies/${movie.id}/edit`}>Edit</Link>
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className='dropdown-item' style={{ cursor:'pointer' }} onClick={()=>confirmDelete(movie.id)}>
                                                            Delete
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default MovieTable