import { Selector } from 'testcafe';

class MyRecipePage {
  constructor() {
    this.pageId = '#my-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const myRecipePage = new MyRecipePage();
