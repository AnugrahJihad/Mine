function killCopy (e) {
    return false
}

function reEnable() {
    return true
}

document.onselectstart=new Function ("return false")

if (window.sidebar) {
    document.onmousedown=killCopy
    document.onclick=reEnable
}



// Function to generate random weather
function generateRandomWeather() {
    const randomNumber = (Math.random() * (35 - 26.6) + 26.6).toFixed(2);

    const h2Elements = document.querySelectorAll('.weather-temp');

    const h3Element = document.querySelector('.weather-condition');

    h2Elements.forEach(h2Element => {
      h2Element.textContent = `${randomNumber}°C`;
    });

    const weatherDescriptionElement = document.getElementById('weather-description');
    if (randomNumber < 29.5) {
        h3Element.textContent = 'Berawan';
      } else if (randomNumber > 29.5) {
        h3Element.textContent = 'Cerah';
      } else {
        h3Element.textContent = '';
      }
  }
  
  // Initial weather generation
  generateRandomWeather();
  
  // Set interval to refresh weather every 10 minutes
  setInterval(generateRandomWeather, 10 * 60 * 1000);
  