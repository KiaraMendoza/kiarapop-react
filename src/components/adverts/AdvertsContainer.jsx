import React, { useEffect, useState } from 'react';
import { getAdverts } from '../../api/adverts';
import AdvertsList from './AdvertsList';
import AdvertsFilters from './AdvertsFilters';
import BasicFilters from './BasicFilters';
import storage from '../../utils/storage';

const lastUsedFilters = storage.get('lastUsedFilters');

const AdvertsContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isAdvancedFilters, setIsAdvancedFilters] = useState(false);
    const [advertsData, setAdvertsData] = useState(null);

    const initAdverts = async () => {
        setIsLoading(true);
        try {
            let fetchedAdverts;
            if (lastUsedFilters) {
                fetchedAdverts = await getAdverts(lastUsedFilters);
            } else {
                fetchedAdverts = await getAdverts();
            }
            setAdvertsData(fetchedAdverts.result.rows);
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
            {hasError && <p className="general-error-text">{hasError}</p>}
            {!hasError &&
                <>
                    {!isAdvancedFilters && <BasicFilters setIsLoading={setIsLoading} setHasError={setHasError} setAdvertsData={setAdvertsData} />}
                    {isAdvancedFilters && <AdvertsFilters setIsLoading={setIsLoading} setHasError={setHasError} setAdvertsData={setAdvertsData} />}
                    <button type="button" onClick={() => setIsAdvancedFilters(!isAdvancedFilters)} className="mx-auto d-block btn btn-primary py-2 px-5">
                        {isAdvancedFilters ? "Close" : "Open"} advanced search
                </button>
                    {!isLoading && <AdvertsList advertsData={advertsData} />}
                </>}
        </div>
    )
}

export default AdvertsContainer;