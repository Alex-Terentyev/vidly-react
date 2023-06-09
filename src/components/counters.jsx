import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
    render() { 
        const {counters, onDecrement, onDelete, onIncrement, onReset} = this.props;
        return (<div>
            <button 
                className="btn btn-primary btn-sm m-2"
                onClick={onReset}
                >
                Reset
            </button>
            
            {counters.map(counter => 
            <Counter 
                key={counter.id} 
                counter={counter} 
                onDelete={onDelete}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                >
                    <h4>Counter {counter.id}</h4>         
            </Counter>)}
        </div>);
    }
}
 
export default Counters;