///<reference types="cypress"/>

describe("Tests for search blog posts", () => {
  before(() => {
    cy.visit("/");
  });
  it("should open search modal when click on search icon from navbar", () => {
    cy.get("[data-cy='navbar-search-icon']").click();
    cy.get("[data-cy='search-modal']").should("be.visible");
  });

  it("should display searched blog post title in search result", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get("/api/blogPosts/search", (req, res, ctx) => {
          return res(ctx.json([{ id: "0", title: "About Programming" }]));
        })
      );
    });
    cy.focused().type("A");
    cy.contains("About Programming").should("be.visible");
  });

  it("should change the url when click on search result", () => {
    cy.contains("About Programming")
      .click()
      .url()
      .should("include", "/blogPosts/0");
  });
});
