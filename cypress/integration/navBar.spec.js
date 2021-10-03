///<reference types="cypress"/>

describe("Tests for Navbar components", () => {
  it("should show login container when user is not login", () => {
    cy.logout();
    cy.visit("/");
    cy.get("[data-cy='navbar-login-container']").should("be.visible");
  });

  it("should show user profile pic avatar when login", () => {
    cy.login()
      .visit("/")
      .get("[data-cy='navbar-avatar-pic']")
      .should("be.visible");
  });
});
