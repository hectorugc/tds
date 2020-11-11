"use strict";
exports.__esModule = true;
var Portfolio_1 = require("./Portfolio");
var exchangeValue = [];
var tabledevises = document.getElementById("tabledevises");
var inputMonney = document.getElementById("inputMonney");
var inputmontant = document.getElementById("montant");
var boutonajouter = document.getElementById("ajouter");
var boutonretirer = document.getElementById("retirer");
var message = document.getElementById("message");
var ExchangePortfolio = new Portfolio_1.Portfolio();
APIExhange('https://api.exchangeratesapi.io/latest', inputMonney);
function APIExhange(url, selectCase) {
    fetch(url, {
        method: 'GET'
    })
        .then(function (response) { return response.json(); })
        .then(function (json) {
        console.log(json);
        var options = "";
        exchangeValue.push(json.rates);
        exchangeValue = exchangeValue[0];
        console.log(exchangeValue);
        for (var data in json.rates) {
            options += "<option value='" + data + "'>" + data + "</option>";
        }
        selectCase.innerHTML = options;
    })["catch"](function (err) {
        console.log("Error: " + err);
    });
}
function decendAddAmount() {
    try {
        var convertionRate = exchangeValue[inputMonney.value];
        console.log(convertionRate);
        ExchangePortfolio.addCurrencyPortfolio(parseInt(inputmontant.value), inputMonney.value, convertionRate);
        if (ExchangePortfolio.tabportefeuille.length !== 0) {
            tabledevises.innerHTML = "";
            ExchangePortfolio.tabportefeuille.map(function (element) {
                tabledevises.innerHTML += "<tr><td>" + ("" + element.curencyTypes) + "</td><td>" + ("" + element.amounts) + "</td><td>" + Math.round((element.amounts / element.rateEuro) * 100) / 100 + "</td></tr>";
            });
        }
        // console.log("arreglo de resultado: ");
        // console.log(portefeuille.tabportefeuille);
    }
    catch (error) {
        message.innerText = error;
        return;
    }
}
function withdrawlAmount() {
    // tabledevises.innerHTML="";
    try {
        ExchangePortfolio.retirerDeviseHorsPortefeuille(parseInt(inputmontant.value), inputMonney.value);
        tabledevises.innerHTML = "";
        ExchangePortfolio.tabportefeuille.map(function (element) {
            tabledevises.innerHTML += "<tr><td>" + ("" + element.curencyTypes) + "</td><td>" + ("" + element.amounts) + "</td><td>" + Math.round((element.amounts / element.rateEuro) * 100) / 100 + "</td></tr>";
        });
    }
    catch (error) {
        message.innerHTML = error;
        return;
    }
}
boutonajouter.addEventListener("click", decendAddAmount);
boutonretirer.addEventListener("click", withdrawlAmount);
