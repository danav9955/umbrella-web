// app.js

// 1. Live Price Fetcher (Binance API)
async function fetchPrices() {
    const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
    const container = document.getElementById('asset-list');
    
    // Only run if we are on the dashboard
    if (!container) return; 

    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price');
        const data = await response.json();
        
        // Filter for our coins
        const coins = data.filter(item => symbols.includes(item.symbol));
        
        // Clear current list (optional, or update in place)
        container.innerHTML = '';

        coins.forEach(coin => {
            const name = coin.symbol.replace('USDT', '');
            const price = parseFloat(coin.price).toFixed(2);
            
            // Generic icon colors based on coin name
            let color = '#f7931a'; // BTC orange
            if (name === 'ETH') color = '#627eea';
            if (name === 'SOL') color = '#14f195';

            const html = `
            <div class="list-item">
                <div class="coin-info">
                    <div class="coin-icon" style="background: ${color}; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">${name[0]}</div>
                    <div>
                        <div style="font-weight: 600;">${name}</div>
                        <div style="color: var(--text-muted); font-size: 0.8rem;">0 ${name}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div>$${price}</div>
                    <div style="color: var(--text-muted); font-size: 0.8rem;">Price</div>
                </div>
            </div>
            `;
            container.innerHTML += html;
        });

    } catch (error) {
        console.error("Error fetching prices:", error);
    }
}

// 2. Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchPrices();
    // Refresh prices every 10 seconds
    setInterval(fetchPrices, 10000);
});
