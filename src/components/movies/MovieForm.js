import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

const MovieForm = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {register, handleSubmit, setValue} = useForm()
    const isAddMode = !id
    const field = [
        'id',
        'title',
        'Description',
        'runtime',
        'release_date',
        'rating',
        'year',
        'mppa_rating',
        'genres',
    ]
    const fetchMovies = async (id) => {
        try {
            const result = await axios(`http://localhost:8000/api/movie/${id}`)
            field.forEach((field)=>setValue(field, result.data.data_movie[field]))
            // console.log(result.data.data_movie);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(()=>{
        if (!isAddMode) {
            fetchMovies(id)
        }
    }, [isAddMode])
    
    const onSubmit = async data => {
        if (isAddMode) {
            const result = await axios.post(
                'http://localhost:8000/api/movie',
                data
            )
        }else{
            const result = await axios.put(
                `http://localhost:8000/api/movie/${id}`,
                data
            )
            console.log(result, data);
        }
        navigate('/admin')
    }
  return (
    <>
        <h2>Movie Form</h2>
        <hr/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>Title</label>
                <input type='text' className='form-control' id='title' name='title' {...register('title',{required: true})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>Release Date</label>
                <input type='date' className='form-control' id='release_date' name='release_date' {...register('release_date',{required: true})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>Runtime</label>
                <input type='number' className='form-control' id='runtime' name='runtime' {...register('runtime',{required: true})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>Year</label>
                <input type='number' className='form-control' id='year' name='year' {...register('year',{required: true})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>MPPA Rating</label>
                <select name='mppa_rating' id='mppa_rating' className='form-control' {...register('mppa_rating',{required: true})}>
                    <option value='G' className='form-select'>
                        G
                    </option>
                    <option value='PG' className='form-select'>
                        PG
                    </option>
                    <option value='PG13' className='form-select'>
                        PG13
                    </option>
                    <option value='R' className='form-select'>
                        R
                    </option>
                    <option value='NC17' className='form-select'>
                        NC17
                    </option>
                </select>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>Rating</label>
                <input type='number' className='form-control' id='rating' name='rating' {...register('rating',{required: true})}/>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='form-label'>Description</label>
                <textarea rows={3} className='form-control' id='Description' name='Description' {...register('Description',{required: true})}/>
            </div>
            <hr/>
            <button className='btn btn-primary mb-4' type='submit'>Save</button>
        </form>
    </>
  )
}

export default MovieForm