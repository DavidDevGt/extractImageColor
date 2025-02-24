import { init } from './app';
import { setLocale } from './i18n';
import { applyTranslations } from './i18nDOM';

window.addEventListener('DOMContentLoaded', () => {
    const userLang = navigator.language || navigator.languages[0];
    const locale = userLang.startsWith('es') ? 'es' : 'en';
    
    setLocale(locale);
    applyTranslations();
    init();
});
