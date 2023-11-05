import React from 'react';
import styles from "./inicio.module.css"

function Felicitaciones({ nombreJugador, puntaje }) {
    return (
        <div className= {styles.btn}>
            <h1>¡Congratulations {nombreJugador}!</h1>
            <p>Your score is: {puntaje}</p>
        </div>
    );
}

export default Felicitaciones;
