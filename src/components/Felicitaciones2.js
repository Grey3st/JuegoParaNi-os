import React from 'react';

function Felicitaciones2({ nombreJugador2, puntaje2 }) {
    return (
        <div>
            <h1>¡Felicitaciones, {nombreJugador2}!</h1>
            <p>Tu puntaje total es: {puntaje2}</p>
        </div>
    );
}

export default Felicitaciones2;