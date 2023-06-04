document.addEventListener('DOMContentLoaded', () =>{
    const main = document.querySelector('.main')
    const wrapper = document.querySelector('.wrapper')
    const formContainer = document.querySelector('.form-container')
    let btnNewCouple = document.getElementById('btn-new-coupe')
    let btnRun = document.getElementById('btn-run')
    btnRun.disabled = true
    btnNewCouple.disabled = false
    let i = 1;
    let cardsOptions = [];
    const selectData = {
        placeholder: 'IMG',
        selectedId: '1',
        data: [
            {id: '1', value: './img/default-icon.svg'},
            {id: '2', value: './img/yoga.svg'},
            {id: '3', value: './img/игра.svg'},
            {id: '4', value: './img/iying.svg'},
            {id: '5', value: './img/подарок.svg'},
            {id: '6', value: './img/рилсы.svg'},
            {id: '7', value: './img/картина.svg'},
            {id: '8', value: './img/кофе.svg'},
            {id: '9', value: './img/мечтать.svg'},
            {id: '10', value: './img/утка.svg'},
            {id: '11', value: './img/ужин.svg'},
            {id: '12', value: './img/психоанализ.svg'}
        ], 
        onSelect(item) {
            console.log('Selected item:', item)

            return item
        }
    }

    function _createCouple(options){
        const container = document.createElement('div')
        container.classList.add('animate__animated')
        container.classList.add('container')
        container.classList.add(`container-${options.id}`)

        container.insertAdjacentHTML('afterbegin', `
            <div class="card card-1" data-card="card-1">
                <div class="front visible" data-card="card-1"><span data-card="card-1">${options.id}</span></div>
                <div class="back non-visible" data-card="card-1">
                    <img src="${options.src1 || "./img/default-icon.svg"}" class="card-icon" data-card="card-1">
                    <span data-card="card-1">${options.cardName1}</span>
                </div>
            </div>
            <div class="card card-2" data-card="card-2">
                <div class="front visible" data-card="card-2"><span data-card="card-2">${options.id}</span></div>
                <div class="back non-visible" data-card="card-2">
                    <img src="${options.src2 || "./img/default-icon.svg"}" class="card-icon" data-card="card-2">
                    <span data-card="card-2">${options.cardName2}</span>
                </div>
            </div>
        `);

        wrapper.appendChild(container)

        return container
    }

    function _createBanner(options){
        btnNewCouple.disabled = false

        const banner = document.createElement('div')
        banner.classList.add('banner')
        banner.classList.add('animate__animated')
        banner.classList.add('animate__fadeInLeft')
        banner.classList.add('animate__faster')
        banner.classList.add("banner-id-" + options.id)

        banner.insertAdjacentHTML('afterbegin', `
        <div class="banner_content">
        <div class="banner_number">${options.id}</div>
        <div class="banner_container">
            <div class="banner_item">
                <img src="${options.src1 || "./img/default-icon.svg"}" class="card-icon banner_icon" data-card="card-1">
                <div class="banner_value">${options.cardName1}</div>
            </div>
            <div class="banner_item">
                <img src="${options.src2 || "./img/default-icon.svg"}" class="card-icon banner_icon" data-card="card-1">
                <div class="banner_value">${options.cardName2}</div>
            </div>
        </div>
        </div>
        <div title="Remove couple" class="${"banner_close btn-close-" + options.id}"></div>
        `);

        /* banner.insertAdjacentHTML('afterbegin', `
        <div class="banner_number">${options.id}</div>
        <div class="banner_container">
            <div class="banner_item">
                <img src="${options.src1 || "./img/default-icon.svg"}" class="card-icon banner_icon" data-card="card-1">
                <div class="banner_value">${options.cardName1}</div>
            </div>
            <div class="banner_item">
                <img src="${options.src2 || "./img/default-icon.svg"}" class="card-icon banner_icon" data-card="card-1">
                <div class="banner_value">${options.cardName2}</div>
            </div>
        </div>
        <div title="Remove couple" class="${"banner_close btn-close-" + options.id}"></div>
        `); */

        formContainer.appendChild(banner)

        btnRun.disabled = false
    }

    function deleteBanner(button, element){
        let number = button.classList.value.toString().replace('banner_close btn-close-', '')
        if(element.classList.contains(`banner-id-`+ number)){
            element.parentNode.removeChild(element)

            formContainer.innerHTML = "";

            cardsOptions.splice([number - 1], 1)
            for(let i = 0; i < cardsOptions.length; i++){
                cardsOptions[i].id = i + 1
            }

            for(let i = 0; i < cardsOptions.length; i++){
                console.log(i)
                _createBanner(cardsOptions[i])
            }
            console.log(cardsOptions)
            i--
        }
    }

    document.addEventListener('click', function(event){
        if(event.target.classList[0] === 'banner_close'){
            let banners = document.querySelectorAll('.banner')
            console.log(banners)
            banners.forEach(el =>{
                deleteBanner(event.target, el)
            })
        }
    })

    function createForm(){
        btnNewCouple.disabled = true

        let form = document.createElement('form')
        form.setAttribute('method', "post")
        form.classList.add('create-coupe-form')
        form.classList.add('animate__animated')
        form.classList.add('animate__zoomIn')
        form.classList.add('animate__faster')
        let options = {};

        form.insertAdjacentHTML('afterbegin', `
            <div class="input-container">
                <label for="inputCard1" class="input-label">Card 1</label>
                <div class="input-wrapper">
                    <div id="select"></div>
                    <input class="create-card" id="inputCard1" type="text" name="text" minlength="1">
                </div>
                <label for="inputCard2" class="input-label">Card 2</label>
                <div class="input-wrapper">
                    <div id="select_2"></div>
                    <input class="create-card" id="inputCard2" type="text" name="text" minlength="1">
                </div>
            </div>
            <div class="btns-container">
            <button class="create-coupe-btn" id="createCoupe">Add</button>
            <button class="create-coupe-btn" id="cancelCoupe">Cancel</button>
            </div>
        `);

        formContainer.appendChild(form)

        const btnAdd = document.getElementById('createCoupe')
        const btnCancel = document.getElementById('cancelCoupe')
        const input1 = document.getElementById('inputCard1')
        const input2 = document.getElementById('inputCard2')

        function _formRemove(){
            form.classList.remove('animate__zoomIn')
            form.classList.add('animate__fadeOutRightBig')
            setTimeout(() => {
                form.parentNode.removeChild(form)
            }, 300)
        }        

        btnAdd.addEventListener('click', function(e){
            e.preventDefault()
            const selectedIcons = document.querySelectorAll('[data-select="selected"]')
            options.id = i
            options.cardName1 = input1.value
            options.cardName2 = input2.value
            options.src1 = selectedIcons[0].getAttribute('src')
            options.src2 = selectedIcons[1].getAttribute('src')

            cardsOptions.push(options)
            
            _formRemove()
            setTimeout(() =>{
                _createBanner(options)
            }, 300)
            i++
        })

        btnCancel.addEventListener('click', function(e){
            e.preventDefault()
            btnNewCouple.disabled = false
            _formRemove()
        })

        return form, options;
    }

    btnNewCouple.addEventListener('click', () =>{
        createForm()

        const select = new Select('#select', selectData)
        const select_2 = new Select('#select_2', selectData)

        return {select, select_2}
    })

    let menu = document.getElementById('menu')

    function createBtnNext(){
        const button = document.createElement('button')
        button.classList.add('btn')
        button.classList.add('btn_next')
        button.setAttribute('id', 'next')
        button.textContent = 'Next'
        button.disabled = 'true'
        let progressBtns = document.querySelectorAll('.banner_close')
        let containerIndex = 1;
        let front = document.querySelectorAll('.front')
        let back = document.querySelectorAll('.back')

        main.appendChild(button)

        button.addEventListener('click', () => {
            front.forEach(el => {
                el.classList.remove('non-visible')
                el.classList.add('visible')
            })
            back.forEach(el => {
                el.classList.remove('visible')
                el.classList.add('non-visible')
            })
            let firstChild = wrapper.children[0]
    
            if(firstChild === document.querySelector('.container-' + containerIndex)){
                if(document.querySelector('.container-' + (containerIndex + 1)) !== null){
                    button.disabled = true
                    next(document.querySelector('.container-' + containerIndex), document.querySelector('.container-' + (containerIndex + 1)))

                    progressBtns[containerIndex - 1].classList.add('banner_completed')
                    progressBtns[containerIndex - 1].disabled = 'true'
                    progressBtns[containerIndex - 1].setAttribute('title', '')
                    containerIndex++
                    return containerIndex
                } else if(document.querySelector('.container-' + (containerIndex + 1)) === null){
                    progressBtns[containerIndex - 1].classList.add('banner_completed')
                    progressBtns[containerIndex - 1].disabled = 'true'
                    progressBtns[containerIndex - 1].setAttribute('title', '')
                    document.querySelector('.container-' + containerIndex).classList.add('animate__backOutLeft')
                    setTimeout(()=>{
                        document.querySelector('.container-' + containerIndex).style.display = 'none'
                        document.querySelector('.container-' + containerIndex).remove()
                        _createFinish()
                    }, 1000)
                }
            }
        })

        return button
    }

    btnRun.addEventListener('click', () =>{
        menu.style.left = '-100%'
        wrapper.innerHTML = ''
        btnRun.disabled = true
        let progressBtns = document.querySelectorAll('.banner_close')
        progressBtns.forEach(progressBtn =>{
            if(progressBtn.classList.contains('banner_completed')){
                progressBtn.classList.remove('banner_completed')
                progressBtn.disabled = 'false'
                progressBtn.setAttribute('title', 'Remove couple')
            }
        })
        for (let i = 0; i < cardsOptions.length; i++){
            _createCouple(cardsOptions[i])
        }
        if(document.getElementById('next')){
            return
        } else{
            createBtnNext()
        }
    })

    document.addEventListener('click', (event) =>{
        let btnNext = document.getElementById('next')
        const target = event.target.dataset.card
        let front = document.querySelectorAll('.front')
        let back = document.querySelectorAll('.back')
        if(target === 'card-1'){
            const element = document.querySelector(`.${target}`);
            const removeEl = document.querySelector('.card-2')

            front.forEach(el => {
                el.classList.remove('visible')
                el.classList.add('non-visible')
            })
            back.forEach(el => {
                el.classList.remove('non-visible')
                el.classList.add('visible')
            })

            element.classList.add('open')
            removeEl.style.display = 'none'
            btnNext.disabled = false

        } else if(target === 'card-2'){
            const element = document.querySelector(`.${target}`);
            const removeEl = document.querySelector('.card-1')

            front.forEach(el => {
                el.classList.remove('visible')
                el.classList.add('non-visible')
            })
            back.forEach(el => {
                el.classList.remove('non-visible')
                el.classList.add('visible')
            })

            element.classList.add('open')
            removeEl.style.display = 'none'
            btnNext.disabled = false
        } else if(target === 'btn-close-1'){
            console.log(cardsOptions)
        }
    })

    function next(cont1, cont2){
        cont1.classList.add('animate__backOutLeft')
            setTimeout(()=>{
                cont1.style.display = 'none'
                cont1.remove()
                cont2.style.display = 'flex'
                cont2.classList.add('animate__backInRight')
            }, 1000)
    }

    function _createFinish(){
        const bannerFinish = document.createElement('div')
        bannerFinish.classList.add('banner-finish')
        bannerFinish.classList.add('animate__animated')
        bannerFinish.classList.add('animate__fadeIn')

        bannerFinish.insertAdjacentHTML('afterbegin', `
        <p class="banner-finish__text">Congratulations!</p>
        <p class="banner-finish__text">You have passed the game!</p>
        `);

        wrapper.appendChild(bannerFinish)

        let btnNext = document.getElementById('next')
        btnNext.parentNode.removeChild(btnNext)
        return bannerFinish
    }
});