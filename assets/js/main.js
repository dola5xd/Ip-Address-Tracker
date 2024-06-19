const ipAddress = document.getElementById("ip");
const Location = document.getElementById("location");
const timeZone = document.getElementById("zone");
const ISP = document.getElementById("ISP");
const searchBtn = document.getElementById("searchBtn");
const ipSearch = document.getElementById("ipSearch");

// Leaflet settings
const map = L.map("map");
const Icon = L.icon({
  iconUrl: "../../assets/images/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [25, 50],
});

const getIp = async function () {
  const res = await fetch(`https://ipapi.co/json/`);
  const data = await res.json();

  map.setView([data.latitude, data.longitude], 12);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const marker = L.marker([data.latitude, data.longitude], {
    icon: Icon,
  }).addTo(map);

  //   change info
  ipAddress.textContent = data.ip;
  Location.textContent = `${data.city}, ${data.region}, ${data.country_name}`;
  if (data.utc_offset !== null) {
    timeZone.textContent =
      "UTC: " + data.utc_offset.slice(0, 3) + ":" + data.utc_offset.slice(3);
  }
  ISP.textContent = data.org;
};

getIp();

searchBtn.addEventListener("click", async function () {
  const res = await fetch(`https://ipapi.co/${ipSearch.value}/json/`);
  const data = await res.json();

  map.setView([data.latitude, data.longitude], 12);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // add marker
  const marker = L.marker([data.latitude, data.longitude], {
    icon: Icon,
  }).addTo(map);

  //   change info
  ipAddress.textContent = data.ip;
  Location.textContent = `${data.city}, ${data.region}, ${data.country_name}`;

  if (data.utc_offset !== null) {
    timeZone.textContent =
      "UTC: " + data.utc_offset.slice(0, 3) + ":" + data.utc_offset.slice(3);
  }
  ISP.textContent = data.org;
  ipSearch.value = "";
});
