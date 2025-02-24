export function createLoadingSpinner(): HTMLDivElement {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    
    const spinnerInner = document.createElement('div');
    spinnerInner.className = 'spinner-inner';
    
    spinner.appendChild(spinnerInner);
    return spinner;
}