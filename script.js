let apiKey = 'S67eYFRD16YLeZgkpQP3Huq0LcENrN4n79wwG0pI';
let apiUrl = 'https://developer.nps.gov/api/v1/parks';

function getParks(states) {
    let maxResults = $("input[type=number]").val();
    const params = {
        api_key: apiKey,
        stateCode: states,
        limit: maxResults
    };
    console.log(Object.values(params));
    const queryString = getString(params);
    console.log(queryString);
    let url = apiUrl + "?" + queryString;
    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function getStates() {
    let states = $('input:checked');
    let selected = '';
    for (let i = 0; i < states.length; i++) {
        if (states.length == 1) {
            selected = states[i].value;
        } else {
            selected += states[i].value + ",";
    }
    }
    getParks(selected);
};

function search() {
    $("form").on('submit', function(event) {
        $(".states-list").toggleClass('hidden');
        event.preventDefault();
        getStates();
    });
}

$(function showList() {
    $("button").on('click', function(event) {
        event.preventDefault();
        $(".states-list").toggleClass('hidden');
    })
})

function displayResults(responseJson) {
    let parks = '';
    if ($('input[type="checkbox"]').is(':checked')) {
        for (let i = 0; i < responseJson.data.length; i++) {
            parks += `<li class="park-list-item">
            <h2>${responseJson.data[i].fullName}</h2>
            <p>${responseJson.data[i].description}</p>
            <p><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></p>
            </li>`;
        }
    } else {
        console.log('unchecked');
        parks = `<h1>must select state or states</h1>`;
};
console.log(parks);
    $(".main-list").html(parks);
}
function getString (params) {
    let paramsArray = Object.entries(params);
    let newArr = [];
    console.log(paramsArray);
    for (let i = 0; i < paramsArray.length; i++) {
        let subArr = paramsArray[i].join('=');
        newArr.push(subArr);
    }
    let string = newArr.join('&');
    return string;
}

$(search());