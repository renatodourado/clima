
function warning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

function showInfo(json){
    json.temp = parseInt(json.temp);
    json.max = parseInt(json.max);
    json.min = parseInt(json.min);
    json.sense = parseInt(json.sense);

    warning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.tempSense').innerHTML = `${json.sense} <sup>ºC</sup> <span>Sensação</span>`;
    document.querySelector('.tempDesc').innerHTML = `${json.tempDesc}`;

    document.querySelector('.tempMax').innerHTML = `${json.max} <sup>ºC</sup> <span>Máx.</span>`;
    document.querySelector('.tempMin').innerHTML = `${json.min} <sup>ºC</sup> <span>Min.</span>`;

    document.querySelector('.resultado').style.display = 'block';

}


function clearInfo(){
    warning('');
    document.querySelector('.resultado').style.display = 'none';
}


document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value;
    
    if(input !== ''){
        clearInfo();
        warning('Carregando...');
    

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=1f6bb5fbf3b4f2b018aadaac5236bc17&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
        console.log(json);
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                sense: json.main.feels_like,
                max: json.main.temp_max,
                min:json.main.temp_min,
                tempIcon: json.weather[0].icon,
                tempDesc: json.weather[0].description,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
                
            });

        }else{
            clearInfo();
            warning('Cidade não encontrada.');
        }
    }else{
        clearInfo();
    }  
})



