import React, {useState} from 'react';
import LoginForm from './LoginForm';

const AuthContainer = (props) => {
    const [hasError, setHasError] = useState(false);
    const [formSelected, setFormSelected] = useState('login');


    const handleFormChange = (e, newForm) => {
        setFormSelected(newForm);
        return;
    }

    return (
        <div className="login__container">
            {formSelected === 'login' &&
                <LoginForm setHasError={setHasError} {...props} />}
            {/* {formSelected === 'remember' && <RememberForm />} */}
            {/* {formSelected === 'signUp' && <SignUpForm />} */}
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