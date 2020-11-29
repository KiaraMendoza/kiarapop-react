import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAdverts } from '../../api/adverts';
import storage from '../../utils/storage';
import removeEmptyFields from '../../utils/removeEmptyFields'; 
import RangeSlider from '../globals/RangeSlider';

const AdvertsFilters = ({ setIsLoading, setAdvertsData, setHasError }) => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [priceValue, setPriceValue] = useState([0, 100000]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        let adaptedPriceRange = `${priceValue[0]}-${priceValue[1]}`;
        let dataWithoutEmptyFields = { ...data };
        let lastUsedFilters = { ...data, price: adaptedPriceRange };
        try {
            if (data) dataWithoutEmptyFields = removeEmptyFields(data); 
            dataWithoutEmptyFields = { ...dataWithoutEmptyFields, price: adaptedPriceRange };
            console.log("dataWithoutEmptyFields", dataWithoutEmptyFields)
            const fetchedAdverts = await getAdverts(dataWithoutEmptyFields);
            console.log(lastUsedFilters)
            storage.set('lastUsedFilters', lastUsedFilters);
            setAdvertsData(fetchedAdverts);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
            setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
        }
    };

    const handlePriceRange = (event, newValue) => {
        setPriceValue(newValue);
    };

    return (
        <div className="adverts__filters">
            <h3 className="adverts__subtitle text-center my-4">Advanced Filters</h3>
            <form className="login__form" onSubmit={handleSubmit(onSubmit)} >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" ref={register} />
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
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="all">All</label>
                        <input type="radio" name="sale" value="" ref={register} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price range</label>
                    {/* <Range min={0} max={10000000} onChange={handlePriceRange} /> */}
                    <RangeSlider className="price-range" min={0} max={100000} value={priceValue} valueLabelDisplay="auto" 
                        aria-labelledby="range-slider" onChange={handlePriceRange} marks={[{ value: 0, label: '0€' },{ value: 100000, label: '100.000€'}]} />
                </div>
                <div className="form-group d-flex align-items-center justify-content-center">
                    <p className="mb-0">Tags</p>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="work">Work</label>
                        <input type="checkbox" name="tags" value="work" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="lifestyle">Lifestyle</label>
                        <input type="checkbox" name="tags" value="lifestyle" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="mobile">Mobile</label>
                        <input type="checkbox" name="tags" value="mobile" ref={register} />
                    </div>
                    <div className="d-flex align-items-center mx-2">
                        <label className="mb-0 mr-2" htmlFor="motor">Motor</label>
                        <input type="checkbox" name="tags" value="motor" ref={register} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary btn-filters py-2 px-5">Apply filters</button>
            </form>
        </div>
    )
}

export default AdvertsFilters;