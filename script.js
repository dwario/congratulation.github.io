(async () => {
    const overlay = document.getElementById('overlay');
    const startText = document.getElementById('startText');
    const { Fireworks, Math } = window;

    await new Promise(resolve => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100&display=swap';
        link.rel = 'stylesheet';
        link.onload = resolve;
        document.head.appendChild(link);
    });

    const isMobile = 'ontouchend' in window;

    startText.innerText = isMobile ? 'Touch to start' : 'Click to start';

    const triggerKey = isMobile ? 'touchend' : 'click';
    overlay.addEventListener(triggerKey, async () => {
        overlay.style.display = 'none';

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');

        const typingDemo = document.createElement('div');
        typingDemo.classList.add('typing-demo');
        typingDemo.textContent = ''; 

        wrapper.appendChild(typingDemo);
        document.body.appendChild(wrapper);

        const textToType = "Andrea, ¡Felicidades por este momento tan importante en tu carrera! Sin duda, esto es solo una pequeña muestra del potencial que tienes. No puedo esperar a ver lo que vas a lograr. ¡Por ahora, disfruta de los fuegos artificiales! -D ♥";

        let i = 0;
        const typingInterval = setInterval(() => {
            typingDemo.textContent += textToType[i];
            i++;
            if (i >= textToType.length) {
                clearInterval(typingInterval);
            }
        }, 75); 
        
        setTimeout(() => {
            document.body.removeChild(wrapper);
        }, 25000); 
        
        let fireworks;

        setTimeout(() => {
            fireworks = Fireworks.init();
            fireworks.amount(7);

            document.body.appendChild(fireworks.view);

            const resize = () => requestAnimationFrame(() => fireworks.resize(window.innerWidth, window.innerHeight));
            resize();

            let id;
            window.addEventListener('resize', () => {
                clearTimeout(id);
                id = setTimeout(resize, 100);
            });

            fireworks.start();
        }, 25000);
    });
})();

  