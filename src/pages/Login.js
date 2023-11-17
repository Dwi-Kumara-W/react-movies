import axios from "axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
    
    const {register, handleSubmit, setValue} = useForm()
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    },[]);

    const onSubmit = async (data) => {
        axios.post('http://127.0.0.1:8000/api/auth/login',data)
        .then((response)=>{
            localStorage.setItem('token', response.data.access_token);
            Swal.fire({
                            icon: 'success',
                            title: 'Oops...',
                            text: "Login Success"
                        })
        }).catch((error)=>{
            Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: error
                        })
        })
    }

    return(
        <div className="container">
            <div className="d-flax align-items-center" style={{ height: '100vh' }}>
                <div style={{ width: '100%' }}>
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">Login</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="text" className="form-control" id="email" name="email" placeholder="email@example.com" {...register('email',{required: true})}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" placeholder="*******" {...register('password',{required: true})}/>
                                        </div>
                                        <button className="btn btn-primary" type="submit">Masuk</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;