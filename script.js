document.addEventListener('DOMContentLoaded', () => {
    const matrixBackground = document.getElementById('matrix-background');
    const bathroomBackground = document.getElementById('bathroom-background');
    const startButton = document.getElementById('startButton');
    const riddle = document.getElementById('riddle');
    const qrCode = document.getElementById('qr-code');

    // QR 코드 생성
    function createQRCode() {
        const url = 'https://letstreasurehunt.netlify.app/';
        const qr = qrcode(0, 'M');
        qr.addData(url);
        qr.make();
        qrCode.innerHTML = qr.createImgTag(10);
    }

    // 매트릭스 효과 생성
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        matrixBackground.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // 룬 문자 (Futhark)
        const runes = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚻᚼᚽᚾᚿᛀᛁᛂᛃᛄᛅᛆᛇᛈᛉᛊᛋᛌᛍᛎᛏᛐᛑᛒᛓᛔᛕᛖᛗᛘᛙᛚᛛᛜᛝᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ᛫᛬᛭';
        const nums = '0123456789';
        const alphabet = runes + nums;

        const fontSize = 20;
        const columns = canvas.width / fontSize;

        const rainDrops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        }

        setInterval(draw, 30);
    }

    // 버튼 클릭 이벤트
    startButton.addEventListener('click', () => {
        startButton.style.opacity = '0';
        setTimeout(() => {
            startButton.classList.add('hidden');
            matrixBackground.style.opacity = '0';
            setTimeout(() => {
                matrixBackground.classList.add('hidden');
                bathroomBackground.classList.remove('hidden');
                bathroomBackground.style.opacity = '1';
                setTimeout(() => {
                    riddle.classList.remove('hidden');
                    riddle.style.opacity = '1';
                    qrCode.classList.remove('hidden');
                    qrCode.style.opacity = '1';
                }, 500);
            }, 500);
        }, 300);
    });

    // QR 코드 생성
    createQRCode();

    // 매트릭스 효과 시작
    createMatrixEffect();

    // 창 크기 변경 시 캔버스 크기 조정
    window.addEventListener('resize', () => {
        const canvas = matrixBackground.querySelector('canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
}); 