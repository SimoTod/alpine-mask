import Mask from '../src/index'

document.addEventListener('alpine:initializing', () => {
    Mask(window.Alpine)
})
