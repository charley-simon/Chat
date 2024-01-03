import { readFileSync } from 'fs'

export class Record {
  id = null;
  data = null;
  constructor(data = null) {
    this.id = Math.round(Date.now() / 1000);
    this.data = data;
  }

  save() {
    /* ... */
    console.log( "Record saved" );
    return this;
  }

  load( id = null ) {
    /* ... */
    if( id !== null ) {
      this.id = id;
      this.data = movies[id];
      // Object.assign(this, movies[id]);
    }
    console.log( "Record loaded" );

    return this;
  }

  toString() {
    return `Id: ${this.id}, `/* + data.toString()*/;
  }

  static getNew( id = null ) {
    const movie = new Record( id );
    if( id !== null ) {
      movie.data = movies[id];
    }
    console.log( "New record" );
    return movie;
  }
}

var movies = [];

function readMoviesFile( fileName ) {
  console.log( "reading file: " + fileName );
  const data = () => readFileSync(fileName, 'utf8');
  return JSON.parse(data());
}

movies = readMoviesFile( "./public/wikipedia-movie-data-master/movies-2020s.json" )

/*
function mix(...mixins) {
  class Mix {}

  // Programmatically add all the methods and accessors
  // of the mixins to class Mix.
  for (let mixin of mixins) {
      copyProperties(Mix, mixin);
      copyProperties(Mix.prototype, mixin.prototype);
  }
  
  return Mix;
}

function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
      if (key !== "constructor" && key !== "prototype" && key !== "name") {
          let desc = Object.getOwnPropertyDescriptor(source, key);
          Object.defineProperty(target, key, desc);
      }
  }
}
*/

export function getMovie( id = null ) {
  const movie = movies[id];
  // Object.setPrototypeOf(movie.prototype, Record.prototype);
  console.log( "movie.prototype: " + movie.prototype )
  console.log( "Record.prototype: " + Record.prototype )
  Object.setPrototypeOf(movie, Record.prototype);
  movie.id = id;
  console.log( movie );
  return movie;
}

// export {Record, getMovie};