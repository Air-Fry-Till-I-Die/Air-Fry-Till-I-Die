import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { allRecipePage } from './allrecipe.page';
// import { addRecipePage } from './addrecipe.page';
// import { myRecipePage } from './myrecipe.page';
import { myInventoryPage } from './myinventory.page';
import { listIngredientsPage } from './listingredients.page';
/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that All Recipes page is displayed', async (testController) => {
  await navBar.gotoAllRecipePage(testController);
  await allRecipePage.isDisplayed(testController);
});

test('Test that My Inventory page and List Ingredients Page is displayed', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  // await navBar.gotoAddRecipePage(testController);
  // await addRecipePage.isDisplayed(testController);
  // await navBar.gotoMyRecipePage(testController);
  // await myRecipePage.isDisplayed(testController);
  await navBar.gotoMyInventoryPage(testController);
  await myInventoryPage.isDisplayed(testController);
  await navBar.gotoListIngredientsPage(testController);
  await listIngredientsPage.isDisplayed(testController);
});

// test('Test that Add Recipes Form works', async (testController) => {
//   await navBar.gotoSigninPage(testController);
//   await signinPage.signin(testController, credentials.username, credentials.password);
//   await navBar.isLoggedIn(testController, credentials.username);
//   await navBar.gotoAddRecipePage(testController);
//   await addRecipePage.addRecipe(testController, 'Pizza', '1', 'Delicious Pizza',
//       'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/216054.jpg', 'Dough, Pizza Sauce, Mozzarella', 'Put the pizza in the air fryer', true);
// });
