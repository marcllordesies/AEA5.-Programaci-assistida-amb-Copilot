export function controlarMenuResponsivitat(finestra = typeof window !== 'undefined' ? window.innerWidth : 0) {
    const breakpoint = 480;

    if (finestra >= breakpoint) {
        console.log('El menú de pantalla gran està actiu');
    } else {
        console.log('El menú està ocult (mòbil)');
    }
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
    const menuToggle = document.querySelector('#menu-toggle');
    const menuPrincipal = document.querySelector('#menu-principal');

    if (menuToggle && menuPrincipal) {
        menuToggle.addEventListener('click', () => {
            if (window.innerWidth >= 480) {
                return;
            }

            const estaActiu = menuPrincipal.classList.toggle('is-active');
            menuToggle.classList.toggle('is-active', estaActiu);
            menuToggle.setAttribute('aria-expanded', String(estaActiu));
        });
    }
}