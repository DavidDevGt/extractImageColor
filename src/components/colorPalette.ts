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
    colors.forEach(({ hex }) => {
        const colorDiv = document.createElement('div');
        colorDiv.className = 'color-box';
        colorDiv.style.backgroundColor = hex;

        const tooltip = document.createElement('span');
        tooltip.className = 'color-tooltip';
        tooltip.textContent = hex;
        colorDiv.appendChild(tooltip);

        colorDiv.addEventListener('click', async () => {
            if (tooltip.dataset.timeoutId) {
                clearTimeout(parseInt(tooltip.dataset.timeoutId));
            }
            await copyToClipboard(hex);
            tooltip.textContent = t('tooltip_copied');
            const timeoutId = setTimeout(() => {
                tooltip.textContent = hex;
                delete tooltip.dataset.timeoutId;
            }, 1500);
            tooltip.dataset.timeoutId = timeoutId.toString();
        });

        fragment.appendChild(colorDiv);
    });

    container.appendChild(fragment);
}
