export async function copyToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        console.error('Error al copiar al portapapeles:', error);
    }
}