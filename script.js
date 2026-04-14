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
    const desc = "+15 años de experiencia en análisis, diseño, desarrollo e implantación de arquitecturas y soluciones de software.";
    const frames = ['|', '/', '-', '\\'];

    function makeSpinner() {
        let frame = 0;
        const el = document.createElement('span');
        el.textContent = frames[0];
        const interval = setInterval(() => {
            frame = (frame + 1) % frames.length;
            el.textContent = frames[frame];
        }, 80);
        el.stop = () => clearInterval(interval);
        return el;
    }

    function setTerminalText(text) {
        terminalText.textContent = text || '';
    }

    setTimeout(() => {
        // Fase 1: mostrar "loading personal profile..." + spinner
        setTerminalText("Loading personal profile... ");
        const spinner = makeSpinner();
        terminalText.appendChild(spinner);

        // Fase 2: tipear hero-desc
        setTimeout(() => {
            typeInto(heroDesc, desc, 25, () => {
                // Fase 3: hero-desc terminó — mostrar "loaded!"
                spinner.stop();
                spinner.parentNode && spinner.parentNode.removeChild(spinner);
                setTerminalText("Profile loaded successfully!");
            });
        }, 400);
    }, 900);

});
