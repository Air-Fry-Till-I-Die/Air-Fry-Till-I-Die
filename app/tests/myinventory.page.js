import { Selector } from 'testcafe';

class MyInventoryPage {
  constructor() {
    this.pageId = '#my-inventory-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const myInventoryPage = new MyInventoryPage();
