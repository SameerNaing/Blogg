///<reference types="cypress"/>

describe("Tests for posting comments on blog posts", () => {
  before(() => {
    cy.visit("/blogPosts/0");
  });
  it("should open comments drawer when user click on comment icon", () => {
    cy.get("[data-cy='open-comments-drawer-icon']").click();
    cy.get("[data-cy='comments-drawer']").should("be.visible");
  });
});
