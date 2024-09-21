import View from './view';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks yet, find a nice recipe and save it!';
  _message = '';

  addHendlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false)) //stringad gardaimqena rm mere DOM shi shevitanot
      .join('');
  }
}
export default new BookmarksView();
