import React from 'react';
import Form from './common/form';
import withRouter from './common/withRouter';

import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService';

const Joi = require('joi-browser');



class MovieForm extends Form {
    state = { 
        data:{
            title: '',
            numberInStock: '',
            dailyRentalRate: '', 
            genreId: ''
        },

        genres: [],

        errors:{}
    } 

    async populateGenres() {
        const {data: genres} = await getGenres();
        this.setState({genres});
    }

    async populateMovies() {      
        try{
            const movieId = this.props.router.params.id;
            if (movieId === 'new') return;

            const {data : movie} = await getMovie(movieId);
            this.setState({data: this.mapToViewModel(movie) });        
        }
        catch(ex){
            this.props.router.navigate('/notFound', {replace: true});
        }
    }
    
     componentDidMount = async () =>{
        await this.populateGenres();
        await this.populateMovies();
    }

    mapToViewModel(movie){
        console.log(movie.genre._id)
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    schema = {
        _id: Joi.string(),
        title: 
            Joi.string()
            .required()
            .label('Title'),
        genreId: 
            Joi.string()
            .required()
            .label('Genre'),
        numberInStock: 
            Joi.number()
            .min(0)
            .max(100)
            .required()
            .label('Stock'),
        dailyRentalRate:
            Joi.number()
            .min(0)
            .max(11)
            .required()
            .label('Rate')
    }

    doSubmit = async () =>{
    
        await saveMovie(this.state.data);
        this.props.router.navigate('/movies');

    }

    render() { 
        return (
            <div>
                <h2>Movie Form</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title', 'Title')}
                    {this.renderSelect('genreId', 'Genre', this.state.genres)}
                    {this.renderInput('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInput('dailyRentalRate', 'Rate', 'number')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default withRouter(MovieForm);