import type { TextStatistics } from "../types/TextStatistics";

//* FUNCION PRINCIPAL
/**
 * Analiza el texto recibido y devuelve estadísticas detalladas.
 * @param text Texto a analizar.
 * @returns Un objeto con las estadísticas del texto.
 */
export function AnalizarTexto(text:string): TextStatistics {
    return {
        characterCount: ContarCaracteres(text),

        characterCountNoSpaces: ContarCaracteresSinSpacio(text),

        wordCount: ContarPalabras(text),

        sentenceCount: ContarOraciones(text),

        paragraphCount: ContarParrafos(text),

        averageWordLength: LongitudMediaPalabras(text),

        averageSentenceLength: NumeroMedioPalabrasOracion(text),

        wordFrequency: FrecuenciaPalabras(text)
    }
}
    //*CONTADORES
    /**
     * Cuenta el número total de caracteres en el texto.
     * @param text Texto a analizar.
     * @returns Número de caracteres.
     */
    function ContarCaracteres(text: string): number {
        return text.length;
    }

    /**
     * Cuenta el número de caracteres en el texto excluyendo los espacios en blanco.
     * @param text Texto a analizar.
     * @returns Número de caracteres sin espacios.
     */
    function ContarCaracteresSinSpacio(text: string): number {
        return text.replace(/\s/g, '').length;
        // "/, 'inicia una expresion regular',\s => todos los espacios en blanco, pero solo los cuenta 1na vez por defecto 'g'=> global, TODOS los espacios en blanco"
        // todos los espacios en blanco seran reemplazados por un ''
    }

    /**
     * Cuenta el número de palabras en el texto.
     * @param text Texto a analizar.
     * @returns Número de palabras.
     */
    function ContarPalabras(text: string): number{
        const palabras = text.match(/\b\w+\b/g) || [];
        // const palabras = text.trim().split(/\s+/).filter(Boolean); // Con un filter(boolean), filtro todos caracteres/palabras vacias
        // recuerda todo el resultado del split se pasa a un array
        return palabras.length;
    }

    /**
     * Cuenta el número de oraciones en un texto dado.
     *
     * Una oración se considera como una secuencia de caracteres que termina en '.', '!' o '?'.
     * Se eliminan los espacios en blanco al inicio y al final de cada oración antes de contarla.
     * Las oraciones vacías no se cuentan.
     *
     * @param text - El texto en el que se desea contar las oraciones.
     * @returns El número de oraciones encontradas en el texto.
     */
    function ContarOraciones(text: string): number {
        const oraciones = text.split(/[.!?]+/).filter( o => o.trim().length > 0);
        // Con text.split
            // => /[.!?+/] => '.!?+' divide las oraciones en partes, con caracteres que terminen en '.', '!', o '?'
            //         , el '+', es para que no halla redundancia entre los caracteres
        // Con el filter( s => s.trim().length > 0)
            // realiza un filtrado, se pasa la oracion, a un trim(), para quitar los espacios en blanco al inicio y al final
            // , luego, se verifica que la oracion, no sea una oracion vacia con > 0, si lo es, no lo añade al nuevo array de cadenas filtradas
        return oraciones.length;
    }

    /**
    * Cuenta el número de párrafos en el texto.
    * Un párrafo se considera como una secuencia de texto separada por dos o más saltos de línea.
    * @param text Texto a analizar.
    * @returns Número de párrafos.
    */
    function ContarParrafos(text: string): number {
        const parrafos = text.split(/\n{2,}/).filter(p => p.trim().length > 0);
        // En este caso, con '\n{2,}' => una nueva linea, no usamos '+', por que se especifica que debe excluir desde 2 o mas saltos lineas,
        // => ya que si solo usamos '+', incluira las oraciones normales que solo poseen un salto de linea
        return parrafos.length;
    }


    //* LONGITUD MEDIA
    /**
     * Calcula la longitud media de las palabras en un texto dado.
     *
     * Utiliza una expresión regular para extraer las palabras del texto y luego calcula el promedio de la longitud de todas las palabras encontradas.
     * Si no se encuentra ninguna palabra, retorna 0.
     *
     * @param text - El texto sobre el cual se calculará la longitud media de las palabras.
     * @returns La longitud media de las palabras en el texto. Si no hay palabras, retorna 0.
     */
    function LongitudMediaPalabras (text: string): number {

        const word = text.match(/\b\w+\b/g) || []; // si ninguna entrada encaja dentro de la expresion regular, retorna un array vacio
        // Con match, sacamos las palabras dentro del texto \b \b -> indica el inicio y fin de la palabra en extraccion
        // \w divide por caracteres, si le agregamos '+', 1 o mas caracteres, (para que filtre por palabras y no caracteres)
        // Este metodo es mas preciso que el del split, pero mas lento...?

        // verificador
        if (word.length === 0) return 0;

        const totalLength = word.reduce((sum, w) => sum + w.length, 0);
        // en la funcion reduce (callback), sum es un acumulador y w es un valor a agregar al acumulador,
        // basicamente, sum, es como un for each, pero mas abreviado., 0 tomara el valor del acumulador,
        // la funcion retornara el valor acumulado.
        // recuerda que word, es un array, reduce llama a la funcion por cada palabra dentro del array

        return parseFloat((totalLength/word.length).toFixed(1)); // Retorna el promedio dividiendo por la longitud acumulada y el numero total de palabras en el array
    }


    /**
     * Calcula el número medio de palabras por oración en el texto.
     * @param text Texto a analizar.
     * @returns Número medio de palabras por oración.
     */
    function NumeroMedioPalabrasOracion(text:string): number {

        // Oraciones
        const sentences = text.split(/[.!?]+/).filter( s => s.trim().length > 0); // [.!?] => conjunto de 1 signo de puntuacion o '+'mas...
        // divide las oraciones entre signos de puntuacion, de ahi las valida si realmente son oraciones y las añade a un array.

        // verificador
        if (sentences.length === 0) return 0;

        // Total de palabras de las oraciones
        const words = text.match(/\b\w+\b/g) || [];


        // Total de palabras / numero de oraciones
        return parseFloat((words.length / sentences.length).toFixed(1)); // Numero medio de palabras por oracion
    }

    //* FRECUENCIA
    /**
     * Calcula la frecuencia de cada palabra en el texto.
     * Convierte el texto a minúsculas y cuenta cuántas veces aparece cada palabra.
     * @param text Texto a analizar.
     * @returns Mapa con la frecuencia de cada palabra.
     */
    function FrecuenciaPalabras(text: string): Map<string, number>{

        const words = text.toLowerCase().match(/\b\w+\b/g) || [];

        const freq = new Map<string, number>();

        for (const word of words){
            freq.set(word, (freq.get(word) || 0)+ 1);
            // actualiza el valor de la clave dentro del mapeo de las palabras
            // Si NO se encuentra la palabra dentro del mapa, se añade 1 (ya que se esta ingresando la palabra)
            // Si se encuentra la palabra dentro del mapa, se añade 1 (ya que encontraste otra palabra igual).
        }

        return freq; // Retorna un mapeo clave-valor de (palabra->(ºn)frecuencia)
    }
    
    

