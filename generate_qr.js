const qrcode = require('qrcode');
const fs = require('fs');

const url = 'https://letstreasurehunt.netlify.app/';
const outputPath = 'game_qr.png';

qrcode.toFile(outputPath, url, {
    color: {
        dark: '#000000',
        light: '#ffffff'
    },
    width: 500,
    margin: 2
}, function (err) {
    if (err) throw err;
    console.log('QR 코드가 생성되었습니다: ' + outputPath);
}); 