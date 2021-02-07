import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createAdvert, getTags } from '../../api/adverts';

const AdvertsCreate = ({ history }) => {
    // const [advertData, setAdvertData] = useState(null);
    const { register, handleSubmit, errors } = useForm();
    const [tags, setTags] = useState([]);
    const [photo, setPhoto] = useState(null)

    const onSubmit = async (data) => {
        console.log(data)
        await createAdvert(data)
            .then(({ result: createdAdvert }) => history.push(`/adverts/${createdAdvert._id}`))
            .catch(error => this.setState({ error }));
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

    const handlePhotoChange = (e) => {
        const [file] = e.target.files;
        console.log(e.target.files)
        setPhoto(file)
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
                    <input type="file" name="photo" ref={register} />
                </div>
                <button type="submit" className="btn btn-primary py-2 px-5">Send</button>
            </form>
        </div>
    )
}

export default AdvertsCreate;