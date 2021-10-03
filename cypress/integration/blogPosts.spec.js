/// <reference types="cypress" />

import { Status } from "src/common/constants/status";
import { setStatus } from "@/modules/BlogPosts/reducer/blogPosts-slice";

describe("Testing Blog Posts dispaly and pagination", () => {
  before(() => {
    cy.visit("/");
  });
  it("should return initial state when page load", () => {
    cy.window()
      .its("store")
      .invoke("getState")
      .its("blogPosts")
      .should("deep.equal", {
        paginatedBlogPosts: [],
        status: Status.Initial,
        hasMore: true,
      });
  });

  it("should show loading spinner on bottom of the page when fetching paginate data", () => {
    cy.window().its("store").invoke("dispatch", setStatus(Status.Loading));
    cy.scrollTo("bottom")
      .get("[data-cy='paginate-blogs-loading-spinner']")
      .should("be.visible");
  });

  it("should show refetch data button when error occure during pagination", () => {
    cy.window().its("store").invoke("dispatch", setStatus(Status.Error));
    cy.scrollTo("bottom")
      .get("[data-cy='refetch-paginate-blogs-button']")
      .should("be.visible");
  });
});
