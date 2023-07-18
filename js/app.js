document.addEventListener('DOMContentLoaded', () =>{
    const main = document.querySelector('.main')
    const wrapper = document.querySelector('.wrapper')
    let formContainer = document.querySelector('.form-container')
    let buttonsContainer = document.querySelector('.btns-container')
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
                <div class="banner_value">${options.cardName1 || `${options.id} Card one`}</div>
            </div>
            <div class="banner_item">
                <img src="${options.src2 || "./img/default-icon.svg"}" class="card-icon banner_icon" data-card="card-1">
                <div class="banner_value">${options.cardName2 || `${options.id} Card two`}</div>
            </div>
        </div>
        </div>
        <div title="Remove couple" class="${"banner_close btn-close-" + options.id}"></div>
        `);

        formContainer.appendChild(banner)

        btnRun.disabled = false
    }

    function blurBanner(arr){
        let seeAllBanners = document.querySelector('.see_all-btn')
        seeAllBanners.disabled = false
        seeAllBanners.classList.remove('disabled')

        if(arr.length === 0){
            return
        } else if(arr.length !== 0){
            for(let i = 1; i < arr.length + 1; i++){
                document.querySelector(`.banner-id-`+ i).children[0].children[1].style.filter = 'blur(4px)'
            }
        }
    }

    function seeBanner(button, element){
        let seeAllBanners = document.querySelector('.see_all-btn')
        seeAllBanners.disabled = true
        seeAllBanners.classList.add('disabled')

        let number = button.classList.value.toString().replace('banner_close btn-close-', '').replace(' banner_see', '')
        if(element.classList.contains(`banner-id-`+ number)){
            element.children[0].children[1].style.filter = 'none'
            element.children[1].classList.add('banner_see-open')

            setTimeout(() =>{
                element.children[0].children[1].style.filter = 'blur(4px)'
                element.children[1].classList.remove('banner_see-open')
                seeAllBanners.disabled = false
                seeAllBanners.classList.remove('disabled')
            }, 3000)
        }
    }

    function seeAllBanners(arr){
        let seeAllbtn = document.querySelector('.see_all-btn');
        let j = 0;
        while(j < arr.length){
            arr[j].children[0].children[1].style.filter = 'none'
            arr[j].children[1].classList.add('banner_see-open')
            arr[j].children[1].disabled = true
            arr[j].children[1].style.cursor = 'auto'
            j++
        }

        seeAllbtn.textContent = 'Hide all'
    }

    function hideAllBanners(arr){
        let seeAllbtn = document.querySelector('.see_all-btn');
        let j = 0;
        while(j < arr.length){
            arr[j].children[0].children[1].style.filter = 'blur(4px)'
            arr[j].children[1].classList.remove('banner_see-open')
            arr[j].children[1].disabled = false
            arr[j].children[1].style.cursor = 'pointer'
            j++
        }

        seeAllbtn.textContent = 'See all'
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
                _createBanner(cardsOptions[i])
            }
            i--
        }
    }

    document.addEventListener('click', function(event){
        let banners = document.querySelectorAll('.banner')
        let allBanners = []
        for(let banner of banners){
            if(!banner.classList.contains('done')){
                allBanners.push(banner)
            }
        }


        if(event.target.classList[0] === 'banner_close' && event.target.classList.contains('banner_see')){
            banners.forEach(el =>{
                seeBanner(event.target, el)
            })
        } else if(event.target.classList[0] === 'banner_close'){
            banners.forEach(el =>{
                deleteBanner(event.target, el)
            })
        }

        if(event.target.textContent === 'See all'){
            seeAllBanners(allBanners)
        } else if(event.target.textContent === 'Hide all'){
            hideAllBanners(allBanners)
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
        let banner = document.querySelectorAll(".banner")
        let containerIndex = 1;
        let front = document.querySelectorAll('.front')
        let back = document.querySelectorAll('.back')
        let banners = document.querySelectorAll('.banner')
        let seeBannersBtn = document.querySelector('.see_all-btn')

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

                    banners[containerIndex - 1].classList.add('done')
                    progressBtns[containerIndex - 1].classList.add('banner_completed')
                    progressBtns[containerIndex - 1].disabled = 'true'
                    progressBtns[containerIndex - 1].setAttribute('title', '')
                    banner[containerIndex - 1].children[0].children[1].style.filter = 'none'
                    containerIndex++
                    return containerIndex
                } else if(document.querySelector('.container-' + (containerIndex + 1)) === null){
                    banners[containerIndex - 1].classList.add('done')
                    progressBtns[containerIndex - 1].classList.add('banner_completed')
                    progressBtns[containerIndex - 1].disabled = 'true'
                    progressBtns[containerIndex - 1].setAttribute('title', '')
                    banner[containerIndex - 1].children[0].children[1].style.filter = 'none'

                    seeBannersBtn.parentNode.removeChild(seeBannersBtn)

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
        let progressBtns = document.querySelectorAll('.banner_close')
        let btnAdd = document.getElementById('btn-new-coupe')

        btnAdd.style.display = 'none'
        btnRun.style.display = 'none'

        if(!formContainer.children[0].classList.contains('see_all-btn')){
            formContainer.insertAdjacentHTML('afterbegin', `
            <button class="see_all-btn">See all</button>
            `)
        }

        blurBanner(cardsOptions)

        progressBtns.forEach(progressBtn =>{
            if(progressBtn.classList.contains('banner_completed')){
                progressBtn.classList.remove('banner_completed')
                progressBtn.classList.add('banner_see')
                progressBtn.disabled = 'false'
                progressBtn.setAttribute('title', 'See banner')
            } else {
                progressBtn.classList.add('banner_see')
                progressBtn.disabled = 'false'
                progressBtn.setAttribute('title', 'See banner')
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

        buttonsContainer.insertAdjacentHTML('afterbegin', `
            <button class="btn clear_all-btn" id="clear-all-btn">Clear all</button>
        `)

        let clearAllBtn = document.getElementById('clear-all-btn')

        clearAllBtn.addEventListener('click', () => {
            location.reload()
        })
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