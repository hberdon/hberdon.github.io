document.addEventListener("DOMContentLoaded", () => {

    // Console easter egg
    console.log("%c Hugo Berdón", "font-family:monospace; color:#000; font-size:18px; font-weight:600;");
    console.log("%c Full stack developer · hberdn@gmail.com", "font-family:monospace; color:#6A7282; font-size:12px;");

    // Typewriter effect
    const terminalCursor = document.querySelector(".terminal-cursor");

    function typeInto(el, text, speed, onDone) {
        let i = 0;
        el.appendChild(terminalCursor);
        function tick() {
            if (i < text.length) {
                el.insertBefore(document.createTextNode(text[i]), terminalCursor);
                i++;
                setTimeout(tick, speed);
            } else if (onDone) {
                onDone();
            }
        }
        tick();
    }

    const terminalText = document.querySelector(".terminal-text");
    const heroDesc = document.querySelector(".hero-desc");
    const line1 = "full stack dev";
    const line2 = "+15 años de experiencia en análisis, diseño, desarrollo e implantación de arquitecturas y soluciones de software.";

    setTimeout(() => {
        typeInto(terminalText, line1, 50, () => {
            // Pausa antes de saltar a la línea siguiente
            setTimeout(() => {
                typeInto(heroDesc, line2, 25, null);
            }, 400);
        });
    }, 900);

});
