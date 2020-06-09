import { initBackground } from "./src/background.mjs";
import { initWeather } from "./src/weather.mjs";
import { renderClock as initClock } from "./src/clock.mjs";
import { getQuote as initQuote } from "./src/quote.mjs";
import { init as greeting } from "./src/greeting.mjs";
import { init as mainTodo } from "./src/mainTodo.mjs";
import { init as subTodos } from "./src/subTodos.mjs";

window.onload = () => {
  //동욱
  initBackground();
  initWeather();

  initClock();
  initQuote();
  greeting();
  mainTodo();
  subTodos();
};
