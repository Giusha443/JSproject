import View from './view';
// import icons from 'url:../../img/icons.svg';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recepies found for your query...';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false)) //stringad gardaimqena rm mere DOM shi shevitanot
      .join('');
  }
}
export default new ResultsView();
