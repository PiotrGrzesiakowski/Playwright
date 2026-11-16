//! Test sprawdza, czy zapytanie GET, o post numer 1, zwraca poprawne dane z API

import { test, expect } from '@playwright/test';

test('GET post numer 1 zwraca poprawne dane', async ({ request }) => {
    // AKCJA: Załaduj fixture request, który pozwala na wykonywanie żądań HTTP w testach Playwright.
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    // AKCJA: request.get(url) wysyła żądanie GET i zwraca Promise.
    // await czeka, aż serwer odpowie, i dopiero wtedy przechodzi dalej.
    // const tworzy zmienną response, w której zapisujemy odpowiedź na żądanie GET. W kolejnych liniach wyciągamy z tej zmiennej status, treść (json) i inne dane.
    // Nazwę response wymyślamy sami, więc może być dowolna (np. xyz), ale trzeba ją wtedy zmienić wszędzie poniżej.
    expect(response.status()).toBe(200);
    // ASERCJA: 1: powyższy kod sprawdza, czy kod odpowiedzi HTTP to 200, co oznacza, że serwer poprawnie obsłużył żądanie.
    // .status() jest funkcją, która zwraca kod odpowiedzi HTTP (np. 200, 404, 500).
    const body = await response.json();
    console.log(body);
    // .json() jest funkcją, która odczytuje treść odpowiedzi i zamienia ją z tekstu JSON na obiekt JS, z którego możemy wyciągać pola (np. body.id).
    // Ona też jest asynchroniczna, dlatego znowu używamy await.
    expect(body.id).toBe(1);
    // ASERCJA: 2: powyższy kod sprawdza, czy pole id w otrzymanym obiekcie ma wartość 1, czyli czy dostaliśmy właściwy post.
    expect(body).toHaveProperty('title');
    // ASERCJA: 3: powyższy kod sprawdza, czy obiekt zawiera pole title.
    // .toHaveProperty() jest funkcją, która sprawdza czy dane pole istnieje, a nie jaką ma wartość.
});