import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';
import Juego2 from './Juego2';
import Felicitaciones2 from './Felicitaciones2';
import styles from "./inicio.module.css";
function Inicio() {
    const [nombreJugador, setNombreJugador] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);

    const [nombreJugador2, setNombreJugador2] = useState('');
    const [mostrarJuego2, setMostrarJuego2] = useState(false);
    const [puntaje2, setPuntaje2] = useState(0);
    const [mostrarFelicitaciones2, setMostrarFelicitaciones2] = useState(false);
    const [rondaActual2, setRondaActual2] = useState(1);

    const manejarClickJugar = (nombre) => {
        setNombreJugador(nombre);
        setMostrarJuego(true);
        setPuntaje(0);
        setMostrarFelicitaciones(false);
    };

    const manejarClickJugar2 = (nombre2) => {
        setNombreJugador2(nombre2);
        setMostrarJuego2(true);
        setPuntaje2(0);
        setMostrarFelicitaciones2(false);
    };

    const alTerminar = (puntaje) => {
        setPuntaje(puntaje);
        setMostrarJuego(false);
        setMostrarFelicitaciones(true);
    };

    const alTerminar2 = (puntaje2) => {
        setPuntaje2(puntaje2);
        setMostrarJuego2(false);
        setMostrarFelicitaciones2(true);
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div className={styles.btn}>
                <h1>Write your name player 1</h1>
                <input
                    type="text"
                    placeholder="Kid's name"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <button onClick={() => manejarClickJugar(nombreJugador)}>Play</button>
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
    } 
    

    if (mostrarFelicitaciones===true && !mostrarJuego2 && !mostrarFelicitaciones2) {
        return (
            <div className= {styles.btn}> 
                <h1>Write your name player 2</h1>
                <input
                    type="text"
                    placeholder="kid's name 2"
                    onChange={(e) => setNombreJugador2(e.target.value)}
                />
                <button onClick={() => manejarClickJugar2(nombreJugador2)}>Play 2</button>
            </div>
        );
    } else if (mostrarJuego2) {
        return (
            <div>
                <Juego2
                    nombreJugador2={nombreJugador2}
                    puntaje2={puntaje2}
                    setPuntaje2={setPuntaje2}
                    alTerminar2={alTerminar2}
                    rondaActual2={rondaActual2}
                    setRondaActual2={setRondaActual2}

                />
            </div>
        );
    }
    
    else if (mostrarFelicitaciones===true && mostrarFelicitaciones2===true) {
        return (
            <div>
                <Felicitaciones nombreJugador={nombreJugador} puntaje={puntaje} />
                <Felicitaciones2 nombreJugador2={nombreJugador2} puntaje2={puntaje2} />
            </div>
        );
    }
}

export default Inicio;
