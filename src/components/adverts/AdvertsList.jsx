import React, { useState } from 'react';

const AdvertsList = ({ advertsData }) => {

    console.log(advertsData)

    return (
        <div className="adverts__list">
            <div className="container page-container main-page">
                <div className="text-center pb-5">
                    <ul className="list-group flex-row justify-content-center pb-2">
                        <li className="list-group-item">All</li>
                        <li className="list-group-item">Work</li>
                        <li className="list-group-item">Lifestyle</li>
                        <li className="list-group-item">Mobile</li>
                        <li className="list-group-item">Motor</li>
                    </ul>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4">
                    {advertsData && advertsData.map(ad => {
                        return (
                            <div key={ad._id} className="col">
                                <div className="card mb-5">
                                    <img src={ad.thumbnail ? `/thumbnails/${ad.thumbnail}` : "https://placedog.net/100"} className="card-img-top" alt={ad.name} />
                                    <div className="card-body">
                                        <p className="card-text text-center card-title">{ad.name}.</p>
                                        <p className="card-text d-flex justify-content-between card-price font-weight-bold">{ad.price} €.
                                        <i>

                                            </i>
                                        </p>
                                        <p>Tags: {ad.tags}</p>
                                    </div>
                                </div>
                            </div>
                        )})
                    }
                </div>
            </div>
        </div>
    )
}

export default AdvertsList;