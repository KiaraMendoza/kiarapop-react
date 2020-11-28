import React from 'react';

const NotFoundPage = () => {
    return (
        <div className="fullscreen-page d-flex flex-column align-items-center justify-content-center">
            <h1 className="mb-5">Not found</h1>
            <p className="text-center">We are sorry to say this but... <br />
                We haven't found what you are looking for! <br />
                Maybe try something else? <br />
                There must be something for you!</p>
        </div>
    )
}

export default NotFoundPage;