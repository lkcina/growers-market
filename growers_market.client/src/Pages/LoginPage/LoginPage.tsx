import React from 'react';
import { useAuth } from '../../Context/UseAuth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import './LoginPage.css';
import { Link } from 'react-router-dom';

type LoginFormsInputs = {
    userName: string;
    password: string;
}

const validation = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

const LoginPage = () => {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.userName, form.password);
    };

    return (
        <div className="login-page">
            
            <form onSubmit={handleSubmit(handleLogin)}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Username" {...register("userName")} />
                    {errors.userName ? (<p className="error">* {errors.userName.message}</p>) : ""}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Password" {...register("password")} />
                    {errors.password ? (<p className="error">* {errors.password.message}</p>) : ""}
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </form>

        </div>
    );
}

export default LoginPage;

