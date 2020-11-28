import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { login } from '../../api/auth';

const LoginForm = ({ setIsLoading, setHasError }) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = async (data) => {
        console.log(data);
        setIsLoading(true);
        try {
            const userToken = await login(data);
            console.log(userToken);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
            setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
        }
    };

    console.log(watch("email")); // watch input value by passing the name of it

    return (
        <div className="login__login">
            <h2 className="login__title">Log in!</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <input type="email" name="email" ref={register({ required: true })} />
                <input type="password" name="password" ref={register({ required: true })} />
                

                {errors.exampleRequired && <span>This field is required</span>}
                <input type="submit" />
            </form>
        </div>
    )
}

export default LoginForm;