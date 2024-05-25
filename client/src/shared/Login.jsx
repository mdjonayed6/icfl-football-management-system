import React from 'react';
import secureApi from '../api/secureApi'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const userInfo = {
            email,
            password
        }

        try {
            const result = await secureApi.post('/users/login', userInfo)
            if (result.success == true) {
                toast.success('Login successful')
                setTimeout(() => {
                    localStorage.setItem('access-token', result.token)
                    localStorage.setItem('email', result.user.email)
                    localStorage.setItem('id', result.user.id)
                    navigate('/dashboard')
                }, 1200)
            }
        } catch (error) {
            // console.log(error)
            toast.error(error.response.data.message)
        }

    }
    return (
        <div className='login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>ICFL</b>- IUBAT</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Please Sign in to start your session</p>
                        <form onSubmit={handleSubmit} >
                            <div className="input-group mb-3">
                                <input type="email" name='email' className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" name='password' className="form-control" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-success btn-block">Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>

                        <p className="mb-0">
                            <Link to="/register" className="text-center">Register as a new member</Link>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
            {/* /.login-box */}
            <ToastContainer />
        </div>

    );
};

export default Login;