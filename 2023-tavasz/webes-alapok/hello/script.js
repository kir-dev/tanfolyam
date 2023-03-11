window.onload = function (){
    const button = document.getElementById('changeColorButton')
    const section = document.getElementsByClassName('section')[0]
    button.onclick = function(){
       const result = section.classList.toggle('highlight')
       button.textContent =  result ?'Bezárom': "Részletek"
    }
}
