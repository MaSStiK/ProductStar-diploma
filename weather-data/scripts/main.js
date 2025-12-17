moment.locale("ru");
const $status = $("#status")
const $weather = $("#weather")

function renderWeather(data) {
    const loc = data.location // Объект с данными о городе
    const cur = data.current // Текущая погода
    const day = data.forecast.forecastday[0].day // Прогноз на сегодня

    // Город и страна
    const city = loc.name !== "(())"
        ? `${loc.name}, ${loc.country}`
        : loc.country
    $("#location-name").text(city)

    // Текущая температура в градусах Цельсия
    $("#temperature").text(cur.temp_c)

    // Иконка погодных условий
    $("#weather-icon")
        .attr("src", "https:" + cur.condition.icon)
        .attr("alt", cur.condition.text)

    // Ощущаемая температура
    $("#feels-like").text(cur.feelslike_c)

    // Вероятность осадков
    $("#chance-of-rain").text(day.daily_chance_of_rain)

    // Влажность воздуха
    $("#humidity").text(cur.humidity)

    // Скорость ветра
    $("#wind-speed").text(cur.wind_kph)

    // Время последнего обновления данных
    const last_updated = moment(cur.last_updated, "YYYY-MM-DD HH:mm").format("dddd HH:mm")
    $("#last-updated").text(last_updated)

    // Текстовое описание погоды
    $("#condition").text(cur.condition.text)

    // Отображаем блок с информацией
    $weather.show()
}

// Загрузка информации о города
async function getWeather(city) {
    return $.ajax({
        url: WEATHER_API_URL + "/forecast.json",
        method: "GET",
        data: {
            key: WEATHER_API_KEY,
            q: city,
            lang: "ru"
        }
    });
}

// Отображение информации о городе
async function loadCity(city) {
    try {
        $status.text("Загрузка погоды").show()
        const res = await getWeather(city)
        renderWeather(res)
        $status.hide()
    } catch (error) {
        console.error("loadCity error", error.responseJSON)
        $status.text("Ошибка: Город не найден")
    }
}

$("#weather-form").on("submit", function (event) {
    // Отключаем базовый переход
    event.preventDefault()

    // Получаем поле из с городом из формы
    const formData = new FormData(this)
    const city = formData.get("city").trim()

    // Загружаем город
    loadCity(city)
})