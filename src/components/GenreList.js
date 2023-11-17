import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);

    const fetchGenres = async () => {
        try {
            const result = await axios(`http://127.0.0.1:8000/api/genre`);
            await setGenres(result.data.data)
            setLoaded(true)
        } catch (error) {
            seterrorMessage(error.response.data.message)
        }
    }

    useEffect(() => {
      fetchGenres()
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
                <div className='row'>
                    {/* <pre>{JSON.stringify(genres)}</pre> */}
                    {genres.map((genre, index) => (
                        <div className='col-sm-2 mb-3' key={index}>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <Link to={`/movie-genre/${genre.id}`}>{genre.genre_name}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </>
    );
}

export default GenreList