import { type Page } from '@playwright/test';

export class SalariesPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/salaries/');
    }

    async selectQaAutomation() {
        await this.page.getByRole('button', { name: /Software Engineering/ }).first().click();
        await this.page.getByText('QA & QC', { exact: true }).click();
        await this.page.getByText('QA/QC/SDET').click();
    }

    async selectExperience() {
        const filterBtn = this.page.getByRole('button', { name: 'Фільтри' });
        if (await filterBtn.isVisible()) {
            await filterBtn.click();
        }

        const container = this.page.locator('#dws-fl-experience');
        await container.waitFor({ state: 'visible' });

        const handle = container.locator('g.handle.left circle');
        await handle.waitFor({ state: 'visible' });
        const handleBox = await handle.boundingBox();

        if (handleBox) {
            const startX = handleBox.x + handleBox.width / 2;
            const startY = handleBox.y + handleBox.height / 2;
            const targetX = startX + 42;

            await this.page.mouse.move(startX, startY);
            await this.page.mouse.down();
            await this.page.waitForTimeout(100);
            await this.page.mouse.move(targetX, startY, { steps: 10 });
            await this.page.waitForTimeout(100);
            await this.page.mouse.up();
        }

        const hideBtn = this.page.getByRole('button', { name: /Приховати/ });
        if (await hideBtn.isVisible()) {
            await hideBtn.click();
            await hideBtn.waitFor({ state: 'hidden' });
        }
    }

    async hoverLastGraphPoint() {
        const overlay = this.page.locator('#tm-overlay');
        await overlay.waitFor({ state: 'visible' });
        const box = await overlay.boundingBox();

        const tooltip = this.page.locator('#tm-point .tm-ref-value');

        if (box) {
            const centerY = box.y + box.height / 2;
            const rightEdge = box.x + box.width;

            for (let offset = 10; offset < 250; offset += 15) {
                await this.page.mouse.move(rightEdge - offset, centerY);

                if (await tooltip.isVisible()) {
                    break;
                }

                await this.page.waitForTimeout(30);
            }
        }
    }

    get medianBig() {
        return this.page.getByRole('heading', { name: 'Медіана, $' }).locator('..');
    }

    get medianGraph() {
        return this.page.locator('#tm-point .tm-ref-value');
    }
}
