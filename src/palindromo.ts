export const esPalindromo = (frase: string) => {
    // Convertir la entrada a string, si no lo es
    const fraseString = String(frase);
    
    // Eliminar espacios y convertir minusculas
    const fraseSinEspacios = fraseString.replace(/\s/g, "").toLowerCase();
    
    // Invertir la cadena
    const fraseInvertida = fraseSinEspacios.split("").reverse().join("");
    
    // Comparar la cadena original sin espacios con su version invertida
    return fraseSinEspacios === fraseInvertida;
}