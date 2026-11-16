//! Test sprawdza czy dana strona zawiera w tytule konkretne słowo

import { test, expect } from '@playwright/test'

// Każdy import musi zawierać nazwę modułu, z którego importujemy funkcje lub klasy. W tym przypadku importujemy funkcje test() i expect() z modułu '@playwright/test'
// Oznaczona funkcja expect() służy do sprawdzania oczekiwań w testach.

test('has title', async ({ page }) => {
    // Każdy przypadek testowy musi zawierać funkcję test() z dwoma argumentami: nazwą testu 'xyz' i funkcją asynchroniczną async, która zawiera kod testu

    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);

    // Oznaczona funkcja page.goto() służy do przejścia na stronę internetową, a expect(page).toHaveTitle() sprawdza, czy tytuł strony zawiera określony tekst.
    // Aby upewnić się, że tytuł to konkretne słowo a nie tylko jego część, można użyć wyrażenia regularnego z symbolem ^ na początku i $ na końcu, np. /^Playwright$/.
    // Ewentualnie użyć .toHaveTitle('Playwright')' aby sprawdzić dokładny tytuł strony.
});

//! Poniższy test sprawdza, czy na stronie znajduje się link o nazwie 'Get started', a następnie klika w niego i sprawdza, czy po kliknięciu pojawia się nagłówek *heading o nazwie 'Installation'.

test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();

    // page.getByRole() jest funkcją, która pozwala na wyszukiwanie elementów na stronie według ich roli (np. link, button, heading) i nazwy { name: 'xyz' }). 
    // W tym przypadku szukamy linku o nazwie 'Get started' i klikamy w niego *.click()
    // .click() jest funkcją, która symuluje kliknięcie w dany element na stronie.

    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

    // Powyższy kod sprawdza, za pomocą *.tobeVisible() czy nagłówek *heading o nazwie 'Installation' jest widoczny na stronie po kliknięciu w link 'Get started'.

});