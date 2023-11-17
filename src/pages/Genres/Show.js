import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const ShowMoviesGenre = () => {
  let {id} = useParams();
    const [movies, setMovies] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const result = await axios(`http://127.0.0.1:8000/api/movie-genre/${id}`)
                await setMovies(result.data)
                setLoaded(true)
            } catch (error) {
                seterrorMessage(error.response.data.message)
            }
        }
        fetchMovie()
    }, []);
    return (
        <>
        { !loaded ? (
                    (() => {
                        if (errorMessage) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: errorMessage
                        })
                        }else{
                        // const Toast = Swal.mixin({
                        //   toast: true,
                        //   position: 'top-end',
                        //   showConfirmButton: false,
                        //   timer: 3000,
                        //   timerProgressBar: true,
                        //   didOpen: (toast) => {
                        //     toast.addEventListener('mouseenter', Swal.stopTimer)
                        //     toast.addEventListener('mouseleave', Swal.resumeTimer)
                        //   }
                        // })

                        // Toast.fire({
                        //   icon: 'success',
                        //   title: 'Successfully Get Data'
                        // })
                        }
                    })()
                ) : (
                    <ul>
                        {/* <pre>{JSON.stringify(movies.data)}</pre> */}
                        {Array.isArray(movies.data) ? (
                            movies.data.map((movie)=>(
                                <li key={movie.id}>
                                    <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
                                </li>
                            ))
                        ) : (
                            <p>Oops... There's no movies data.</p>
                        )
                        }
                    </ul>
                )}
        </>
    )
}

export default ShowMoviesGenre