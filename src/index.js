const ipInput = document.querySelector('.user-input');
const searchBtn = document.querySelector('.search-btn ');
const apiKey = 'at_8Kkdx41MJUSbNqMtIr8c6NLDtq7Kp';
const ipInfo = document.querySelector("#ip");
const locatonInfo = document.querySelector("#location");
const tmInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");


ipInput.addEventListener('keydown', handleEnter);
searchBtn.addEventListener('click', loadData);

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
    ipInfo.innerText = data.ip;
    locatonInfo.innerText = `${data.location.country} ${data.location.region}, ${data.location.city}`;
    tmInfo.innerText = data.location.timezone;
    ispInfo.innerText = data.isp;
}