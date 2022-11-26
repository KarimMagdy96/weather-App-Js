const search = document.getElementById("search");
const cardContainer = document.getElementById("cardContainer");
search.addEventListener('input', getCity);

function getCity() {
  getWeather(search.value);
}

async function getWeather(city) {
  try{
    let weather = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=2a08ee501f814b1b8fe170617222706&q=${city}&aqi=no`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    let result = await weather.json();
    displayResults(result);
  }
  catch(err){
    console.log(err)
  }
}

function displayResults(result) {
  let WeatherDetails = `
    
      <div class="card card-bg m-auto p-5 mt-4" style="width: 20rem">
              <img src=http://${result.current.condition.icon} class="card-img-top w-50 m-auto d-block" alt="..." />
              <div class="card-body">
                <h1 class="card-title  text-center  fw-bold">${result.current.temp_c}<sup>o</sup><span class='fs-3'> C</span></h1>
                <h5 class="card-title  text-center">${result.current.condition.text}</h5>
                <h5 class="card-title  text-center">${result.location.country},${result.location.name}</h5>
              </div>
            </div>
    
    `;
  cardContainer.innerHTML = WeatherDetails;
}
getWeather('cairo');
