addСurrencyInSelect();
let selectLeft = document.querySelector('.select-left');
let selectRigth = document.querySelector('.select-rigth');
let buttonLeftCurrency = document.querySelectorAll('.leftCurrency');
let buttonRightCurrency = document.querySelectorAll('.rightCurrency');
let colorButtonsRight = document.querySelectorAll('.color-Buttons-right');
let colorButtonsLeft = document.querySelectorAll('.color-Buttons-left');
let exchangeRateLeft = document.querySelector('.exchange-rate-left');
let exchangeRateRight = document.querySelector('.exchange-rate-right');
let inputLeft = document.querySelector('.input-left');
let inputRight = document.querySelector('.input-right');
let buttonArrows = document.querySelector('.arrows');
let loadingScreen = document.querySelector('.loading-screen');
loadingScreen.style.display = 'none';
let leftCurrency = 'RUB';
let rightCurrency = 'USD';
let arr2Data = [];
let reverseVariableOne = '';
let reverseVariableTwo = '';
gettingCurrencyData();

selectLeft.addEventListener('change', (e) => {
    leftCurrency = e.target.value;
    gettingCurrencyData();
    colorOfButtons(e, 'true')
    cleaningOptionsColor()
});

selectRigth.addEventListener('change', (e) => {
    rightCurrency = e.target.value;
    gettingCurrencyData();
    colorOfButtons(e)
    cleaningOptionsColor()
});

buttonLeftCurrency.forEach((item) => {
    item.addEventListener('click', (e) => {
        leftCurrency = e.target.innerText;
        gettingCurrencyData();
        colorOfButtons(e, 'true')
    })
});

buttonRightCurrency.forEach((item) => {
    item.addEventListener('click', (e) => {
        rightCurrency = e.target.innerText;
        gettingCurrencyData();
        colorOfButtons(e)
    })
});

inputLeft.addEventListener('input', (e) => {    
    inputRight.value = +(e.target.value*arr2Data[0][rightCurrency]).toFixed(4);
})

inputRight.addEventListener('input', (e) => {     
    inputLeft.value = +(e.target.value*arr2Data[1][leftCurrency]).toFixed(4);

})

buttonArrows.addEventListener('click', () => {  
    for (item of colorButtonsLeft){        
        item.classList.remove('button-color')
        if (item.innerText === reverseVariableTwo) {            
            item.classList.add('button-color')
        } else if(item.querySelector(`[value="${reverseVariableTwo}"]`)) {
            item.value = reverseVariableTwo;
            item.classList.add('button-color')    
        }
    }
    for (item of colorButtonsRight) { 
        item.classList.remove('button-color');
        if (item.innerText === reverseVariableOne) {            
            item.classList.add('button-color')                      
        } else if (item.querySelector(`[value="${reverseVariableOne}"]`)) {            
            item.value = reverseVariableOne;
            item.classList.add('button-color');

        }
    }    
    reverseСonversion()
    reverseVariable()
    cleaningOptionsColor()
})

function reverseVariable() {    
    let a = reverseVariableTwo;
    reverseVariableTwo = reverseVariableOne;
    reverseVariableOne = a;    
}

function cleaningOptionsColor() {
    let a = document.querySelectorAll('option');
    a.forEach((item) => {
        item.style.backgroundColor = 'white';
        item.style.color = 'black'
    })
}

function addСurrencyInSelect() {    
    fetch('https://api.ratesapi.io/api/latest?HTTP/2')
        .then(response => response.json())
        .then(data => {
            delete data.rates.USD;
            delete data.rates.GBP;
            delete data.rates.EUR;
            delete data.rates.RUB;
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
    if (leftCurrency === rightCurrency) {        
        arrData = [{[leftCurrency]:1}, {[rightCurrency]:1}];        
        calculationsAndInsertionInDOM(arrData)        
    } else {    
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
        
        let id = setTimeout(() => {
            onLoadingScreen()
        }, 500);        
        Promise.all([promiseConverter, promiseReverseConverter])
            .then((arrData) => {calculationsAndInsertionInDOM(arrData); clearTimeout(id); OffLoadingScreen()})
    }
}

function onLoadingScreen() {    
    loadingScreen.style.display = 'flex'; 
}

function OffLoadingScreen() {    
    loadingScreen.style.display = 'none';    
}

function reverseСonversion() {   
    if (inputRight.value == +(inputLeft.value*arr2Data[0][rightCurrency]).toFixed(4)) {        
        exchangeRateLeft.innerText = `1 ${rightCurrency} = ${arr2Data[1][leftCurrency].toFixed(4)} ${leftCurrency}`;
        exchangeRateRight.innerText = `1 ${leftCurrency} = ${arr2Data[0][rightCurrency].toFixed(4)} ${rightCurrency}`;
        inputRight.value = +(inputLeft.value*arr2Data[1][leftCurrency]).toFixed(4); 
    } else {        
        exchangeRateLeft.innerText = `1 ${leftCurrency} = ${arr2Data[0][rightCurrency].toFixed(4)} ${rightCurrency}`;
        exchangeRateRight.innerText = `1 ${rightCurrency} = ${arr2Data[1][leftCurrency].toFixed(4)} ${leftCurrency}`;    
        inputRight.value = +(inputLeft.value*arr2Data[0][rightCurrency]).toFixed(4);
    }
}

function calculationsAndInsertionInDOM(arrData){    
    arr2Data = arrData;        
    reverseVariableOne = leftCurrency;
    reverseVariableTwo = rightCurrency;
    exchangeRateLeft.innerText = `1 ${leftCurrency} = ${arr2Data[0][rightCurrency].toFixed(4)} ${rightCurrency}`;
    exchangeRateRight.innerText = `1 ${rightCurrency} = ${arr2Data[1][leftCurrency].toFixed(4)} ${leftCurrency}`;    
    inputRight.value = +(inputLeft.value*arr2Data[0][rightCurrency]).toFixed(4);    
}

function colorOfButtons(e, side) {
    if (side === 'true') {    
        colorButtonsLeft.forEach((item) => {
            item.classList.remove('button-color')
        })
        e.target.classList.add('button-color')
    } else {            
        colorButtonsRight.forEach((item) => {
            item.classList.remove('button-color');
            })
            e.target.classList.add('button-color');
    }
}










