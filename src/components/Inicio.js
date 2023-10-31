import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function Inicio() {
    const [nombreJugador, setNombreJugador] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);

    const manejarClickJugar = (nombre) => {
        setNombreJugador(nombre);
        setMostrarJuego(true);
        setPuntaje(0);
        setMostrarFelicitaciones(false);
    };

    const alTerminar = (puntaje) => {
        setPuntaje(puntaje);
        setMostrarJuego(false);
        setMostrarFelicitaciones(true);
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div>
                <h1>Ingresa tu nombre</h1>
                <input
                    type="text"
                    placeholder="Nombre del niño"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador)}>Jugar</button>
            </div>
        );
    } else if (mostrarJuego) {
        return (
            <div>
                <Juego
                    nombreJugador={nombreJugador}
                    puntaje={puntaje}
                    setPuntaje={setPuntaje}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}

                />
            </div>
        );
    } else if (mostrarFelicitaciones) {
        return (
            <div>
                <Felicitaciones nombreJugador={nombreJugador} puntaje={puntaje} />
            </div>
        );
    }
}

export default Inicio;
