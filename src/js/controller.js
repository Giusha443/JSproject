import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksVies.js';
import { MODAL_CLOSE_TIME } from './config.js';
import { async } from 'regenerator-runtime';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accept();
}

// 1)Loading Recipe
const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1); //#gareshe rom mivigot hash

    if (!id) return;
    recipeView.renderSpinner();
    //0)update results view to marks selected search result
    resultsView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);
    //1)Loading recipe
    await model.loadRecipe(id); //raxan async aris romise abrunebs

    // 2)Rendering Recipe
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //get search query sakvandzo sityva
    const query = searchView.getQuery();
    if (!query) return;
    //Load results
    await model.loadSearchResults(query);
    //Render results
    // resultsView.render(model.state.search.results); //all results
    resultsView.render(model.getSearchResultPage());
    //Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  //Render results
  resultsView.render(model.getSearchResultPage(goToPage));
  //Render pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipies servings(in state)
  model.updateServings(newServings);
  //update view
  // recipeView.render(model.state.recipe);rom chedavda xeaxka vqnat sxvanairad
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1) add or remove bookmars
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deleteBookMark(model.state.recipe.id);
  //update recipeview
  recipeView.update(model.state.recipe);
  //render bookmarsk
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHendlerRender(controlBookmarks);
  recipeView.addHendlerRender(controlRecipies);
  recipeView.addHendlerUpdateServings(controlServings);
  recipeView.addHendlerAddBookmark(controlAddBookmark);
  searchView.addHendlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
