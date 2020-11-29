import React, { useState } from 'react';
import Advert from './Advert';

const AdvertsList = ({ advertsData }) => {

    return (
        <div className="adverts__list">
            <div className="container page-container main-page">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
                    {advertsData && advertsData.map(ad => {
                        return (
                            <Advert key={ad._id} ad={ad} checkDetail={true} />
                        )})
                    }
                </div>
            </div>
        </div>
    )
}

export default AdvertsList;