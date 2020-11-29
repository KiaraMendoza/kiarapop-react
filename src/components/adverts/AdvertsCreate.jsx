import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createAdvert } from '../../api/adverts';

const AdvertsCreate = () => {
    // const [advertData, setAdvertData] = useState(null);
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = async (data) => {
        try {
            const createdAdvert = await createAdvert(data);
            console.log(createdAdvert);
            if (createdAdvert) return window.location.assign('/adverts'+createdAdvert._id);
        } catch {
            return null;
        }
    };

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    return (
        <div className="advert__create">
            <form className="login__form" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" ref={register({ required: true })} />
                    {errors.name && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <p className="mb-0">Sale or buy?</p>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="sale">Sale</label>
                        <input type="radio" name="sale" value="true" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="buy">Buy</label>
                        <input type="radio" name="sale" value="false" ref={register} />
                    </div>
                    {errors.sale && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" onInput={maxLengthCheck} maxLength="6" name="price" ref={register({ required: true })} />
                    {errors.price && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <p className="mb-0">Tags</p>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="tags">Work</label>
                        <input type="checkbox" name="tags" value="work" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="tags">Lifestyle</label>
                        <input type="checkbox" name="tags" value="lifestyle" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="tags">Mobile</label>
                        <input type="checkbox" name="tags" value="mobile" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="tags">Motor</label>
                        <input type="checkbox" name="tags" value="motor" ref={register} />
                    </div>
                    {errors.tags && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="image" />
                </div>
                <button type="submit" className="btn btn-primary py-2 px-5">Send</button>
            </form>
        </div>
    )
}

export default AdvertsCreate;