import { AnalizarTexto } from "../modules/Analizador.js";

/**
 * Actualiza todas las estadísticas en tiempo real usando AnalizarTexto.
 * @param text El texto actual del textarea.
 */
function actualizarEstadisticas(text: string){

    const resultado = AnalizarTexto(text);

    // FUNCIONES:
    document.querySelector("#ContadorPalabras")!.textContent=resultado.wordCount.toString();
    document.querySelector("#TotalCaracteres")!.textContent=resultado.characterCount.toString();
    document.querySelector("#TotalOraciones")!.textContent=resultado.sentenceCount.toString();
    document.querySelector("#TotalParrafos")!.textContent=resultado.paragraphCount.toString();
    document.querySelector("#MediaPalabras")!.textContent=resultado.averageWordLength.toString();
    document.querySelector("#MediaPalabrasOracion")!.textContent=resultado.averageSentenceLength.toString();
    // document.querySelector("#PalabrasPrincipales")!.textContent=resultado.wordFrequency.toString();


    //PALABRAS PRINCIPALES:
    const PalabrasClave = document.querySelector("#PalabrasClave") as HTMLOListElement; //necesita esto de HTML..., para que reconozca que es un ol
        PalabrasClave.innerHTML = ""; // Restea la lista

    const ArrayPalabras: [string, number][] = Array.from(resultado.wordFrequency);

        // Filtra palabras que aparecen más de 2 veces
        const ArrayFrecuencia = ArrayPalabras.filter(([_, freq]) => freq > 3);

        //Esto es un bubble sort descendente (De Mayor a menor)
        for (let i=0; i<ArrayFrecuencia.length - 1; ++i){
            for(let j = 0; j < ArrayFrecuencia.length - i - 1; ++j){

                if (ArrayFrecuencia[j]![1] < ArrayFrecuencia[j+1]![1]) {
                    const temp = ArrayFrecuencia[j]!
                    ArrayFrecuencia[j] = ArrayFrecuencia[j+1]!;
                    ArrayFrecuencia[j+1] = temp;
                }
            }
        }
        //imprime el array ordenado con el bubble sort
        for (const [word, freq] of ArrayFrecuencia){
            const li = document.createElement("li");
            li.innerHTML = `   <strong>${word}</strong> (x${freq})`;
            PalabrasClave.appendChild(li);
        }
}

const textarea = document.querySelector(".texto") as HTMLTextAreaElement;

// Actualiza la salida, cada vez que se ingresa texto
textarea.addEventListener("input", () => {
    actualizarEstadisticas(textarea.value)
})

