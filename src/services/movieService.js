import http from "./httpService";

const apiEndpoint = '/movies';

function movieUrl (id) {
  return `${apiEndpoint}/${id}`
}

export function getMovies(){
    return http.get(apiEndpoint);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}

export function getMovie(id) {
    return http.get(movieUrl(id));
  }
  

export async function saveMovie(movie) { 
  if (movie._id) {
    const body = {...movie};
    delete body._id;
    http.put(movieUrl(movie._id), body)
  }
  else http.post(apiEndpoint, movie);
  
  return movie;
  }
//---------------------------------------------------------------------

  