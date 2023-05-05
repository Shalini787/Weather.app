const apikey ="cd7522d6440448c375dd7e86c7d93206";
const weatherDataEl =document.getElementById("full-detail");
const cityInputEl =document.getElementById("city-input");

const formEl =document.querySelector("form");

// addEventListener is a method which will trigger a func. when the form is submitted
formEl.addEventListener("submit",(event)=>{
    // page will not refresh again and again even after submitting the form
    event.preventDefault();
    const cityValue= cityInputEl.value;
    getWeatherData(cityValue);
});

// here we have to use async func as there will be delay here (await)
async function getWeatherData(cityValue){
    // fetching data from api using try and catch method taaki agr koi error bhi hogi toh catch block m catch hojaegi
    try {
        // await - wait until the response comes and then goes to the next line taaki code chlta rhe aur q here is query aur metric hume centigrade (°C) de rha h Fahrenheit ki jgaah 
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

        if(!response.ok){
        throw new Error("Network response is not ok");
        }
        const data = await response.json();
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        // now we have created a dynamic array(for details) here 
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`
        ]


    // Element.querySelector
        weatherDataEl.querySelector(".icon").innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;

        weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;

        weatherDataEl.querySelector(".description").textContent =`${description}`;

        weatherDataEl.querySelector(".Details").innerHTML = details.map((detail)=>
        `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";

        weatherDataEl.querySelector(".temperature").textContent = "";

        weatherDataEl.querySelector(".description").textContent ="An error occured,please try again later.";

        weatherDataEl.querySelector(".Details").innerHTML = "";
    }
}