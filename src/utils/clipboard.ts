/**
 * Copia un texto al portapapeles
 * @param text - El texto a copiar
 * @returns Una promesa que se resuelve cuando se completa la copia
 */
export async function copyToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('Error al copiar al portapapeles:', error);
    }
}