import React, { useEffect, useState } from 'react';
import { getAdverts } from '../../api/adverts';
import AdvertsList from './AdvertsList';
import AdvertsFilters from './AdvertsFilters';

const AdvertsContainer = ({ isLoading, setIsLoading }) => {
    const [hasError, setHasError] = useState(false);
    const [advertsData, setAdvertsData] = useState(null);
    const [viewType, setViewType] = useState('list');

    const initAdverts = async () => {
        setIsLoading(true);
        try {
            const fetchedAdverts = await getAdverts();
            setAdvertsData(fetchedAdverts);
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.')
        }
    };

    useEffect(() => {
        initAdverts();
    }, []);

    return (
        <div className="adverts__container">
            <h2 className="adverts__title text-center my-4">Adverts page</h2>
            <AdvertsFilters />
            {(!isLoading && viewType === "list") && <AdvertsList advertsData={advertsData} />}
            {/* {viewType === "detail" && <AdvertDetail />} */}
            {/* {viewType === "create" && <AdvertCreate />} */}
        </div>
    )
}

export default AdvertsContainer;