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
        for (let i=0; i< movie.genre_ids.lenght; i++){
            switch (movie.genre_ids[0]) {
                case 28: genreArray.push("Action");
                break;
                case 12: genreArray.push("Aventure");
                break;
                case 16: genreArray.push("Animation");
                break;
                case 35: genreArray.push("Comédie");
                break;
                case 80: genreArray.push("Policier");
                break;
                case 99: genreArray.push("Documentaire");
                break;
                case 18: genreArray.push("Drame");
                break;
                case 10751: genreArray.push("Famille");
                break;
                case 14: genreArray.push("Fantaisie");
                break;
                case 14: genreArray.push("Fantaisie");
                break;
                case 36: genreArray.push("Histoire");
                break;
                case 27: genreArray.push("Horreur");
                break;
                case 10482: genreArray.push("Musique");
                break;
                case 9648: genreArray.push("Mystère");
                break;
                case 10749: genreArray.push("Romance");
                break;
                case 878: genreArray.push("Science-fiction");
                break;
                case 10770: genreArray.push("Téléfilm");
                break;
                case 53: genreArray.push("Thriller");
                break;
                case 10752: genreArray.push("Guerre");
                break;
                case 37: genreArray.push("Western");
                break;
                default: break;
            }
        }
        // on oublie pas de retourner genreAray en lui faisant un map pour retourner des li
        return genreArray.map((genre) => <li key={genre} >{genre}</li>);
    }
    return (
        <div className='card'>
            {/* si il y a une img tu me l'affiches sinon tu m'affiches celle du fichier */}
            <img src={movie.poster_path ? 'https://image.tmdb.org/t/p/original' + movie.poster_path : "./img/poster.jpg"} alt={`affiche ${movie.title}`}/>
            <h2>{movie.title}</h2>
            {movie.release_date ? 
                <h5>Sorti le : {dateFormater(movie.release_date)}</h5> : null}
            <h4>{movie.vote_average}/10 <span>⭐</span></h4>
            {/* on recupère l'émoji sur google */}
            <ul>
                {
                    movie.genre_ids ? genreFinder() : null
                }
            </ul>
            {/* si le synopsis existe alors tu me lemt sinon tu me met des guillemets vides */}
            {movie.overview ? <h3>Synopsis</h3> : ""}
            <p>{movie.overview}</p>
        </div>
    );
};

export default Card;