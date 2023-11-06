import React from 'react';
import styles from "./inicio.module.css"
function Felicitaciones({ nombreJugador, puntaje, nombreJugador2, puntaje2 }) {

    if (puntaje2 > puntaje) {
        return (
            <div className= {styles.btn}>
                <h1> ¡You win, {nombreJugador2}!</h1>
                <p>Your score is : {puntaje2}</p>
                <h1> You lose, {nombreJugador}...</h1>
                <p>Your score is : {puntaje}</p>
            </div>
        );
    } else if (puntaje > puntaje2){
        return (
            <div className= {styles.btn}>
            <h1> ¡You win, {nombreJugador}!</h1>
            <p>Your score is : {puntaje}</p>
            <h1> You lose, {nombreJugador2}...</h1>
            <p>Your score is : {puntaje2}</p>
        </div>
        );
    } if (puntaje == puntaje2) {
        return(
            <div className= {styles.btn}>
            <h1> {nombreJugador} and {nombreJugador2} have the same score!</h1>
            <p> The score is: {puntaje}</p>
        </div>
        );
    }

}

export default Felicitaciones;