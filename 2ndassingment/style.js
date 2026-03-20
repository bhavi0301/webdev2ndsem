const apiKey = "YOUR_API_KEY"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const historyDiv = document.getElementById("history");
const consoleBox = document.getElementById("consoleBox");

function log(message){
console.log(message);
consoleBox.textContent += message + "\n";
}

log("Sync Start");

searchBtn.addEventListener("click", () => {

let city = cityInput.value;

if(city === ""){
alert("Enter city name");
return;
}

getWeather(city);
saveHistory(city);

});

async function getWeather(city){

log("Async Start fetching");

try{

let url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

let response = await fetch(url);

if(!response.ok){
throw new Error("City not found");
}

let data = await response.json();

log("Promise then (Microtask)");

displayWeather(data);

}catch(error){

weatherResult.innerHTML = `<p style="color:red">${error.message}</p>`;
log("Error caught");

}

}

function displayWeather(data){

weatherResult.innerHTML = `
<p><b>City:</b> ${data.name}</p>
<p><b>Temp:</b> ${data.main.temp} °C</p>
<p><b>Weather:</b> ${data.weather[0].main}</p>
<p><b>Humidity:</b> ${data.main.humidity}%</p>
<p><b>Wind:</b> ${data.wind.speed} m/s</p>
`;

log("Async Data received");

}

function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
localStorage.setItem("cities", JSON.stringify(history));
}

showHistory();

}

function showHistory(){

let history = JSON.parse(localStorage.getItem("cities")) || [];

historyDiv.innerHTML="";

history.forEach(city => {

let btn = document.createElement("button");
btn.textContent = city;

btn.onclick = () => getWeather(city);

historyDiv.appendChild(btn);

});

}

showHistory();

setTimeout(()=>{
log("setTimeout (Macrotask)");
},0);

log("Sync End");