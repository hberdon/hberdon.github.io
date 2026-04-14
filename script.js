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
                setTerminalText("Profile loaded successfully √");
                setTimeout(() => typeExpItem(0, () => {
                    setTimeout(() => typeProjectItem(0, () => {
                        setTimeout(() => typeStackItems(0, null), 200);
                    }), 300);
                }), 600);
            });
        }, 400);
    }, 900);

    // Experiencia: guardar textos y limpiar todos los campos
    const expItems = document.querySelectorAll('.exp-item');
    const expFields = ['.exp-date', 'h3', '.exp-role', '.exp-desc', '.exp-tech'];

    expItems.forEach(item => {
        expFields.forEach(sel => {
            const el = item.querySelector(sel);
            if (el) { el.dataset.text = el.textContent; el.textContent = ''; }
        });
    });

    function typeString(el, text, speed, onDone) {
        let i = 0;
        function tick() {
            if (i < text.length) {
                el.textContent += text[i++];
                setTimeout(tick, speed);
            } else if (onDone) {
                onDone();
            }
        }
        tick();
    }

    // Proyectos: guardar textos y limpiar
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        ['h3', 'p'].forEach(sel => {
            const el = item.querySelector(sel);
            if (el) { el.dataset.text = el.textContent; el.textContent = ''; }
        });
    });

    // Stack: guardar textos y limpiar
    const stackItems = document.querySelectorAll('.stack-list li');
    stackItems.forEach(li => { li.dataset.text = li.textContent; li.textContent = ''; });

    function typeProjectItem(index, onDone) {
        if (index >= projectItems.length) { if (onDone) onDone(); return; }
        const item = projectItems[index];
        item.classList.add('visible');
        const h3 = item.querySelector('h3');
        const p = item.querySelector('p');
        const queue = [h3, p].filter(el => el && el.dataset.text);

        function runQueue(i) {
            if (i >= queue.length) { setTimeout(() => typeProjectItem(index + 1, onDone), 150); return; }
            typeString(queue[i], queue[i].dataset.text, 10, () => setTimeout(() => runQueue(i + 1), 60));
        }
        setTimeout(() => runQueue(0), 100);
    }

    function typeStackItems(index, onDone) {
        if (index >= stackItems.length) { if (onDone) onDone(); return; }
        const li = stackItems[index];
        li.classList.add('visible');
        typeString(li, li.dataset.text, 8, () => setTimeout(() => typeStackItems(index + 1, onDone), 50));
    }

    function typeExpItem(index, onDone) {
        if (index >= expItems.length) { if (onDone) onDone(); return; }
        const item = expItems[index];
        item.classList.add('visible');

        const queue = expFields
            .map(sel => ({ el: item.querySelector(sel) }))
            .filter(({ el }) => el && el.dataset.text)
            .map(({ el }) => ({ el, text: el.dataset.text }));

        const speeds = { 'exp-date': 2, 'H3': 2, 'exp-role': 2, 'exp-desc': 2, 'exp-tech': 2 };

        function runQueue(i) {
            if (i >= queue.length) {
                setTimeout(() => typeExpItem(index + 1, onDone), 200);
                return;
            }
            const { el, text } = queue[i];
            const cls = el.className || el.tagName;
            const speed = speeds[cls] || speeds[el.tagName] || 15;
            typeString(el, text, speed, () => setTimeout(() => runQueue(i + 1), 80));
        }

        setTimeout(() => runQueue(0), 150);
    }

});
