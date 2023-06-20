import React from 'react';

const GalleryList = (props) => {

    const collections = props.collection;
    const collectionHandler = props.collectionHandler;

    return (
        <div className='pl-3 pt-2 text-lg'>
            {
                collections.map((item, key) => {
                    return <div key={key} onClick={(e) => { collectionHandler(e) }} className='pt-1 hover:underline hover:cursor-pointer w-fit truncate xl:overflow-auto xl:whitespace-normal' >{item.name}</div>;
                })
            }
        </div>
    );
};

export default GalleryList;