// import React from 'react';
// import Form from './common/form';
// import withRouter from './common/withRouter';

// import ListGroup from './common/listGroup';

// import { getGenres } from '../services/fakeGenreService';
// import { saveMovie, getMovie } from '../services/fakeMovieService';

// const Joi = require('joi-browser');



// class NewMovie extends Form {
//     state = { 
//         data:{
//             title: '',
//             numberInStock: '',
//             dailyRentalRate: '', 
//             genre: ''
//         },

//         genres: getGenres(),

//         errors:{}
//     } 
    
//     componentDidMount = () =>{
//         const movie = getMovie(this.props.router.id);
//         if (movie) this.setState({data: movie})
//     }

//     schema = {
//         title: 
//             Joi.string()
//             .required(),
//         genre:
//             Joi.required(),
//         numberInStock: 
//             Joi.number()
//             .min(0)
//             .max(100)
//             .required(),
//         dailyRentalRate:
//             Joi.number()
//             .min(0)
//             .max(11)
//             .required()
//     }

//     doSubmit = () =>{
//         console.log('New Movie saved');
//         const movie = this.state.data;
//         // console.log(movie);
//         saveMovie(movie);
//         this.props.router.navigate('/movies')

//     }

//     render() { 
//         return (
//             <div>
//                 <h2>Movie Form</h2>
//                 <form onSubmit={this.handleSubmit}>
//                     {this.renderInput('title', 'Title')}
//                     {this.renderDropDown('genre', 'Genre', this.state.genres)}
                
                        
//                     {this.renderInput('numberInStock', 'Number in Stock', 'number')}
//                     {this.renderInput('dailyRentalRate', 'Rate', 'number')}
//                     {this.renderButton('Save')}
//                 </form>
//             </div>
//         );
//     }
// }
 
// export default withRouter(NewMovie);