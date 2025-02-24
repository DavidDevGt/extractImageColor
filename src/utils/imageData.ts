export interface ImageDataArgs {
    src: string;
    crossOrigin?: string;
}

export type ImageDataResult = ImageData;

/**
 * Carga una imagen desde una URL y extrae sus datos de píxeles.
 * Utiliza un canvas para dibujar la imagen y obtener el ImageData.
 *
 * @param args - Objeto con la URL de la imagen y la propiedad crossOrigin (por defecto 'anonymous').
 * @returns Una promesa que se resuelve con el ImageData de la imagen cargada.
 */
export async function getImageData({ src, crossOrigin = 'anonymous' }: ImageDataArgs): Promise<ImageDataResult> {
    return new Promise((resolve, reject) => {
        if (!src) {
            reject(new Error('Se requiere la fuente de la imagen.'));
            return;
        }

        const img = new Image();
        img.crossOrigin = crossOrigin;

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth || img.width;
                canvas.height = img.naturalHeight || img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('No se pudo obtener el contexto 2D del canvas.'));
                    return;
                }
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                resolve(imageData);
            } catch (error) {
                reject(new Error('Error al extraer los datos de la imagen. Es posible que el canvas esté tainted.'));
            }
        };

        img.onerror = () => {
            reject(new Error(`Error al cargar la imagen: ${src}`));
        };

        img.src = src;
    });
}
