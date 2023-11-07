import React, { useState, useEffect } from 'react';
import dataAnimal2 from '../data/dataAnimal.json';
import styles2 from "./inicio.module.css";

function Juego2({ nombreJugador2, puntaje2, setPuntaje2, alTerminar2, rondaActual2, setRondaActual2 }) {
  const [animalObjetivo2, setAnimalObjetivo2] = useState({});
  const [opciones2, setOpciones2] = useState([]);
  const [esCorrecto2, setEsCorrecto2] = useState(null);
  const [rondasTotales2, setRondasTotales2] = useState(Math.floor(Math.random() * 6) + 5);
  const [puedeHacerClic2, setPuedeHacerClic2] = useState(true);
  const [audioContext2, setAudioContext2] = useState(null);
  const [audioBuffer2, setAudioBuffer2] = useState(null);

  const loadAudio2 = async (audioUrl2) => {
    const response2 = await fetch(audioUrl2);
    const arrayBuffer2 = await response2.arrayBuffer();
    const audioContext2 = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer2 = await audioContext2.decodeAudioData(arrayBuffer2);
    setAudioContext2(audioContext2);
    setAudioBuffer2(audioBuffer2);
  };

  const playSound2 = () => {
    if (animalObjetivo2 && animalObjetivo2.sonido && audioContext2 && audioBuffer2) {
      const source2 = audioContext2.createBufferSource();
      source2.buffer = audioBuffer2;
      source2.connect(audioContext2.destination);
      source2.start();
    }
  };

  const obtenerAnimalAleatorio2 = () => {
    const indiceAleatorio2 = Math.floor(Math.random() * dataAnimal2.length);
    return dataAnimal2[indiceAleatorio2];
  };

  const obtenerOpcionesAleatorias2 = () => {
    const animalCorrecto2 = obtenerAnimalAleatorio2();
    let opcionesAleatorias2 = [animalCorrecto2];

    while (opcionesAleatorias2.length < 3) {
      const opcion2 = obtenerAnimalAleatorio2();
      if (!opcionesAleatorias2.includes(opcion2)) {
        opcionesAleatorias2.push(opcion2);
      }
    }

    opcionesAleatorias2 = opcionesAleatorias2.sort(() => Math.random() - 0.5);

    setOpciones2(opcionesAleatorias2);
    setAnimalObjetivo2(animalCorrecto2);
    loadAudio2(animalCorrecto2.sonido);
  };

  const verificarRespuesta2 = (animalSeleccionado2) => {
    if (animalSeleccionado2 === animalObjetivo2) {
      setEsCorrecto2(true);
      playSound2();
      setPuntaje2(puntaje2 + 1);
    } else {
      setEsCorrecto2(false);
    }
    setPuedeHacerClic2(false);
  };

  const siguienteRonda2 = () => {
    if (rondaActual2 < rondasTotales2) {
      setRondaActual2(rondaActual2 + 1);
      setEsCorrecto2(null);
      setPuedeHacerClic2(true);
      obtenerOpcionesAleatorias2();
    } else {
      alTerminar2(puntaje2);
    }
  };

  const opcionesDeshabilitadas2 = esCorrecto2 !== null;

  useEffect(() => {
    obtenerOpcionesAleatorias2();
  }, []);

  useEffect(() => {
    if (audioContext2) {
      audioContext2.resume();
    }
  }, [audioContext2]);

  return (
    <div className={styles2.btn}>
      <h1>{nombreJugador2} what is this animal?</h1>
      <p className={styles2.game}>Game round: {rondaActual2}</p>
      <img src={animalObjetivo2.imagen} alt={animalObjetivo2.nombre} />
      <div>
        {opciones2.map((animal2) => (
          <button
            key={animal2.nombre}
            onClick={() => verificarRespuesta2(animal2)}
            disabled={!puedeHacerClic2 || opcionesDeshabilitadas2}
          >
            {animal2.nombre}
          </button>
        ))}
      </div>
      {esCorrecto2 === true && <p className={styles2.true}>¡Correct!</p>}
      {esCorrecto2 === false && <p className={styles2.false}>¡Incorrect!</p>}
      <button onClick={siguienteRonda2}>Next</button>
    </div>
  );
}

export default Juego2;