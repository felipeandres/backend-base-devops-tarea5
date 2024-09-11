export const esPalindromo = (frase: string) => {
    // Convertir la entrada a string, si no lo es
    const fraseString = String(frase);
    
    // Eliminar espacios y convertir todo a minúsculas
    const fraseSinEspacios = fraseString.replace(/\s/g, "").toLowerCase();
    
    // Invertir la cadena
    const fraseInvertida = fraseSinEspacios.split("").reverse().join("");
    
    // Comparar la cadena original sin espacios con su versión invertida
    return fraseSinEspacios === fraseInvertida;
}