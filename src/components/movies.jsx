import React, { Component } from 'react';
import { getGenres } from '../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';

import ListGroup from './common/listGroup';
import Pagination from './common/pagination';
import paginate from './utils/paginate';
import MoviesTable from './moviesTable';

import _ from 'lodash';

import { Outlet } from 'react-router-dom';
import withRouter from './common/withRouter';
import SearchBox from './common/searchBox';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class Movies extends Component {
    state = { 
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        selectedGenre: null,
        sortColumn: { path:'title', order: 'asc'},
     } 
    
    async componentDidMount(){
        const { data } = await getGenres();
        const genres = [{name: 'All Genres'}, ...data];

        const {data: movies} = await getMovies();

        this.setState({movies, genres})
    }
    
    handleDeleteMovie = async (movie) =>{
        const originalMovies = this.state.movies;
        const movies = originalMovies.filter(m => m !== movie)
        this.setState({ movies });
        try{
            await deleteMovie(movie._id);
        }
        catch(ex){
            if (ex.response && ex.response.status === 404)
             toast.error('This movie has already been deleted');
            this.setState({movies: originalMovies});
        }
    }

    handleLike = (movie) =>{
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].isLiked = !movies[index].isLiked;

        this.setState({movies})
    }

    handlePageChange = page => {
        this.setState({currentPage : page});                
    }

    handleGenreSelect = selectedGenre =>{
        this.setState({selectedGenre, currentPage: 1, searchQuery:""});
    }

    handleSort = sortColumn =>{
        this.setState({sortColumn});
    }

    handleSearch = searchQuery =>{
        this.setState({searchQuery, selectedGenre: null, currentPage: 1});    
    }

    getPagedData = () =>{
        const { 
            pageSize, 
            currentPage, 
            movies: allMovies,  
            genres, 
            selectedGenre,
            sortColumn,
            searchQuery
        } = this.state;

        const filtered = selectedGenre && selectedGenre._id
            ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase())) || allMovies;

        // Mosh's variant of the code:
        //let filtered = allMovies;
        //  if (searchQuery)
        //      filtered = allMovies.filter(m => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        //  else if (selectedGenre && selectedGenre._id)
        //      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        
        const movies = paginate(sorted, currentPage, pageSize);

        return {data: movies, totalCount: filtered.length}
    }

    render() { 
        const { length: count } = this.state.movies;
        // if (count === 0) return(
        //     <p>There are no movies in Database!</p>
        // )

        const {   
            genres, 
            selectedGenre,
            sortColumn,
            pageSize,
            currentPage,
            searchQuery
        } = this.state;

        const {data: movies, totalCount} = this.getPagedData();   
        const {location, navigate} = this.props.router;
        const { user } = this.props;   
        return (
            <>
                <div className='row mt-5'>
                    <div className='col-3 col-sm-2 col-xs-1'>
                        <ListGroup 
                            items={genres}
                            onSelect={this.handleGenreSelect}
                            selectedItem={selectedGenre}
                            className=''/>
                    </div>
                    <div className="col">
                        {user && <Link className="btn btn-primary mb-2" to='new'>
                            New Movie
                        </Link>}

                        <p>Showing {totalCount} movies in the database. </p>

                        <SearchBox 
                            onChange={this.handleSearch} 
                            value={searchQuery}
                            />
                        
                        <MoviesTable 
                            onDeleteMovie={this.handleDeleteMovie}
                            movies={movies}
                            onLike={this.handleLike}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                            user={user}
                        />

                        <Pagination
                            totalItems={totalCount}
                            pageSize={pageSize}
                            onPageChange={this.handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
                <Outlet />
            </>
        );
    }
}
 
export default withRouter(Movies);