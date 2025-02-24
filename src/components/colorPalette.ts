import { copyToClipboard } from "../utils/clipboard";
import { t } from "../i18n";

export interface Color {
    hex: string;
    name?: string;
}

export type ColorPalette = Color[];

export function createColorPalette(colors: ColorPalette, container: HTMLElement): void {
    container.innerHTML = '';

    if (colors.length === 0) {
        container.innerHTML = `<p>${t('no_colors_found')}</p>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    colors.forEach(({ hex, name }) => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-box';
        colorDiv.style.backgroundColor = hex;

        const tooltip = document.createElement('span');
        tooltip.className = 'color-tooltip';
        tooltip.textContent = hex;
        colorDiv.appendChild(tooltip);

        colorDiv.addEventListener('click', async () => {
            await copyToClipboard(hex);
            const originalText = tooltip.textContent;
            tooltip.textContent = t('tooltip_copied');
            setTimeout(() => {
                tooltip.textContent = originalText;
            }, 1500);
        });

        fragment.appendChild(colorDiv);
    });

    container.appendChild(fragment);
}
