let state = JSON.parse(localStorage.getItem("backgroundState"));

const Template = (function () {
  function Template() {
    this.$layoutBg = document.getElementById("layout-bg");
    this.$layoutBgInfo = document.getElementById("layout-bg-info");
  }

  Template.prototype.bgOverlay = function () {
    this.$layoutBg.innerHTML = `
    <div class="background" style="background-image:url(${state.source})"></div>
    <div class="background-overlay"></div>
    `;
  };
  Template.prototype.bgInfo = function () {
    this.$layoutBgInfo.innerHTML = `
    <div class="background-info">
      <div class="info-title">${state.location}</div>
      <div class="info-more">
        <span class="info-photographer">${state.photographer}</span>
        <span class="fix-icon far fa-star"></span>
      </div>
    </div>
    `;
  };
  return Template;
})();
const template = new Template();

const getData = async () => {
  const API_KEYS = "5xymUtfUo6J3Egq7PpJUH82iEyu_qr2-c8RyiD_mz1U";
  const collectionId = 10593713;
  const URL = `https://api.unsplash.com/photos/random/?collections=${collectionId}&q=99&fm=jpg&crop=entropy&w=2048&cs=tinysrgb&fit=max&client_id=${API_KEYS}`;

  const res = await fetch(URL).catch((e) => console.log("ErrorType:", e));
  const { user, urls, location, description, links } = await res.json();
  setState(user, urls, location, description, links);
};

const setState = (user, urls, location, description, links) => {
  localStorage.setItem(
    "backgroundState",
    JSON.stringify({
      photographer: user.name,
      source: urls.custom,
      location: location.title,
      description,
      link: links.html,
      fixed: false,
      timestamp: new Date().getDate(),
    })
  );
};

const render = () => {
  state = JSON.parse(localStorage.getItem("backgroundState"));
  template.bgInfo();
  template.bgOverlay();
};

// flag
const isExpired = () => state.timestamp === new Date().getDate();

const initBackground = async () => {
  if (!state) {
    await getData();
  } else {
    if (!state.fixed) if (isExpired()) await getData();
  }
  render();
};

template.$layoutBgInfo.onclick = ({ target }) => {
  if (!target.matches(".fix-icon")) return;
  //toggle classes
  target.classList.toggle("far");
  target.classList.toggle("fas");
  //set State 'fixed'
  console.log("start");

  localStorage.setItem(
    "backgroundState",
    JSON.stringify({ ...state, fixed: !state.fixed })
    // 이거 확인필요
  );
  console.log("end");
};

initBackground();