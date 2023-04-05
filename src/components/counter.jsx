import React, { Component } from 'react';

class Counter extends Component {
    render() { 
        const { onIncrement, onDecrement, onDelete, counter } = this.props;
        return (
            <div>
                {this.props.children}
                <div className='row'>
                    <div className="col-1">
                        <span className='badge bg-primary m-2 primary'>
                            {this.formatCount()}
                        </span>
                    </div>
                    <div className="col">
                        <button
                            className='btn btn-secondary btn-sm m-2'
                            onClick={() => onIncrement(counter)}>
                            +
                        </button>
                        <button
                            className='btn btn-secondary btn-sm m-2'
                            onClick={() => onDecrement(counter)}
                            disabled={counter.value <= 0}
                            >
                            -
                        </button>
                        <button
                            className="btn btn-danger btn-sm m-2"
                            onClick={() => onDelete(counter.id)}
                            >
                            Delete
                        </button>
                    </div>  
                </div>
            </div>
            
        )
    }

    formatCount(){
        const {value} = this.props.counter;
        return value === 0 ? 'Zero' : value;
    }
}
 
export default Counter;