import React from 'react';
import { useAuth } from '../../Context/UseAuth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import "./RegisterPage.css";

interface Props {
}

type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
}

const validation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

const RegisterPage: React.FC<Props> = () => {
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: RegisterFormsInputs) => {
        registerUser(form.email, form.userName, form.password);
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit(handleLogin)}>
                <h1>Register</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Email" {...register("email")} />
                    {errors.email ? (<p>{errors.email.message}</p>) : ""}
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Username" {...register("userName")} />
                    {errors.userName ? (<p>{errors.userName.message}</p>) : ""}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Password" {...register("password")} />
                    {errors.password ? (<p>{errors.password.message}</p>) : ""}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default RegisterPage;