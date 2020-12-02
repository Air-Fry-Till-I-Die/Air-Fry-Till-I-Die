import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class AllRecipePage {
  constructor() {
    this.pageId = '#all-recipe-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const allRecipePage = new AllRecipePage();
