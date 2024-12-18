import React from 'react';

const Card = ({movie}) => {
    // sans les acolades on aurait du écrire une deuxième fois movie
    const dateFormater = (date) => {
        // le split signifie partout où tu vois un tiret tu casses
        let [yy, mm, dd] = date.split("-");
        // ensuite on fait l'inverse du split, le join pour joindre un slash
        return [dd, mm, yy].join("/")
    }
    const genreFinder = () => {
        // on remplit manuellement avec une boucle for et un switch en fonction des ids car certains sont bcp trop élevés. ON crée d'abord un Array et esnuite avec le switch on va push les infos en fonction de l'id
        let genreArray = [];
        for (let i = 0; i < movie.genre_ids.length; i++) {
          switch (movie.genre_ids[i]) {
            case 28:
              genreArray.push(`Action`);
              break;
            case 12:
              genreArray.push(`Aventure`);
              break;
            case 16:
              genreArray.push(`Animation`);
              break;
            case 35:
              genreArray.push(`Comédie`);
              break;
            case 80:
              genreArray.push(`Policier`);
              break;
            case 99:
              genreArray.push(`Documentaire`);
              break;
            case 18:
              genreArray.push(`Drame`);
              break;
            case 10751:
              genreArray.push(`Famille`);
              break;
            case 14:
              genreArray.push(`Fantasy`);
              break;
            case 36:
              genreArray.push(`Histoire`);
              break;
            case 27:
              genreArray.push(`Horreur`);
              break;
            case 10402:
              genreArray.push(`Musique`);
              break;
            case 9648:
              genreArray.push(`Mystère`);
              break;
            case 10749:
              genreArray.push(`Romance`);
              break;
            case 878:
              genreArray.push(`Science-fiction`);
              break;
            case 10770:
              genreArray.push(`Téléfilm`);
              break;
            case 53:
              genreArray.push(`Thriller`);
              break;
            case 10752:
              genreArray.push(`Guerre`);
              break;
            case 37:
              genreArray.push(`Western`);
              break;
            default:
              break;
          }
        }
        // on oublie pas de retourner genreAray en lui faisant un map pour retourner des li
        return genreArray.map((genre) => <li key={genre}>{genre}</li>);
      };
    
    // pour la function on doit addStorage on stocke le film avec l'id du film
    function addStorage(){
        // on déclare une var si il y quelques chose dans le local storage tu me l'affiche en mettant des virgules sinon tableau vide
        let storedData = window.localStorage.movies ? window.localStorage.movies.split(",") : [];
        // si il n'y a pas de movie.id(passé en string car de base c un number) dans le tableau alors tu me fais un push de movie.id. en gros on s'assure qu'il n'y a pas de double et ensuite on le push
        if(!storedData.includes(movie.id.toString())){
            storedData.push(movie.id);
            // dans le localStorage la boite va s'appeler movies:
            window.localStorage.movies = storedData
        }
    }
    const deleteStorage = () => {
        // on récupère la data qui est stockée
        let storedData = window.localStorage.movies.split(",");
        // tous les id qui ne sont pas égaux à movie.id tu les gardes donc tu supprimes celui qui a le mm id et après on refait un stockage
        let newData = storedData.filter((id) => id != movie.id)
        window.localStorage.movies = newData;
    }
    return (
        <div className='card'>
            {/* si il y a une img tu me l'affiches sinon tu m'affiches celle du fichier */}
            <img src={movie.poster_path ? 'https://image.tmdb.org/t/p/original' + movie.poster_path : "./img/poster.jpg"} alt={`affiche ${movie.title}`}/>
            <h2>{movie.title}</h2>
            {movie.release_date ? 
                <h5>Sorti le : {dateFormater(movie.release_date)}</h5> : null}
            <h4>{movie.vote_average.toFixed(1)}/10 <span>⭐</span></h4> 
            {/* tofixed c'est la méthode pour mettre un chiffre après la virgule */}
            {/* on recupère l'émoji sur google */}
            <ul>
              {/* si il y a genre id tu m'appelles la function sinon on va chercher le genre de l'autre fetch */}
                {
                    movie.genre_ids ? genreFinder() : movie.genres.map((genre) => 
                        <li key={genre}>{genre.name}</li>
                    )
                }
            </ul>
            {/* si le synopsis existe alors tu me le met sinon tu me met des guillemets vides */}
            {movie.overview ? <h3>Synopsis</h3> : ""}
            <p>{movie.overview}</p>
            {/* étant donné que dans le fetch du form il y a genre_ids mais que dans le fetch du likePage ça s'appelle uniquement genre on va jouer sur ces 2 paramètres pour différencier les btns */}
            {movie.genre_ids ? (
                <div className="btn" onClick={() => addStorage()}>Ajouter au coups de coeur</div>
            ) : (
                <div className="btn" onClick={() => {deleteStorage();
                    window.location.reload();
                }}>Supprimer de la liste</div>
             
            )} 
        </div>
    );
};

export default Card;