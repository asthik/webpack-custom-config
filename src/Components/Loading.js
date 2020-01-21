import React from 'react';

export default function Loading({isLoading, pastDelay, error}) {
    if(isLoading && pastDelay) {
        return <p>Loading...</p>;
    }else if(error && !isLoading) {
        return <p>ERROR!!!</p>
    }else {
        return null;
    }
}