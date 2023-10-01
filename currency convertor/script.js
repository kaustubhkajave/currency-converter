document.addEventListener('DOMContentLoaded', function () {
    const fromSelect = document.querySelector('#from');
    const toSelect = document.querySelector('#to');
  
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
          const option = document.createElement('option');
          option.value = currency;
          option.textContent = currency;
          fromSelect.append(option.cloneNode(true));
          toSelect.append(option);
        });
      });
    
    document.querySelector('#convert').addEventListener('click', function () {
      const amount = document.querySelector('#amount').value;
      const from = fromSelect.value;
      const to = toSelect.value;
  
      fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(response => response.json())
        .then(data => {
          const rate = data.rates[to];
          const result = amount * rate;
          document.querySelector('#result').textContent = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        });
    });
  });
  