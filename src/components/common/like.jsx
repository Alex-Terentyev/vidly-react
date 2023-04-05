import React from 'react';

const Like = ({isLiked, onLike}) => {

    return ( 
    <i 
        className={isLiked 
            ? 'clickable fa-heart fa-solid' 
            : 'clickable fa-heart fa-regular'}
        onClick={onLike}
    ></i> 
    );

}
 
export default Like;