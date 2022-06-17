const ipInput = document.querySelector('.user-input');
const searchBtn = document.querySelector('.search-btn ');
const apiKey = 'at_8Kkdx41MJUSbNqMtIr8c6NLDtq7Kp';
const ipInfo = document.querySelector("#ip");
const locatonInfo = document.querySelector("#location");
const tmInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");
let marker = null;

ipInput.addEventListener('keydown', handleEnter);
searchBtn.addEventListener('click', loadData);

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [50.45, 30.52],
    zoom: 16,
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

const mIcon = L.icon({
    iconUrl: '../images/icon-location.svg',
    iconSize: [30, 40]
});

function validateIp(ip) {
    const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
    if(!regexExp.test(ip)){
        alert('You have entered an invalid IP address!');
        return false;
    }
    return true;
}

function loadData() {
    if(validateIp(ipInput.value)){
        fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipInput.value}`)
        .then(res => res.json())
        .then(setInfo);
    }
}

function handleEnter(e) {
    if(e.key === 'Enter') {
        loadData();
    }
}

function setInfo(data) {
    const {country, region, city, timezone, lat, lng} = data.location;
    ipInfo.innerText = data.ip;
    locatonInfo.innerText = `${country} ${region}, ${city}`;
    tmInfo.innerText = timezone;
    ispInfo.innerText = data.isp;

    map.setView([lat, lng]);
    if (marker !== null) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lng], {icon: mIcon}).addTo(map);
}
