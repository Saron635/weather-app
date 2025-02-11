const tempretureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector(".form");

if (form) {
    form.addEventListener('submit', searchForLocation);
} else {
    console.error("Form element not found!");
}

let target = "Addis Ababa";

const fetchResult = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=e4a8b93189b34f1787f93810251102&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        let locationName = data.location.name;
        let time = data.location.localtime;
        let temp = data.current.temp_c;
        let condition = data.current.condition.text;

        updateDetails(temp, locationName, time, condition);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

function updateDetails(temp, locationName, time, condition) {
    let splitDate = time.split(` `)[0];
    let splitTime = time.split(` `)[1];
    let currentDay = getDayName(new Date(splitDate).getDay());

    tempretureField.innerText = temp + "°C";
    locationField.innerText = locationName;
    dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerText = condition;
}

function searchForLocation(e) {
    e.preventDefault();  
    target = searchField.value;
    fetchResult(target);
}fetchResult(target);

function getDayName(number) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[number] || "";
}
