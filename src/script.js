document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelector(`.cards`);
    const images = document.querySelectorAll(`.img`);
    const backgrouds = document.querySelectorAll(`.bg`);
    const RANGE = 40;

    const calcular = (a, b) => {
        return (((a / b) * RANGE) - (RANGE / 2)).toFixed(1);
    };

    let timeout;
    /**
     * move o card com o movimento do mouse
     */
    document.addEventListener(`mousemove`, (event) => {
        if(timeout){
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(() => {
            const xValue = calcular(event.x, window.innerWidth);
            const yValue = calcular(event.y, window.innerHeight);

            cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

            [].forEach.call(images, (image) => {
                image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
            });

            [].forEach.call(backgrouds, (bg) => {
                bg.style.backgroundPosition = `${-xValue*.45}px ${-yValue*.45}px`;
            });
        })
    }, false);

    /**
     * move o card com o touch do celular
     */
    document.addEventListener(`touchmove`, (event) => {
        if(timeout){
            window.cancelAnimationFrame(timeout);
        }
        const touch = event.touches[0]; // Obtenha o primeiro toque
        const x = touch.clientX; // Coordenada X do toque
        const y = touch.clientY; // Coordenada Y do toque

        timeout = window.requestAnimationFrame(() => {
            const xValue = calcular(x , window.innerWidth);
            const yValue = calcular(y, window.innerHeight);

            cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

            [].forEach.call(images, (image) => {
                image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
            });

            [].forEach.call(backgrouds, (bg) => {
                bg.style.backgroundPosition = `${-xValue*.45}px ${-yValue*.45}px`;
            });
        })
    }, false);

    document.addEventListener(`deviceorientation`, (event) => {
        if(timeout){
            window.cancelAnimationFrame(timeout);
        }
        const alpha = event.alpha; // rotação ao redor do eixo Z (em graus)
        const beta = event.beta; // inclinação para frente/trás
        const gamma = event.gamma; // inclinação para a esquerda/direita

        // Normalizar os valores de beta e gamma para que fiquem dentro do intervalo [-90, 90]
        const normalizedBeta = Math.max(-90, Math.min(90, beta));
        const normalizedGamma = Math.max(-90, Math.min(90, gamma));

        // Mapear os valores de beta e gamma para o intervalo [-RANGE/2, RANGE/2]
        const xValue = calcular(normalizedGamma, 180) - RANGE / 2;
        const yValue = calcular(normalizedBeta, 180) - RANGE / 2;


        timeout = window.requestAnimationFrame(() => {
            const xValue = calcular(x , window.innerWidth);
            const yValue = calcular(y, window.innerHeight);

            cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

            [].forEach.call(images, (image) => {
                image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
            });

            [].forEach.call(backgrouds, (bg) => {
                bg.style.backgroundPosition = `${-xValue*.45}px ${-yValue*.45}px`;
            });
        })
    }, false);
});