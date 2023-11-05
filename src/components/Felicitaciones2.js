import React from 'react';
import styles from "./inicio.module.css"
function Felicitaciones2({ nombreJugador2, puntaje2 }) {
    return (
        <div className= {styles.btn}>
            <h1> ¡Congratulations {nombreJugador2}!</h1>
            <p>Your score is : {puntaje2}</p>
        </div>
    );
}

export default Felicitaciones2;