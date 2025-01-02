const loader = document.getElementById('loader');
const detailsContainer = document.getElementById('details-container');

loader.style.display = 'flex';

fetch('https://script.google.com/macros/s/AKfycbzfTCLYtV0ASIR-H2SkAgCJS0HXboihnTS5DQAimhuMKvwYrrgFaSixo6l25qhFuXJx/exec', {
    method: 'POST'
})
    .then(response => response.json())
    .then(data => {
        loader.style.display = 'none';
        const currentIndex = localStorage.getItem('currentIndex');
        const row = data[currentIndex];
        const html = `
            <div class="frames">
                <iframe src="${row[2]}"></iframe>
                <img src="${row[3]}">
                <img src="${row[4]}">
            </div>
            <div class="text">
                <h2>${row[0]}</h2>
                <p class="des">${row[1]}</p>
                <p class="prince">Price: ₹${row[5]}</p>
                <button id="buy-now-button">Buy Now</button>
            </div>
        `;
        detailsContainer.innerHTML = html;

        document.getElementById('buy-now-button').addEventListener('click', () => {
            showQRCode(row[5], row[0]);
            document.getElementById('buy-now-button').style.display = 'none';
        });
    })
    .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching data:', error);
    });

function showQRCode(price, title) {
    const qrContainer = document.createElement('div');
    qrContainer.style.textAlign = 'center';
    qrContainer.style.padding = '20px';
    qrContainer.style.border = '2px solid #2e2e2e';
    qrContainer.style.borderRadius = '15px';
    qrContainer.style.background = 'linear-gradient(145deg, #1e1e1e, #3c3c3c)';
    qrContainer.style.color = '#ffcc00';
    qrContainer.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.5)';
    qrContainer.style.marginTop = '20px';

    const upiId = 'viratxkohli@ybl';
    const bankingName = 'Mr. FF Store';
    const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(bankingName)}&am=${price}&cu=INR`;

    qrContainer.innerHTML = `
        <h3 style="font-size: 18px; margin-bottom: 10px;">Scan to Pay</h3>
        <div id="qr-code" style="margin: 20px auto;"></div>
        <p style="font-size: 16px; margin: 10px 0;">UPI ID: <b>${upiId}</b></p>
        <p style="font-size: 16px; margin: 10px 0;">Amount: <b>₹${price}</b></p>
        <button id="submit-button" style="
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: #000;
            background: #ffcc00;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        ">Submit</button>
    `;

    detailsContainer.appendChild(qrContainer);

    const qrCanvas = document.createElement('canvas');
    document.getElementById('qr-code').appendChild(qrCanvas);

    QRCode.toCanvas(qrCanvas, upiLink, {
        width: 200,
        color: {
            dark: '#ffcc00',
            light: '#1e1e1e'
        },
        errorCorrectionLevel: 'H'
    });

    document.getElementById('submit-button').addEventListener('click', () => {
        const message = `Title: ${title}\nPrice: ₹${price}\nUPI Payment: ${upiId} (Mr. FF Store)`;
        const telegramUrl = `https://t.me/vkbhaiff?text=${encodeURIComponent(message)}`;
        window.open(telegramUrl, '_blank');
    });
}
