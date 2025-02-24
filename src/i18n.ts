import Polyglot from 'node-polyglot';

const phrasesES = {
  "app_title": "ChromaGrid - Extractor Profesional de Colores",
  "header_title": "ChromaGrid 🎨",
  "header_subtitle": "Paleta de colores instantánea de tu imagen.<br>Sube, extrae y copia tu paleta de colores en segundos. 🚀",
  "upload_button": "Sube Tu Imagen",
  "no_colors_found": "No se encontraron colores dominantes.",
  "tooltip_copied": "Copiado!"
};

const phrasesEN = {
  "app_title": "ChromaGrid - Professional Color Extractor",
  "header_title": "ChromaGrid 🎨",
  "header_subtitle": "Instant color palette from your image.<br>Upload, extract, and copy your color palette in seconds. 🚀",
  "upload_button": "Upload Your Image",
  "no_colors_found": "No dominant colors found.",
  "tooltip_copied": "Copied!"
};

const polyglot = new Polyglot({
  locale: 'es',
  phrases: phrasesES
});

export function setLocale(locale: string) {
  if (locale === 'en') {
    polyglot.locale('en');
    polyglot.replace(phrasesEN);
    document.documentElement.lang = 'en';
  } else {
    polyglot.locale('es');
    polyglot.replace(phrasesES);
    document.documentElement.lang = 'es';
  }
}

export function t(key: string, options?: Record<string, any>): string {
  return polyglot.t(key, options);
}

export default polyglot;
