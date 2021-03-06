import React, { useEffect, useState } from 'react';
import { getAdverts } from '../../api/adverts';
import storage from '../../utils/storage';

const BasicFilters = ({ tags, setIsLoading, setAdvertsData, setHasError }) => {
    const [selectedTag, setSelectedTag] = useState(null);

    const handleBasicTagSelect = async () => {
        let newTag = selectedTag;
        if (selectedTag === "all") newTag = ""
        setIsLoading(true);
        let lastUsedFilters = { tags: newTag };
        try {
            const fetchedAdverts = await getAdverts(lastUsedFilters);
            storage.set('lastUsedFilters', lastUsedFilters);
            setAdvertsData(fetchedAdverts);
            setIsLoading(false);
        } catch {
            setIsLoading(false);
            setHasError('An error ocurred, please contact us for more information. Sorry for the inconvenience.');
        }
    };

    useEffect(() => {
        if (selectedTag) {
            handleBasicTagSelect();
        }
    }, [selectedTag])

    return (
        <div className="adverts__filters">
            <h3 className="adverts__subtitle text-center my-4">Basic Filters</h3>
            <div className="text-center mb-4">
                <ul className="list-group flex-row justify-content-center pb-2">
                    <li onClick={() => setSelectedTag("all")} className="list-group-item">All</li>
                    {tags.map(tag => {
                        return (
                            <li key={tag} onClick={() => setSelectedTag(tag)} className="list-group-item">{tag}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default BasicFilters;