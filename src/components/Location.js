import React from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';

const Location = ({ store, handleClick, chooseLocation }) => {
    return (
        <div id={"listing-" + store.properties.id} className="item">
            <a href="#" 
                className="title" 
                id ={"link-" + store.properties.id}
                onClick={() => handleClick(store)}
                >{store.properties.name}</a>
            <div>{store.properties.address}</div>
            <div>{store.properties.city} · {store.properties.state} · {store.properties.postalCode}</div>
            <div>{store.properties.phoneFormatted}
            {store.properties.distance ? (Math.round(store.properties.distance * 100) / 100) + " miles away" : null}
            </div>
            <Button onClick={() => chooseLocation(store)}><ArrowForwardIcon/></Button>
        </div>
    )
}

export default Location;