document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-background');
    const ctx = canvas.getContext('2d');
    const bathroomBackground = document.getElementById('bathroom-background');
    const startButton = document.getElementById('startButton');
    const riddle = document.getElementById('riddle');

    // 캔버스 크기 설정
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 매트릭스 효과 생성
    const chars = "01";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // 이벤트 리스너
    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        bathroomBackground.classList.remove('hidden');
        bathroomBackground.style.opacity = '1';
        riddle.classList.remove('hidden');
        riddle.style.opacity = '1';
        clearInterval(matrixInterval);
    });

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // 초기화
    resizeCanvas();
    const matrixInterval = setInterval(drawMatrix, 33);
}); 