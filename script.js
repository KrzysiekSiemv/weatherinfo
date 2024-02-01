let api = getCookie("api") != "" ? getCookie("api") : "";
let city = getCookie("city") != "" ? getCookie("city") : "3093133";
let type = getCookie("type") != "" ? getCookie("type") : "id";

if(getCookie("api") == "")
    addApi();

function call(){
    let api_call = `https://api.openweathermap.org/data/2.5/weather?${type}=${city}&appid=${api}&units=metric&lang=pl`;

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText);
            let temperature = data.main.temp;
            cityTitle.innerText = `${data.name}, ${data.sys.country}`;
            icon.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
            icon.setAttribute("alt", `${data.weather[0].main}`)
            temp.innerText = `${temperature.toPrecision(2)}°C`;
            desc.innerText = `${data.weather[0].description}`
            feel_temp.innerText = `Odczuwalne: ${data.main.feels_like}°C`
            min_temp.innerHTML = `Najniższa temp: <b>${data.main.temp_min}°C</b>`
            max_temp.innerHTML = `Najwyższa temp: <b>${data.main.temp_max}°C</b>`
            pressure.innerHTML = `Ciśnienie: <b>${data.main.pressure} hPa</b>`
            humidity.innerHTML = `Wilgotność: <b>${data.main.humidity}%</b>`
            wind.innerHTML = `Wiatr: <b>${data.wind.speed} m/s, ${data.wind.deg}°</b>`
            clouds.innerHTML = `Pochmurzenie: <b>${data.clouds.all}%</b>`
            container.style.backgroundImage = `url(wallpapers/${data.weather[0].icon}.jpg)`
        }
    };
    xhttp.open("GET", api_call);
    xhttp.send();
}

call();

function changeCity() {
    let temp_type = prompt("Co chcesz podać? (ID miasta - id; Nazwę miasta - q)");
    let temp_id = prompt("Podaj nowe miasto");

    if(temp_type != null && temp_type != "")
        type = temp_type;
    if(temp_id != null && temp_id != "")
        city = temp_id;

    setCookie("city", city);
    setCookie("type", type);

    call();
}

function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function addApi(){
    let temp_api = prompt("Podaj swoje API, które zapiszesz w ciasteczkach swojej przeglądarki:");

    if(temp_api != null && temp_api != "")
        api = temp_api;

    setCookie("api", api);

    call();
}