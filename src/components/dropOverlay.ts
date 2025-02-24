export function createDropOverlay(): HTMLDivElement {
    const overlay = document.createElement('div');
    overlay.id = 'drop-overlay';
    overlay.innerHTML = `
      <div class="drop-message">
        <svg class="drop-icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0Zm2.646 5.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 7.293l2.646-2.647a.5.5 0 1 1 .708.708Z"/>
        </svg>
        <p>Suelta la imagen para procesarla</p>
      </div>
    `;
    return overlay;
}
