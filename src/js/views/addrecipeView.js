import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    //egreve gvinda gmaovidzaxot raxan controlers didad araferes adlzevs da tavistvisaa tavidavne gvchirdeba
    super();
    this._addHendlerShowWindow();
    this._addHendlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHendlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  } //eventListenershi mshobelze iqneba this , amitom clake gvinda es washla classis, da bind mivabamt

  _addHendlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHendlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //API call aris amitom model shi vwert
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
  clear() {
    this._parentElement.innerHTML = ''; // Clear the entire inner HTML content
  } //ar shveboda ratomgac spiineri da amitom ase momiwia
}

export default new AddRecipeView();
