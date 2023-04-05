import React, {Component} from 'react';
import Like from './common/like';
import { Link } from 'react-router-dom';
import Table from './common/table';
import MovieForm from './movieForm';

class MoviesTable extends Component {
    columns = [
        {
            label: 'Title', 
            path:'title',
            content: movie => (
                <Link to={`${movie._id}`}>
                    {movie.title}
                </Link>
            )
        },
        {label: 'Genre', path:'genre.name'},
        {label: 'Stock', path:'numberInStock'},
        {label: 'Rate', path:'dailyRentalRate'},
        {key: 'like',
            content: movie => (
                <Like onLike={() => this.props.onLike(movie)} isLiked={movie.isLiked}/>
                )
            
        },
        {key: 'delete', 
            content: movie => (
                this.props.user && this.props.user.isAdmin && <button
                    className='btn btn-danger'
                    onClick={
                        () => this.props.onDeleteMovie(movie)
                    }
                    >Delete
                </button>)
        }
    ];

    render() { 
        const {movies, onSort, sortColumn} = this.props;


        return ( 
            <Table 
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onSort={onSort}
            />
         );
    }
}
 
export default MoviesTable;