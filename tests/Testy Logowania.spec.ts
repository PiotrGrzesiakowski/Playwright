// npx playwright test (uruchamia wszystkie testy w projekcie)
// npx playwright test --ui (uruchamia interfejs graficzny do uruchamiania testów)
// npx playwright test --headed (uruchamia testy w trybie z widoczną przeglądarką)
// npx playwright show-report

import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
});

// test.beforeEach() jest funkcją, która pozwala na wykonanie określonego kodu przed każdym testem w danym pliku. W tym przypadku przed każdym testem przechodzimy na stronę logowania 'https://www.saucedemo.com'.

test('poprawne logowanie pokazuje listę produktów', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('standard_user');
    // AKCJA to .fill
    await page.getByPlaceholder('Password').fill('secret_sauce');

    // page.getByPlaceholder() to funkcja, która definiuje (tworzy) lokator. Pozwala na wyszukiwanie elementów na stronie według ich atrybutu placeholder. W tym przypadku szukamy pola tekstowego o placeholderze 'Username' i wypełniamy je tekstem 'standard_user' za pomocą funkcji .fill().

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/inventory/);

    // ASERCJA: zawsze zaczyna się od expect() i służy do sprawdzania oczekiwań w testach.

    // .tohaveurl() jest funkcją, która sprawdza, czy aktualny adres URL strony zawiera określony tekst.
    await expect(page.locator('.inventory_item')).toHaveCount(6);
    // powyższy expect(page.locator ('.inventory_item')).toHaveCount(6) sprawdza, czy na stronie znajduje się dokładnie 6 elementów z klasą .inventory_item.
    // page.locator(selektor) to uniwersalna funkcja tworząca lokator. W przeciwieństwie do getByRole() czy getByText(), przyjmuje ona bezpośrednio selektor CSS (np. .class, #id, div). Używamy jej, gdy nie możemy znaleźć elementu po jego roli, tekście czy placeholderze, a znamy jego klasę lub atrybut z kodu HTML.
});

test('błędne hasło pokazuje komunikat błędu', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('zle_haslo');
    await page.getByRole('button', { name: 'Login' }).click();
    // ASERCJA: 1: pojawił się komunikat błędu
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    // Powyższy kod sprawdza, czy po błędnym logowaniu pojawia się komunikat błędu zawierający tekst 'do not match', co oznacza, że hasło nie pasuje do podanego loginu.
    await expect(page).not.toHaveURL(/inventory/);
    // ASERCJA: 2: powyższy kod sprawdza, czy po błędnym logowaniu adres URL nie zawiera tekstu 'inventory', co oznacza, że użytkownik nie został przekierowany na stronę z listą produktów.
});