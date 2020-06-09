// state
let state = JSON.parse(localStorage.getItem("weatherState"));
let geoSuccess = false;
// utils
const API_KEY = "2a12527f777b1cbb783fcf5604ac51ae";
const DEFAULT_LAT = 37;
const DEFAULT_LON = 127;
const needForecast = true ? "" : "daily";
const unitSetting = true ? "metric" : "imperial";
const icons = {
  "clear sky": "B",
  "few clouds": "H",
  "overcast clouds": "Y",
  "scattered clouds": "H",
  "broken clouds": "H",
  "shower rain": "T",
  "heavy intensity rain": "R",
  rain: "Q",
  thunderstorm: "0",
  snow: "U",
  mist: "M",
  "moderate rain": "R",
  "light rain": "R",
  haze: "M",
  // "C":'*',
  // "F":'+',
};
// DOMs
const $layoutWeather = document.getElementById("layout-weather");

// templates
const Template = (function () {
  function Template() {}
  Template.prototype.init = () => {
    $layoutWeather.innerHTML = `
    <section class="current">
    </section>
    <section class="selected-forecast">
      <section class="selected">
      </section>
      <section class="forecast">
        <ul class="forecast-list">
        </ul>
      </section>
    </section>
    `;
  };
  Template.prototype.current = () => {
    document.querySelector(".current").innerHTML = `
            <div class="summary">
              <span class="icon">${icons[state.current.description]}</span>
              <span class="temp">${Math.round(state.current.temp)}°</span>
            </div>
            <div class="location">${state.timezone}</div>
          `;
  };
  Template.prototype.selected = (id = 0) => {
    document.querySelector(".selected").innerHTML = `
            <div class="selected-location">${state.timezone}</div>
            <div class="selected-status">${
              state.days[+id].weather[0].description[0].toUpperCase() +
              state.days[+id].weather[0].description.slice(1)
            }</div>
            <div class="selected-summary">
              <span class="selected-icon">${
                icons[state.days[+id].weather[0].description]
              }</span>
              <span class="selected-temp-high">${Math.round(
                state.days[+id].temp.max
              )}°</span>
              <span class="selected-temp-low">${Math.round(
                state.days[+id].temp.min
              )}°</span>
            </div>
          
          `;
  };
  Template.prototype.forecast = () => {
    let listItems = "";

    state.days.forEach((day, i) => {
      listItems += `
                    <li id="${i}"class="forecast-item">
                      <div class="item-name">${new Date(day.dt * 1000)
                        .toString()
                        .slice(0, 3)
                        .toUpperCase()}</div>
                      <span class="item-icon">${
                        icons[day.weather[0].description]
                      }</span>
                      <span class="item-temp-high">${Math.round(
                        day.temp.max
                      )}°</span>
                      <span class="item-temp-low">${Math.round(
                        day.temp.min
                      )}°</span>
                    </li>
                  `;
    });
    document.querySelector(".forecast-list").innerHTML = listItems;
  };
  return Template;
})();

const template = new Template();

// functions
const render = () => {
  console.log(3, 6);
  state = JSON.parse(localStorage.getItem("weatherState"));
  template.init();
  template.current();
  template.selected();
  template.forecast();
};

const setState = async (lat, lon, current, daily, timezone) => {
  localStorage.setItem(
    "weatherState",
    JSON.stringify({
      lat,
      lon,
      current: {
        dt: current.dt,
        temp: current.temp,
        description: current.weather[0].description,
        mainly: current.weather[0].main,
      },
      days: daily.slice(0, 5),
      timezone,
      realLocation: geoSuccess,
    })
  );
};

const getData = async () => {
  const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${
    state ? state.lat : DEFAULT_LAT
  }&lon=${
    state ? state.lon : DEFAULT_LON
  }&exclude=hourly${needForecast}&appid=${API_KEY}&units=${unitSetting}`;

  const response = await fetch(URL).catch(console.log);
  const data = await response.json();
  const { lat, lon, current, daily, timezone } = data;

  setState(lat, lon, current, daily, timezone);
};

const askLocation = async () => {
  navigator.geolocation.getCurrentPosition(successToLocate, failtoLocate);
};

const successToLocate = async (response) => {
  geoSuccess = true;
  state = JSON.parse(localStorage.getItem("weatherState"));
  localStorage.setItem(
    "weatherState",
    JSON.stringify({
      ...state,
      lat: response.coords.latitude,
      lon: response.coords.longitude,
      realLocation: geoSuccess,
    })
  );
  await getData();
  render();
};

const failtoLocate = (e) => console.log("rejected to locate :" + e);

const initWeather = async () => {
  console.log(0);
  if (!state) await getData();
  /*초기표시*/
  render();
  /*정보동의-응답수신하면, 실제 위치 데이터로 다시 랜더링*/
  askLocation();
};
window.onclick = ({ target }) => {
  if (!target.matches(".location")) return;
  const $modal = document.querySelector(".selected-forecast");
  $modal.classList.toggle("weather-active");
};

$layoutWeather.onclick = ({ target }) => {
  if (!target.matches(".forecast-item")) return;
  template.selected(target.id);
};

export { initWeather };
