import React from 'react';

const ListGroup = ({
        items, 
        valueProperty, 
        textProperty, 
        onSelect, 
        selectedItem
    }) => {
        const classes = "clickable list-group-item list-group-item-action"
        return (
            <div className="list-group genres">
                {items.map( item =>
                    <a 
                        key={item[valueProperty] || 0} 
                        className={
                            item === selectedItem 
                            ? classes + ' active' 
                            : classes
                        }
                        onClick={()=> onSelect(item)}                        
                        >{item[textProperty]}</a>
                )}
            </div>
        );
}
 
ListGroup.defaultProps={
    valueProperty: '_id',
    textProperty: 'name'
}

export default ListGroup;