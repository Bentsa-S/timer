let userYear = 0,
    userMonth = 0,
    userDate = 0,
    d = 0,
    h = 0,
    m = 0,
    s = 0,
    start = 0,
    tick,
    leftTime,
    formSelect = document.forms[0],
    month = ['січень','лютий','березень','квітень','травень','червень','липень','серпень','вересень','жовтень','листопад','грудень'],
    selectLength = 3,
    numberCircle = 4;




for (let i = 0; i < numberCircle; i++){
    let div = document.createElement('div'),
        template = document.querySelector("template"),
        timeContainer = document.querySelector('.time-container');

        div.append(template.content.cloneNode(true))
    timeContainer.prepend(div)
}
for (let i =0; i < selectLength; i++){
    let divInput = document.querySelector('.input-container')
    let select = document.createElement('select')
    select.classList.add(`select${i}`)
    divInput.prepend(select)
}
for (let i = 2022; i < 2100; i++){
    let select = document.querySelector('.select2'),
        option = document.createElement('option');
    option.value = i
    option.innerText = i
    select.prepend(option)
}
for (let i = 1; i < month.length + 1; i++){
    let select = document.querySelector('.select1'),
        option = document.createElement('option');
    option.value = i
    option.innerText = month[i-1];
    select.append(option)
}
for (let i = 1; i < 31; i++){
    let select = document.querySelector('.select0'),
        option = document.createElement('option');
    option.value = i
    option.innerText = i
    select.prepend(option)
}


document.querySelector('div.button').addEventListener('click', () =>{
    if (start === 0){
        userYear = formSelect.elements[0].value
        userMonth = formSelect.elements[1].value
        userDate = formSelect.elements[2].value
        tick = window.setInterval(workTimeTimers , 1000)
    }
})
document.querySelector('div.button-stop').addEventListener('click', () =>{
    if(start === 1){
        clearInterval(tick)
        stopButton()
        remuwe()
        start--
    }

})



function workTimeTimers(){
    let circle = document.querySelectorAll('circle'),
        divClasNumbers = document.querySelectorAll('.number'),
        userTime = new Date(`${userMonth} ${userDate} ${userYear} 00:00:00 GMT+0200`),
        nowTime = new Date()

    leftTime =  userTime - nowTime

    if (leftTime < 0){
        clearInterval(tick)
        alert('ця дата уже була цього року')
    }else{
        addColor('#3b3b3b', '#ff8888')
        let day = Math.floor(leftTime / 1000 /60 /60 /24),
            hours = Math.floor(leftTime / 1000 /60 /60) %24,
            minutes = Math.floor(leftTime / 1000 /60) %60,
            second = Math.floor(leftTime / 1000) % 60

        if (start === 0){
            h = 52.3333 * (24 - hours)
            m = 20.9333 * (60 - minutes)
            s = 20.9333 * (60 - second)
            start++
        }
        day < 10 ? day = '0' + day : day
        hours < 10 ? hours = '0' + hours : hours
        minutes < 10 ? minutes = '0' + minutes : minutes
        second < 10 ? second = '0' + second : second
        divClasNumbers[circle.length-4].textContent = day
        divClasNumbers[circle.length-3].textContent = hours
        divClasNumbers[circle.length-2].textContent = minutes
        divClasNumbers[circle.length-1].textContent = second


        s += 20.94
        circle[circle.length-3].style.strokeDashoffset = `${h}`
        circle[circle.length-2].style.strokeDashoffset = `${m}`
        circle[circle.length-1].style.strokeDashoffset = `${s}`
        if (s > 1255)
            s = 0;
        if (s === 20.94){      m += 20.94;  circle[2].style.strokeDashoffset = `${m}`  }
        if (m > 1258){ m = 0;  h += 52.34;  circle[1].style.strokeDashoffset = `${h}`}

    }

}

function stopButton(){
    addColor('#ff8888', '#3b3b3b')
    leftTime = 0
}
function addColor(colorP, colorH1) {
    let p = document.querySelector('p'),
        h1= document.querySelector('h1');
    p.style.color = `${colorP}`
    h1.style.color = `${colorH1}`
}
function remuwe() {
    let divClasNumbers = document.querySelectorAll('.number'),
        circle = document.querySelectorAll('circle')
    for (let i = 0; i < numberCircle; i++){
        divClasNumbers[i].textContent = '00'
        circle[i].style.strokeDashoffset = '0'
    }
    leftTime = 0

}





