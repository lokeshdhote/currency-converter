const currencyApi = 'https://open.er-api.com/v6/latest/USD';
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');

// Fetch currency data from the API
fetch(currencyApi)
    .then(response => response.json())
    .then(data => {
        const rates = data.rates;
        const currencies = Object.keys(rates);
        
        // Populate currency select options
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromSelect.appendChild(option);
            toSelect.appendChild(option.cloneNode(true));
        });
        
        document.getElementById('convert').addEventListener('click', () => {
            const amount = parseFloat(document.getElementById('amount').value);
            const fromCurrency = fromSelect.value;
            const toCurrency = toSelect.value;
            const result = (amount * rates[toCurrency]) / rates[fromCurrency];
            
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        });
    })
    .catch(error => console.error('Error:', error));
