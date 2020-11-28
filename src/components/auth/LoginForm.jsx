import React, { useState } from 'react'; 
import { useForm } from "react-hook-form";
import { login } from '../../api/auth';
import storage from '../../utils/storage';

const LoginForm = ({ setIsLoading, setHasError, setUserData }) => {
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const userToken = await login({ email: data.email, password: data.password });
            const loggedUser = { email: data.email, token: userToken };
            console.log(loggedUser)
            if (data.rememberMe) storage.set('loggedUser', loggedUser);
            setUserData(loggedUser);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
            setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
        }
    };

    return (
        <div className="login__login">
            <h2 className="login__title text-center my-4">Log in!</h2>
            <form className="login__form" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" ref={register({ required: true })} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" ref={register({ required: true })} />
                </div>
                <div className="form-group d-flex align-items-center">
                    <label className="d-inline-block pr-3 mb-0" htmlFor="rememberMe">Remember me</label>
                    <input type="checkbox" name="rememberMe" ref={register} />
                </div>
                {errors.exampleRequired && <span>This field is required</span>}
                <button type="submit" className="btn btn-primary py-2 px-5">Send</button>
            </form>
        </div>
    )
}

export default LoginForm;