import { clear } from "console";
import { Record, getMovie } from "./movie.js"

const movie = Record.getNew(0);
console.log( `Record.getNew(0). Id: ${movie.id}, Title: ${movie.data.title}, Year: ${movie.data.year}`);
movie.load(3);
console.log( `movie.load(3). Id: ${movie.id}, Title: ${movie.data.title}, Year: ${movie.data.year}`);
// console.log( movie );
const movie2 = Record.getNew(1);
console.log( `Record.getNew(1). Id: ${movie2.id}, Title: ${movie2.data.title}, Year: ${movie2.data.year}`);
//movie.load();
//movie.save();

/*
const myMovie = getMovie(4);
console.log( `getMovie(4). Id: ${myMovie.id}, Title: ${myMovie.title}, Year: ${myMovie.year}`);
myMovie.load(5);
console.log( `myMovie.load(5). Id: ${myMovie.id}, Title: ${myMovie.title}, Year: ${myMovie.year}`);
*/
/*
// Un objet JS
const jsnMovie = movies[0];
console.log( jsnMovie );
// sauvegarde en string
const strMovie = JSON.stringify(jsnMovie);
console.log( strMovie );
// création d'un nouvel objet JS à partir d'un bloc Json
const objMovie = JSON.parse( strMovie );
console.log( objMovie );
*/