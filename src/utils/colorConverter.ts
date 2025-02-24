/**
 * Convierte un color en formato RGBA a una cadena hexadecimal.
 *
 * @param rgba - Un arreglo [r, g, b, a] con valores numéricos entre 0 y 255.
 * @returns Una cadena hexadecimal en el formato "#RRGGBBAA".
 */
export function rgbaToHex([r, g, b, a]: [number, number, number, number]): string {
    const clamp = (val: number) => Math.max(0, Math.min(255, val));
  
    const hex = [clamp(r), clamp(g), clamp(b), clamp(a)]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('');
    return `#${hex}`;
  }
  