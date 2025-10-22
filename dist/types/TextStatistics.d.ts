/**
 * Representa las estadísticas generadas a partir del análisis de un texto.
 * @property characterCount Número total de caracteres (incluyendo espacios).
 * @property characterCountNoSpaces Número total de caracteres (sin espacios).
 * @property wordCount Número total de palabras.
 * @property sentenceCount Número total de oraciones.
 * @property paragraphCount Número total de párrafos.
 * @property averageWordLength Longitud media de las palabras.
 * @property averageSentenceLength Media de palabras por oración.
 * @property wordFrequency Frecuencia de cada palabra en el texto.
 */
export interface TextStatistics {
    characterCount: number;
    characterCountNoSpaces: number;
    wordCount: number;
    sentenceCount: number;
    paragraphCount: number;
    averageWordLength: number;
    averageSentenceLength: number;
    wordFrequency: Map<string, number>;
}
//# sourceMappingURL=TextStatistics.d.ts.map