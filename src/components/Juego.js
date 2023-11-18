import React, { useState, useEffect } from 'react';
import dataAnimal from '../data/dataAnimal.json';
import styles from "./inicio.module.css";

function Juego({ nombreJugador, puntaje, setPuntaje, alTerminar, rondaActual, setRondaActual }) {
    const [animalObjetivo, setAnimalObjetivo] = useState({});
    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);
    const [audioContext, setAudioContext] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [usarComodin, setUsarComodin] = useState(true);

    const usarComodinHandler = () => {
        if (usarComodin) {
            const opcionesConComodin = opciones.slice(); // Clonar opciones para no modificar el estado directamente
            const opcionesIncorrectas = opcionesConComodin.filter(animal => animal !== animalObjetivo);
            const opcionEliminada = opcionesIncorrectas[Math.floor(Math.random() * opcionesIncorrectas.length)];

            opcionesConComodin.splice(opcionesConComodin.indexOf(opcionEliminada), 1);

            setOpciones(opcionesConComodin);
            setUsarComodin(false);
        }
    };

    const loadAudio = async (audioUrl) => {
        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioContext(audioContext);
        setAudioBuffer(audioBuffer);
    };

    const playSound = () => {
        if (animalObjetivo && animalObjetivo.sonido && audioContext && audioBuffer) {
            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.start();
        }
    };

    const obtenerAnimalAleatorio = () => {
        const indiceAleatorio = Math.floor(Math.random() * dataAnimal.length);
        return dataAnimal[indiceAleatorio];
    };

    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.includes(opcion)) {
                opcionesAleatorias.push(opcion);
            }
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
        loadAudio(animalCorrecto.sonido); // Cargar el audio para el animal correcto
    };

    const verificarRespuesta = (animalSeleccionado) => {
        if (animalSeleccionado === animalObjetivo) {
            setEsCorrecto(true);
            playSound();
            setPuntaje(puntaje + 1);
        } else {
            setEsCorrecto(false);
        }
        setPuedeHacerClic(false);
    };

    const siguienteRonda = () => {
        if (rondaActual < rondasTotales) {
            setRondaActual(rondaActual + 1);
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
        } else {
            alTerminar(puntaje);
        }
    };

    const opcionesDeshabilitadas = esCorrecto !== null;

    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    useEffect(() => {
        if (audioContext) {
            audioContext.resume();
        }
    }, [audioContext]);

    return (
        <div className={styles.btn}>
            <h1>{nombreJugador} what is this animal?</h1>
            <p className={styles.game}>Game round: {rondaActual}</p>
            <img src={animalObjetivo.imagen} alt={animalObjetivo.nombre} />
            <div>
                {opciones.map((animal) => (
                    <button
                        key={animal.nombre}
                        onClick={() => verificarRespuesta(animal)}
                        disabled={!puedeHacerClic || opcionesDeshabilitadas}
                    >
                        {animal.nombre}
                    </button>
                ))}
                <button onClick={usarComodinHandler} disabled={!usarComodin || opcionesDeshabilitadas}>
                    Use Wildcard
                </button>
            </div>
            {esCorrecto === true && <p className={styles.true}>¡Correct!</p>}
            {esCorrecto === false && <p className={styles.false}>¡Incorrect!</p>}
            <button onClick={siguienteRonda}>Next</button>
        </div>
    );
}

export default Juego;