import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createAdvert, getTags } from '../../api/adverts';
import InputImage from '../globals/InputImage/InputImage';

const AdvertsCreate = ({ history }) => {
    // const [advertData, setAdvertData] = useState(null);
    const { register, handleSubmit, errors } = useForm();
    const [hasError, setHasError] = useState(false);
    const [tags, setTags] = useState([]);
    const [photo, setPhoto] = useState(null)

    const onSubmit = async (data) => {
        console.log({ ...data, photo })
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('sale', data.sale);
        formData.append('price', data.price);
        data.tags.forEach((tag, index) => formData.append(`tags[${index}]`, tag));
        if (photo) formData.append('photo', photo);
        await createAdvert(formData)
            .then(({ result: createdAdvert }) => history.push(`/adverts/${createdAdvert._id}`))
            .catch(error => setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.', error))
    };

    const maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    const handleGetTags = async () => {
        const fetchedTags = await getTags();
        setTags(fetchedTags.result);
    }

    useEffect(() => {
        handleGetTags()
    }, [])

    const handlePhotoChange = (photo) => {
        console.log(photo)
        setPhoto(photo)
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
                        <input type="radio" name="sale" value="true" ref={register({ required: true })} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="buy">Buy</label>
                        <input type="radio" name="sale" value="false" ref={register({ required: true })} />
                    </div>
                    {errors.sale && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" onInput={maxLengthCheck} maxLength="5" name="price" ref={register({ required: true })} />
                    {errors.price && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <p className="mb-0">Tags</p>
                    {tags.map(tag => (
                        <div key={tag} className="d-flex align-items-center mx-2">
                            <label className="mb-0 mr-2" htmlFor={tag}>{tag}</label>
                            <input type="checkbox" name="tags" value={tag} ref={register({ required: true })} />
                        </div>
                    ))}
                    {errors.tags && <span className="error-message">This field is required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Image</label>
                    <InputImage type="file" onChange={handlePhotoChange} />
                </div>
                <button type="submit" className="btn btn-primary py-2 px-5">Send</button>
            </form>
            {hasError && <p className="general-error-text">{hasError}</p>}
        </div>
    )
}

export default AdvertsCreate;