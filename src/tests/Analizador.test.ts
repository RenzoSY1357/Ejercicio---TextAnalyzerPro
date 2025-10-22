import { AnalizarTexto } from "../modules/Analizador";

describe("Pruebas del Analizador", () => {

    // Conteo de caracteres
    describe("Conteo de caracteres", () => {
        it("Texto vacio", () => {
            const resultado = AnalizarTexto("");
            expect(resultado.characterCount).toBe(0);
            expect(resultado.characterCountNoSpaces).toBe(0)
        })

        it("Solo espacios", () => {
            const resultado = AnalizarTexto("   ");
            expect(resultado.characterCount).toBe(3);
            expect(resultado.characterCountNoSpaces).toBe(0);
        })

        it("Texto normal", () => {
            const resultado = AnalizarTexto("Hola Martin");
            expect(resultado.characterCount).toBe(11);
            expect(resultado.characterCountNoSpaces).toBe(10);
        })
    })

    // Conteo de palabras
    describe("Conteo de palabras", () => {

        it("Texto vacío", () => {
            const resultado = AnalizarTexto("");
            expect(resultado.wordCount).toBe(0);
        })

        it("Texto con guiones", () => {
            const resultado = AnalizarTexto("Analizar-Texto");
            expect(resultado.wordCount).toBe(2);
        })

        it("Texto con mayusculas y minusculas", () =>{
            const resultado = AnalizarTexto("Hola hola hOlA");
            expect(resultado.wordFrequency.get("hola")).toBe(3);
        })
    })

    // Conteo de oraciones
    describe("Conteo de oraciones", () => {

        it("Texto con varias oraciones", () =>{
            const resultado = AnalizarTexto("hola que tal. hola que tal. hola que tal");
            expect(resultado.sentenceCount).toBe(3);

            const vacio = AnalizarTexto("");
            expect(vacio.sentenceCount).toBe(0);
        })
    })

    // Conteo de parrafos
    describe("Conteo de parrafos", () => {
        
        it("Texto con varios parrafos", () =>{
            const resultado = AnalizarTexto("Unparrafo\n\nDosparrafos\n\nTresparrafos\n");
            expect(resultado.paragraphCount).toBe(3);

            const vacio = AnalizarTexto("");
            expect(vacio.paragraphCount).toBe(0);
        })
    })

    // Longitud media de palabra
    describe("Longitud media de palabras", () => {

        it("Texto normal", () =>{
            const resultado = AnalizarTexto("Hola Mola");
            expect(resultado.averageWordLength).toBeCloseTo(4);

            const vacio = AnalizarTexto("");
            expect(vacio.averageWordLength).toBe(0);
        })
    })

    // Numero medio de palabras por oracion
    describe("Numero medio de palabras por oracion", () => {
        
        it("Texto normal", () => {
            const resultado = AnalizarTexto("Hola quetal. Adios quetal");
            expect(resultado.averageSentenceLength).toBeCloseTo(2);

            const vacio = AnalizarTexto("");
            expect(vacio.averageSentenceLength).toBe(0);
        })
    })

    //ESTO ES PARA matar unos mutantes de Jest y llegar al 85%
    describe("Pruebas de frecuencia de palabras", () => {

        it("Texto vacio debe devolver un Map vacio", () => {
            const resultado = AnalizarTexto("");
            expect(resultado.wordFrequency.size).toBe(0);
        })

        it("Texto solo con espacios debe devolver un Map vacio", () => {
            const resultado = AnalizarTexto("    ");
            expect(resultado.wordFrequency.size).toBe(0);
        })
    })
})