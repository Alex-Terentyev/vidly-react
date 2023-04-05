import React from 'react';


const SearchBox = ({onChange, value}) => {
    return (
        <div className='form-group  mt-2'>
            <input 
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
                className='form-control' 
                placeholder='Search...'/>
        </div>
    );
}
 
export default SearchBox;