import { readFile } from 'fs'

function loadFile( fileName ) {
  console.log( "Loading " + fileName )
  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        console.log( err );
        reject(new Error('Echec de chargement de ' + fileName));
      }
    });
    resolve('Fichier ' + fileName + ' bien chargé');
    console.log(fileName);  
  });
}
/*
function loadScript(src){
  return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = src;
      document.head.append(script);
      script.onload = () => resolve('Fichier ' + src + ' bien chargé');
      script.onerror = () => reject(new Error('Echec de chargement de ' + src));
  });
}
*/
function trace( message = null ) {
    console.log( 'Super ! ' + message );
}

function erreur( message = null ) {
    console.error( 'Zut ! ' + message );
}

/* Décommentez le code pour qu'il s'exécute */
loadFile('./src/movie.js')
  .then(result => loadFile('./src/movie.njk'), error => erreur(error))
  .then(result => loadFile('./src/test-2.js'), error => erreur(error))
  .catch(error => {console.error("Zut ! ${error}")})
/*
    (message) => {console.log("super ! ${message}")}))
  .then(result2 => loadScript('movies-2020s.json',
    (message) => {console.log("super2 ! ${message}")}))
  .catch(error => {console.error("Zut ! ${error}")})
*/

/* Equivalent à 
loadScript('boucle.js')
  .then(function(result){
    return loadScript('script2.js', result);
  })
  .then(function(result2){
    return loadScript('script3.js', result2);
  })
  .catch(alert);
*/