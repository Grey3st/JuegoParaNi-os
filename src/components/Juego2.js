import React, { useState, useEffect } from 'react';
import dataAnimal from '../data/dataAnimal.json';
import styles from "./inicio.module.css";

function Juego2({ nombreJugador2, puntaje2, setPuntaje2, alTerminar2, rondaActual2,setRondaActual2 }) {
    const [animalObjetivo2, setAnimalObjetivo2] = useState('');
    const [opciones2, setOpciones2] = useState([]);
    const [esCorrecto2, setEsCorrecto2] = useState(null);
    const [rondasTotales2, setRondasTotales2] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic2, setPuedeHacerClic2] = useState(true);
  

    const obtenerAnimalAleatorio2 = () => {
        const indiceAleatorio2 = Math.floor(Math.random() * dataAnimal.length);

        const arrayNombres2 = dataAnimal.map(objeto => objeto.nombre);
        return arrayNombres2[indiceAleatorio2];
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
    };

    const verificarRespuesta2 = (animalSeleccionado2) => {
        if (animalSeleccionado2 === animalObjetivo2) {
            setEsCorrecto2(true);
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

    return (
        <div className= {styles.btn}>
            <h1>{nombreJugador2}, what is this animal?</h1>
            <p className={styles.game}>Game round: {rondaActual2}</p>
            <img src={`img/${animalObjetivo2}.png`} alt={animalObjetivo2} />
            <div>
                {opciones2.map((animal2) => (
                    <button
                        key={animal2}
                        onClick={() => verificarRespuesta2(animal2)}
                        disabled={!puedeHacerClic2 || opcionesDeshabilitadas2}
                    >
                        {animal2}
                    </button>
                ))}
            </div>
            {esCorrecto2 === true && <p className= {styles.true}>¡Correct!</p>}
            {esCorrecto2 === false && <p className= {styles.false}>¡Incorrect!</p>}
            <button onClick={siguienteRonda2}>Next</button>
        </div>
    );
}

export default Juego2;

