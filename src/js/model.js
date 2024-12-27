import { async } from 'regenerator-runtime';
import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';
// import recipeView from './views/recipeView.js';
export const state = {
  recipe: {},
  search: { query: '', results: [], resultsPerPage: RES_PER_PAGE, page: 1 },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), //tu araa key arafers izams tu ki mashin meore mxares dawersv
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipeObject(data);
    // let recipe = data.data.recipe;

    if (state.bookmarks.some(b => b.id === id)) state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 🚑🚑🚑`);
    throw err;
  }
};
//controller to use

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    console.log(data);

    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
        ...(res.key && { key: res.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    console.error(`${err} 🚑🚑🚑`);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0
  const end = page * state.search.resultsPerPage; //9
  return state.search.results.slice(start, end); //10 cali based on 0array
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookMark = function (recipe) {
  state.bookmarks.push(recipe);
  //Marking recipe as bookmarked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
};

export const deleteBookMark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  //Marking recipe as not bookmarked
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

// export const uploadRecipe = async function (newRecipe) {
//   try {
//     const ingredients = Object.entries(newRecipe)
//       .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
//       .map(ing => {
//         // const ingArr = ing[1].replaceAll(' ', '').split(',');
//         const ingArr = ing[1].split(',').map(el => el.trim());
//         if (ingArr.length !== 3) throw new Error('Incorrect ingredient format');
//         const [quantity, unit, description] = ingArr;
//         return { quantity: quantity ? +quantity : null, unit, description };
//       });
//     const recipe = {
//       //ase imitom rom API gadavcet da is amis mixevdit naxavs raxan tivton ase uwreia data
//       title: newRecipe.title,
//       source_url: newRecipe.sourceUrl,
//       image_url: newRecipe.image,
//       publisher: newRecipe.publisher,
//       cooking_time: +newRecipe.cookingTime,
//       servings: +newRecipe.servings,
//       ingredients,
//     };
//     //create AJAX request
//     const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
//     state.recipe = createRecipeObject(data);
//     addBookMark(state.recipe);
//   } catch (err) {
//     throw err;
//   }
// };
