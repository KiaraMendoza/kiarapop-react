import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteAdvert, getAdvertDetail } from '../../api/adverts';
import Advert from './Advert';

const AdvertsDetail = ({ isLoading, setIsLoading }) => {
    const [advertData, setAdvertData] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    let advertId = useParams().id;

    const initAdvert = async () => {
        setIsLoading(true);
        try {
            const fetchedAdvert = await getAdvertDetail(advertId);
            setAdvertData([fetchedAdvert]);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            return null;
        }
    }

    const sendDelete = async () => {
        try {
            const deletedAdvert = await deleteAdvert(advertId);
            window.location.assign('/adverts')
            return deletedAdvert;
        } catch (err) {
            return null;
        }
    }

    useEffect(() => {
        initAdvert();
    }, [])

    return (
        <>  
            {isDeleting && <div className="overlay"></div>}
            <div className="advert__detail">
                {isLoading && <p>Loading advert data...</p>}
                {!isLoading &&
                    <div className="row">
                        {advertData && advertData.map(ad => {
                            return (
                                <Advert key={ad._id} ad={ad} hasImage={true} hasDelete={true} handleDelete={() => setIsDeleting(true)} />
                            )
                        })
                        }
                        {!advertData && <p className="error-message">Sorry we haven't found the advert you are looking for!</p>}
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