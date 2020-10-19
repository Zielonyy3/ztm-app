class NavBar {
    constructor(navContainerElement, navBarHamburgerButton) {
        this.navContainer = navContainerElement
        this.navBarElem = this.navContainer.querySelector('.navbar');
        this.navBarHamburgerBtn = navBarHamburgerButton;
        this.navEmptySpace = document.querySelector('.nav-empty-space');

        this.navBarHamburgerBtn.addEventListener('click', this.toggleNavMenu.bind(this, ));
        this.navEmptySpace.addEventListener('click', this.toggleNavMenu.bind(this, ));
    }
    toggleNavMenu() {
        const compNavBar = window.getComputedStyle(this.navBarElem);
        let duration = compNavBar.getPropertyValue('transition-duration')
        duration = duration.substring(0, duration.indexOf('s'));

        if (this.navBarElem.classList.contains('navbar-hidden') && this.navContainer.classList.contains('micro')) {
            this.navContainer.classList.remove('micro')
            this.navBarHamburgerBtn.classList.add('navbar-shown-btn');
            this.navBarElem.classList.remove('navbar-hidden');
            this.navEmptySpace.classList.remove('navbar-hidden');
        } else if (!this.navBarElem.classList.contains('navbar-hidden')) {
            this.navBarHamburgerBtn.classList.remove('navbar-shown-btn');
            this.navBarElem.classList.add('navbar-hidden');
            this.navEmptySpace.classList.add('navbar-hidden');
            setTimeout(() => this.navContainer.classList.add('micro'), duration * 1000);
        } else {
            console.warn('NavBar aktualnie w użyciu')
        }
    }
}

class InformationMenu {
    constructor(infoContainer, buttonsContainer) {
        this.infoContainer = infoContainer;
        this.infoCardsList = this.infoContainer.querySelectorAll('.info-card');

        this.buttonsContainer = buttonsContainer;

        this.switchButtons = buttonsContainer.querySelectorAll('.switch-btn');
        this.switchButtons.forEach(btn => btn.addEventListener('click', e => {
            this.switchCard.call(this, e.target)
        }))
    }

    switchCard(clickedBtn) {
        let activeCardNumber = this.buttonsContainer.querySelector('.active-swtich-btn').id;
        activeCardNumber = activeCardNumber.substring(activeCardNumber.indexOf('-') + 1, activeCardNumber.length);

        this.switchButtons.forEach(el => el.classList.remove('active-swtich-btn'));
        clickedBtn.classList.add('active-swtich-btn');

        let cardNumber = clickedBtn.id;
        cardNumber = cardNumber.substring(cardNumber.indexOf('-') + 1, cardNumber.length);

        const cardsArr = Array.from(this.infoCardsList);
        let tmp = []
        cardsArr.forEach(el => {
            const cardNo = el.id.substring(el.id.length - 1, el.id.length);
            if (cardNo == cardNumber) {
                tmp.unshift(el);
            } else
                tmp.push(el);
            el.style.transform = `translateX(${-(cardNumber * 100 - 100)}%)`;
        })
    }
}

class FullScreen {
    constructor(fullScreenButton, fullScreenMap) {
        this.fullScreenBtn = fullScreenButton;
        this.fullScreenMap = fullScreenMap;

        this.fullScreenBtn.addEventListener('click', () => this.showFullScreenMap())
    }
    showFullScreenMap() {
        this.fullScreenBtn.removeEventListener('click', () => this.showFullScreenMap());

        if (this.fullScreenBtn.children[0].classList.contains('fa-chevron-down')) {
            this.fullScreenBtn.children[0].classList.remove('fa-chevron-down');
            this.fullScreenBtn.children[0].classList.add('fa-chevron-up');
            this.fullScreenMap.classList.add('fullscreen-map');
        } else {
            this.fullScreenBtn.children[0].classList.remove('fa-chevron-up');
            this.fullScreenBtn.children[0].classList.add('fa-chevron-down');
            this.fullScreenMap.classList.remove('fullscreen-map');
        }
        setTimeout(() => this.fullScreenBtn.addEventListener('click', () => this.showFullScreenMap), 0.2 * 1000)

    }
}

const navBarObj = new NavBar(document.querySelector('.nav-container'), document.querySelector('.nav-btn'));
const infoMenu = new InformationMenu(document.querySelector('#info-container'), document.querySelector('.buttons-container'));
const fullScreenObj = new FullScreen(document.querySelector('.show-fullscreen'), document.querySelector('#mapid'));

const refreshBtn = document.querySelector('#refresh');
refreshBtn.addEventListener('click', e => {
    const icon = document.querySelector('#refresh+i');
    if (!icon.classList.contains('refresh-animation')) {
        icon.classList.add('refresh-animation')
        const compIcon = window.getComputedStyle(icon);
        let duration = compIcon.getPropertyValue('animation-duration')
        duration = duration.substring(0, duration.length - 1)
        setTimeout(() => icon.classList.remove('refresh-animation'), duration * 1000);
    } else
        console.warn('Animacja w trakcie!');
})