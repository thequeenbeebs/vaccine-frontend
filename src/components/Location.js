import React from 'react';

const Location = ({ store, handleClick }) => {
    return (
        <div id={"listing-" + store.properties.id} className="item">
            <a href="#" 
                className="title" 
                id ={"link-" + store.properties.id}
                onClick={() => handleClick(store)}
                >{store.properties.address}</a>
            <div>{store.properties.city} · {store.properties.phoneFormatted}
            {store.properties.distance ? (Math.round(store.properties.distance * 100) / 100) + " miles away" : null}
            </div>
        </div>
    )
}

export default Location;