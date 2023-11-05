import React from 'react';
import styles from "./inicio.module.css"
function Felicitaciones({ nombreJugador, puntaje, nombreJugador2, puntaje2 }) {
    return (
        <div className= {styles.btn}>
            <h1> ¡Good job, {nombreJugador2}!</h1>
            <p>Your score is : {puntaje2}</p>
            <h1> ¡Good job, {nombreJugador}!</h1>
            <p>Your score is : {puntaje}</p>
        </div>
    );
}

export default Felicitaciones;