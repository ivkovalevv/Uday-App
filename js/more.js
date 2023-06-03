document.addEventListener('DOMContentLoaded', () =>{
    let burger = document.getElementById('burger')
    let close = document.getElementById('close')
    let menu = document.getElementById('menu')

    burger.addEventListener('click', ()=>{
        menu.style.left = '0'
    })

    close.addEventListener('click', ()=>{
        menu.style.left = '-120%'
    })
})