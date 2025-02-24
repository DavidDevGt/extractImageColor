import { t } from './i18n';

export function applyTranslations(): void {
    const titleEl = document.querySelector('head > title');
    if (titleEl) {
        titleEl.textContent = t('app_title');
    }
    const headerTitle = document.querySelector('header > h1');
    if (headerTitle) {
        headerTitle.textContent = t('header_title');
    }
    const headerSubtitle = document.querySelector('header > p');
    if (headerSubtitle) {
        headerSubtitle.innerHTML = t('header_subtitle');
    }
    const uploadButton = document.getElementById('upload-button');
    if (uploadButton) {
        uploadButton.textContent = t('upload_button');
    }
}
