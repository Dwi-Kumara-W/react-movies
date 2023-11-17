import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';

const MovieDetail = ({movie}) => {
  
  return (
      <>
      {/* <pre>{JSON.stringify(movie.data_genre)}</pre> */}
      <h2>Movie: {movie.data_movie.title} ({movie.data_movie.year})</h2>
      <div className='float-start'>
          <small>Rating: {movie.data_movie.rating}</small>
      </div>
      <div className='float-end'>
          {Object.entries(movie.data_genres).map((genre, index) => (
            <Link className='badge bg-secondary me-1' to={`/movie-genre/${genre[1].id}`} key={index}>{genre[1].genre_name}</Link>
          ))}
          {/* <span className='badge bg-secondary me-1'>Action</span> */}
      </div>
      <div className='clearfix'></div>
        <hr/>
        <table className='table table-striped table-sm-mt-4'>
          <thead></thead>
          <tbody>
            <tr>
              <td>Title: {movie.data_movie.title}</td>
              <td>{movie.data_movie.title}</td>
            </tr>
            <tr>
              <td>Description: {movie.data_movie.Description}</td>
              <td>{movie.data_movie.Description}</td>
            </tr>
            <tr>
              <td>Runtime:</td>
              <td>{movie.data_movie.runtime} Minute(s)</td>
            </tr>
          </tbody>
        </table>
      </>
  )
}

export default React.memo(MovieDetail)