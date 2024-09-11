import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";
import { esPalindromo } from "../src/palindromo.js";
import { esPrimo } from "../src/numeros.js";

describe("Test Suite App", () => {

    test("endpoint /", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /key", () => {
        expect(1 + 1).toBe(2);
    });

    test("endpoint /palindromo", () => {
        let numero: any = 121;
        expect(esPalindromo(numero)).toBe(true); // 121 es un palíndromo

         // Palabras palíndromas
        expect(esPalindromo("radar")).toBe(true);
        expect(esPalindromo("level")).toBe(true);
    });

    test("endpoint /primo", () => {
        let numero: any = 11;
        expect(esPrimo(numero)).toBe(true); // 11 es un número primo

        numero = 1;
        expect(esPrimo(numero)).toBe(false); // 1 es menor q 2

        numero = 4;
        expect(esPrimo(numero)).toBe(false); // 4 no es un número primo

        numero = "texto";
        expect(esPrimo(numero)).toBe(false); // No es un número

        numero = 2.5;
        expect(esPrimo(numero)).toBe(false); // No es un número entero

        numero = 17;
        expect(esPrimo(numero)).toBe(true); // 17 es un número primo

        numero = NaN;
        expect(esPrimo(numero)).toBe(false); // No es un número
    });

    test("test de endpoint /", async () => {
        return await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            })
    });
});
describe('GET /', () => {
    it('debería devolver el mensaje correcto', async () => {
      const response = await request(app).get('/');
      expect(response.text).toBe('Hola, esta api fue configurada por el usuario Felipe Lopez');
      expect(response.statusCode).toBe(200);
    });
  });

describe('GET /key', () => {
    it('debería devolver la API Key correcta', async () => {
      const response = await request(app).get('/key');
      expect(response.text).toBe('Hola, esta api contiene la siguiente api-key: F3L1P3');
      expect(response.statusCode).toBe(200);
    });
  });

describe('GET /primo/:numero', () => {
    it('debería devolver si el número es primo', async () => {
      const response = await request(app).get('/primo/7');
      expect(response.text).toBe('Hola, el numero ingresado es un numero primo');
    });
  
    it('debería devolver si el número no es primo', async () => {
      const response = await request(app).get('/primo/8');
      expect(response.text).toBe('Hola, el numero ingresado no es un numero primo');
    });
  });

  describe('GET /palindromo/:frase', () => {
    it('debería devolver si la frase es un palíndromo', async () => {
      const response = await request(app).get('/palindromo/ana');
      expect(response.text).toBe('Hola, La frase ingresada es palindromo');
    });
  
    it('debería devolver si la frase no es un palíndromo', async () => {
      const response = await request(app).get('/palindromo/casa');
      expect(response.text).toBe('Hola, La frase ingresada no es palindromo');
    });
  });