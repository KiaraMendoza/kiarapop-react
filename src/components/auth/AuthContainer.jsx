import React, {useState, useEffect} from 'react';
import LoginForm from './LoginForm';
import RememberForm from './RememberForm';
import SignUpForm from './SignUpForm';

const AuthContainer = ({ setUserData, setIsLoading }) => {
    const [hasError, setHasError] = useState(false);
    const [formSelected, setFormSelected] = useState('login');

    const handleFormChange = (e, newForm) => {
        setFormSelected(newForm);
        return;
    }

    return (
        <div className="login__container">
            {formSelected === 'login' &&
                <LoginForm setIsLoading={setIsLoading} setHasError={setHasError} setUserData={setUserData} />}
            {/* {formSelected === 'remember' && <RememberForm setIsLoading={setIsLoading} />} */}
            {/* {formSelected === 'signUp' && <SignUpForm setIsLoading={setIsLoading} />} */}
            {hasError && <p>{hasError}</p>}
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-secondary" type="button" disabled onClick={(e) => handleFormChange(e, 'remember')}>
                    Dont remember your password?
                </button>
                <button className="btn btn-secondary" type="button" disabled onClick={(e) => handleFormChange(e, 'signUp')}>
                    Still not a member? Join us!
                </button>
            </div>
        </div>
    )
}

export default AuthContainer;