addСurrencyInSelect();
let selectLeft = document.querySelector('.select-left');
let selectRigth = document.querySelector('.select-rigth');
let buttonLeftCurrency = document.querySelectorAll('.leftCurrency');
let buttonRightCurrency = document.querySelectorAll('.rightCurrency');
let exchangeRateLeft = document.querySelector('.exchange-rate-left');
let exchangeRateRight = document.querySelector('.exchange-rate-right');
let inputLeft = document.querySelector('.input-left');
let inputRight = document.querySelector('.input-right');
let leftCurrency = 'RUB';
let rightCurrency = 'USD';
let arr2Data = [];
gettingCurrencyData();


selectLeft.addEventListener('change', (e) => {
    leftCurrency = e.target.value;
    gettingCurrencyData();
});

selectRigth.addEventListener('change', (e) => {
    rightCurrency = e.target.value;
    gettingCurrencyData();
});

buttonLeftCurrency.forEach((item) => {
    item.addEventListener('click', (e) => {
        leftCurrency = e.target.innerText;
        gettingCurrencyData();
    })
});

buttonRightCurrency.forEach((item) => {
    item.addEventListener('click', (e) => {
        rightCurrency = e.target.innerText;
        gettingCurrencyData();
    })
});

inputLeft.addEventListener('input', (e) => {    
    inputRight.value = +(e.target.value*arr2Data[0][rightCurrency]).toFixed(4);
})

inputRight.addEventListener('input', (e) => {     
    inputLeft.value = +(e.target.value*arr2Data[1][leftCurrency]).toFixed(4);

})

function addСurrencyInSelect() {    
    fetch('https://api.ratesapi.io/api/latest?HTTP/2')
        .then(response => response.json())
        .then(data => {
            for (let elem in data.rates){            
            selectLeft.append(createOption(elem));
            selectRigth.append(createOption(elem));
            }
        });
}

function createOption(elem) {
    let newOptions = document.createElement('option');
    newOptions.innerHTML = `${elem}`;
    newOptions.value = `${elem}`;
    return newOptions;
}

function gettingCurrencyData() {
    let promiseConverter = new Promise((resolve) => {
        fetch(`https://api.ratesapi.io/api/latest?base=${leftCurrency}&symbols=${rightCurrency}`)
            .then(response => response.json())
            .then(data => {
                resolve(data.rates)
            })
    });
    
    let promiseReverseConverter = new Promise((resolve) => {
        fetch(`https://api.ratesapi.io/api/latest?base=${rightCurrency}&symbols=${leftCurrency}`)
            .then(response => response.json())
            .then(reversedata => {                
                resolve(reversedata.rates)
        })
    });
    Promise.all([promiseConverter, promiseReverseConverter]).then((arrData) => { calculationsAndInsertionInDOM(arrData)})    
}

function calculationsAndInsertionInDOM(arrData){
    arr2Data = arrData;    
    exchangeRateLeft.innerText = `1 ${leftCurrency} = ${arr2Data[0][rightCurrency].toFixed(4)} ${rightCurrency}`;
    exchangeRateRight.innerText = `1 ${rightCurrency} = ${arr2Data[1][leftCurrency].toFixed(4)} ${leftCurrency}`;
    // inputRight.value = +(e.target.value*arr2Data[0][rightCurrency]).toFixed(4);
    // console.log(inputLeft.value = +(e.target.value*arr2Data[1][leftCurrency]).toFixed(4))
    
    
    
   
    
    

}








