// operating_with_cypress.cy.js
// cypress/e2e

describe("Operating with Cypress", () => {
  it("Pmtool Login Test", () => {
    cy.visit("https://tredgate.com/pmtool/");
    cy.get('[name="username"]').type("cypress_zima_2024");
    cy.get('[name="password"]').type("Zima2024Cypress");
    cy.get(".btn").click();
    cy.get("#welcome-page-header").should(
      "have.text",
      "Vítej v testovací aplikaci Tredgate Project"
    );
    cy.get(".logo > a > img").should("be.visible");
  });
});
