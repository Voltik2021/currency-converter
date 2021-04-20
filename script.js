addСurrency()
let selectLeft = document.querySelector('.select-left');
let selectRigth = document.querySelector('.select-rigth');
let butRUBleft = document.querySelector('.butRUBleft');
let butUSDleft = document.querySelector('.butUSDleft');
let butEURleft = document.querySelector('.butEURleft');
let butGBRleft = document.querySelector('.butGBRleft');
let butRUBright = document.querySelector('.butRUBright');
let butUSDright = document.querySelector('.butUSDright');
let butEURright = document.querySelector('.butEURright');
let butGBRright = document.querySelector('.butGBRright');
let ghgh = ''
selectLeft.addEventListener('change', (e) => {
    console.log(e.target.value);
});

selectRigth.addEventListener('change', (e) => {
     e.target.value;    
});

butRUBleft.addEventListener('click', (e) => {
    console.log(e.target.value);
});





function addСurrency() {    
    fetch('https://api.ratesapi.io/api/latest?HTTP/2')
        .then(response => response.json())
        .then(data => {
            for (let elem in data.rates){
            let newOptions = document.createElement('option');
            let newOptionstwo = document.createElement('option');
            newOptions.innerHTML = `${elem}`;
            newOptions.value = `${elem}`;
            newOptionstwo.innerHTML = `${elem}`;
            newOptionstwo.value = `${elem}`;
            selectLeft.append(newOptions);
            selectRigth.append(newOptionstwo);
            }
        });        
}



