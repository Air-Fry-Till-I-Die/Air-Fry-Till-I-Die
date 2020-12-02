import { Selector } from 'testcafe';

class AddRecipePage {
  constructor() {
    this.pageId = '#add-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async addRecipe(testController, name, servings, description, image, ingredient, instructions, publicAccess) {
    await this.isDisplayed(testController);
    await testController.typeText('#form-name', name);
    await testController.typeText('#form-servings', servings);
    await testController.typeText('#form-description', description);
    await testController.typeText('#form-image', image);
    await testController.typeText('#form-ingredient', ingredient);
    await testController.typeText('#form-instructions', instructions);
    if (publicAccess) {
      await testController.click('#form-publicAccess');
    }
    await testController.click('#form-add-recipe');
    const result = Selector('.swal-title').innerText;
    await testController.expect(result).eql('Success');
  }
}

export const addRecipePage = new AddRecipePage();
