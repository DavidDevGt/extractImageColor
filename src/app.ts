import { getImageData } from './utils/imageData';
import { rgbaToHex } from './utils/colorConverter';
import { createColorPalette, Color } from './components/colorPalette';

interface ProcessImageOptions {
    pixelRate?: number;
    group?: number;
    maxColors?: number;
}

function group(value: number, grouping: number): number {
    return Math.min(Math.round(value / grouping) * grouping, 255);
}

async function processImage(imageSrc: string, options?: ProcessImageOptions): Promise<Color[]> {
    const { pixelRate = 5, group: groupValue = 20, maxColors = 22 } = options || {};
    const imageData = await getImageData({ src: imageSrc });
    const colorCounter: { [key: string]: number } = {};

    for (let i = 0; i < imageData.data.length; i += 4 * pixelRate) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        const groupedR = group(r, groupValue);
        const groupedG = group(g, groupValue);
        const groupedB = group(b, groupValue);
        const groupedA = group(a, groupValue);

        const hex = rgbaToHex([groupedR, groupedG, groupedB, groupedA]);
        colorCounter[hex] = (colorCounter[hex] || 0) + 1;
    }

    const sortedColors = Object.entries(colorCounter)
        .sort(([_hexA, countA], [_hexB, countB]) => countB - countA)
        .slice(0, maxColors);

    return sortedColors.map(([hex], index) => ({
        hex,
        name: `Color ${index + 1}`,
    }));
}

/**
 * Crea la tarjeta que muestra la imagen, la paleta de colores y acciones.
 */
function createImageCard(imageSrc: string, colors: Color[]): HTMLDivElement {
    const card = document.createElement('div');
    card.className = 'card';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'card-close';
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => {
        card.remove();
    });

    const imgContainer = document.createElement('div');
    imgContainer.className = 'card-image';
    const img = document.createElement('img');
    img.src = imageSrc;
    imgContainer.appendChild(img);

    const paletteContainer = document.createElement('div');
    paletteContainer.className = 'card-palette';
    createColorPalette(colors, paletteContainer);

    const actions = document.createElement('div');
    actions.className = 'card-actions';

    card.appendChild(closeBtn);
    card.appendChild(imgContainer);
    card.appendChild(paletteContainer);
    card.appendChild(actions);

    return card;
}

export function init() {
    console.log('Initialize app');

    const uploadBtn = document.getElementById('upload-button') as HTMLButtonElement;
    const fileInput = document.getElementById('image-input') as HTMLInputElement;
    const cardsContainer = document.getElementById('cards-container');

    if (!uploadBtn || !fileInput || !cardsContainer) {
        console.error('No se encontraron los elementos necesarios en el DOM');
        return;
    }

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target?.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async () => {
            if (typeof reader.result === 'string') {
                const colors = await processImage(reader.result);
                const card = createImageCard(reader.result, colors);
                cardsContainer.appendChild(card);
            }
        };
        reader.readAsDataURL(file);
    });

    const defaultImageSrc = '/zelda_landscape.jpeg';
    processImage(defaultImageSrc).then((colors) => {
        const card = createImageCard(defaultImageSrc, colors);
        cardsContainer.appendChild(card);
    });
}