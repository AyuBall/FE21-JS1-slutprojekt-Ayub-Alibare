let fivedays = document.querySelector(".fivedays")
let apikey = "4f49c93177a5467b8724f4967384f1be";
let cityName = document.querySelector(".city");
let temperatureDescription = document.querySelector(".description");
let tempValue = document.querySelector(".value");
let weatherIcon = document.querySelector(".weather-icon-img");
let humidity = document.querySelector(".humidity")
let windspeed = document.querySelector(".windspeed")
let cityInput = document.querySelector("#city")
const btn = document.querySelector('button')


btn.addEventListener('click', function () {
    const api = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityInput.value}&key=${apikey}&lang=sv`;

    fetch(api).then(function (response) {
         if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw 'Something went wrong.';
        }
    }).then(data => {
        const { city_name, temp, rh, wind_spd } = data.data[0];
        const { description, icon } = data.data[0].weather;
        cityName.textContent = city_name;
        tempValue.textContent = Math.floor(temp) + "°C";
        temperatureDescription.textContent = description;
        $(weatherIcon).attr("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`);
        humidity.textContent = rh;
        windspeed.textContent = wind_spd;
        fivedays.innerHTML = " ";
        for (let i = 1; i < 6; i++) {
            const { datetime, temp } = data.data[i];
            const { description, icon } = data.data[i].weather;
            let day5 = document.createElement('p');
            $(day5).html(`${datetime}......${temp} C......${description}`);
            let img5 = document.createElement('img')
            $(img5).attr("src", `https://www.weatherbit.io/static/img/icons/${icon}.png`);
            let div5 = document.createElement("div")
            div5.appendChild(day5)
            div5.appendChild(img5)
            fivedays.appendChild(div5)
        }
    })
        .catch(
            function (error1) {
                console.log("fail");
                cityName.textContent = "sorry we couldn't find the matched city try -Stockholm or -Stockholm SE"
                tempValue.textContent =  " " ;  
                temperatureDescription.textContent =  " " ;
                weatherIcon.src = " ";
                humidity.textContent = " " ;
                windspeed.textContent = " " ;
                fivedays.innerHTML = " ";
        });
})
