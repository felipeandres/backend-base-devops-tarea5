export const esPrimo = (numero: number) => {
    if (numero < 2) {
        return false;
    }
 
    if (!Number.isInteger(numero)) {
        return false;  
    }

    
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true
}