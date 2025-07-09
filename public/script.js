document.addEventListener('DOMContentLoaded', () => {
    // Establish WebSocket connection
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${protocol}://${window.location.host}`);

    ws.onopen = () => {
        console.log('WebSocket connection established.');
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);

            // DMX alpha (0-255) needs to be converted to CSS alpha (0.0-1.0)
            const alpha = (data.a / 255).toFixed(2);

            // Update the UI
            document.getElementById('color-box').style.backgroundColor = `rgba(${data.r}, ${data.g}, ${data.b}, ${alpha})`;
        } catch (error) {
            console.error('Error processing message:', error);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };
});