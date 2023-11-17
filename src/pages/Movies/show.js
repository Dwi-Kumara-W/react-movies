import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import MovieDetail from '../../components/movies/MovieDetail';
import Swal from 'sweetalert2';

const ShowMovie = () => {
    let {id} = useParams();
    const [movie, setMovie] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, seterrorMessage] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const result = await axios(`http://127.0.0.1:8000/api/movie/${id}`)
                await setMovie(result.data)
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
                    <MovieDetail movie={movie}/>
                )}
        </>
    )
}

export default ShowMovie