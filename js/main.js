// select the button using ID
var button = document.querySelector('#translateBtn');
var userInput = document.querySelector('#userInput');
var resultInput = document.querySelector('#result');
var loadingDiv = document.querySelector('#loading');
var historyBox = document.querySelector("#history");
var historyArr = [""];


//onload function - history
function loadHistory() {
    if (localStorage.getItem("translationHistory") != null) {
        var retrievedData = localStorage.getItem("translationHistory");
        historyArr = JSON.parse(retrievedData);

        //historyBox.value = historyArr;
        for (var i = 0; i < historyArr.length; i++) {
            historyBox.append(historyArr[i]);
        }
    }
}

//insert into history and load new item
function insertIntoHistory(value1, value2) {
    var addItem = value1 + " -> " + value2 + "\n";
    historyArr.push(addItem);
    localStorage.setItem("translationHistory", JSON.stringify(historyArr));
    historyBox.append(addItem);
}

button.onclick = function () {
    if (userInput.value != "") {
        // show the loading dialog
        loadingDiv.style.display = 'block';
        // disable translate button
        button.setAttribute('disabled', 'disabled');

        console.log(userInput.value);
        var inputText = userInput.value;

        // test - write into DOM
        resultInput.value = inputText;

        // REST API url endpoint
        var url = 'https://api.mymemory.translated.net/get?q=' + inputText + '&langpair=cs|en';

        // create the GET request against API to obtain JSON result
        fetch(url)
            .then(function (response) {
                // server returns the response, parse it to JSON
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                // get translation string from JSON, put it in result input
                resultInput.value = myJson.responseData.translatedText;

                // hide the loading dialog
                loadingDiv.style.display = 'none';
                // enable translate button
                button.removeAttribute('disabled');

                insertIntoHistory(inputText, resultInput.value);
            });
    }
    else alert("Zadejte text k prelozeni");
}