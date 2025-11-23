import { test, expect } from '@playwright/test';
import { SalariesPage } from '../pages/SalariesPage';

test('Salary check on DOU (QA SDET, 2+ years)', async ({ page }) => {
    const salariesPage = new SalariesPage(page);

    await salariesPage.goto();
    await salariesPage.selectQaAutomation();
    await salariesPage.selectExperience();
    await salariesPage.hoverLastGraphPoint();

    await expect(salariesPage.medianGraph).toHaveText(/.+/, { timeout: 10000 });

    const mainText = await salariesPage.medianBig.textContent();
    const graphText = await salariesPage.medianGraph.textContent();

    const valMain = Number(mainText?.replace(/\D/g, ''));
    const valGraph = Number(graphText?.replace(/\D/g, ''));

    expect(Number.isNaN(valMain), 'Main median shouldn`t be NaN').toBe(false);
    expect(Number.isNaN(valGraph), 'Graph median shouldn`t be NaN').toBe(false);

    expect(valMain).toBeGreaterThan(0);
    expect(valGraph).toBeGreaterThan(0);

    const diff = Math.abs(valMain - valGraph);

    expect(Number.isNaN(diff), 'Difference shouldn`t be NaN').toBe(false);
});
