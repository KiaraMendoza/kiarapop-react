import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { deleteAdvert, getAdvert } from '../../api/adverts';
import Advert from './Advert';

const AdvertsDetail = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [advertIsLoading, setAdvertIsLoading] = useState(true);
    const [advertData, setAdvertData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    let advertId = useParams().id;

    const initAdvert = async () => {
        setAdvertIsLoading(true);
        setIsLoading(true);
        try {
            const fetchedAdvert = await getAdvert(advertId);
            setAdvertData([fetchedAdvert.result]);
            setAdvertIsLoading(false);
            setIsLoading(false);
        } catch (err) {
            setAdvertIsLoading(false);
            setIsLoading(false);
            return null;
        }
    }

    const sendDelete = async () => {
        await deleteAdvert(advertId).then(() => history.push('/'));
    }

    useEffect(() => {
        initAdvert();
    }, [])

    return (
        <>  
            {isDeleting && <div className="overlay"></div>}
            <div className="advert__detail">
                {isLoading && advertIsLoading && <p>Loading advert data...</p>}
                {!isLoading && !advertIsLoading &&
                <div className="row">
                    {advertData && advertData.map(ad => {
                            return (
                                <Advert key={ad._id} ad={ad} hasImage={true} hasDelete={true} handleDelete={() => setIsDeleting(true)} />
                            )
                        })
                        }
                    {!advertData && <Redirect to="/404" />}
                </div>}
            </div>
            {isDeleting &&
            <div className="custom-modal">
                <h2 className="text-uppercase text-red">Warning!</h2>
                <p className="mt-5">Are you sure you want to delete this advert?</p>
                <div className="mt-5">
                    <button type="button" onClick={sendDelete} className="btn btn-danger mr-4">Yes</button>
                    <button type="button" onClick={() => setIsDeleting(false)} className="btn btn-primary">No!</button>
                </div>
            </div>}
        </>
    )
}

export default AdvertsDetail;