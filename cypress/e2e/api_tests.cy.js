// api_tests.cy.js
// cypress/e2e
import { faker } from "@faker-js/faker";

describe("API Tests", () => {
  it("Basic Intercept Test", () => {
    const username = faker.internet.username();
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password();

    cy.intercept("/tegb/register").as("post_register");
    cy.visit("https://tegb-frontend-88542200c6db.herokuapp.com/");
    cy.get('[data-testid="register-button"]').click();
    cy.get('[data-testid="username-input"]').type(username);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="submit-button"]').click();
    cy.wait("@post_register").then((httpRequest) => {
      expect(
        httpRequest.response.statusCode,
        "HTTP response have status 201"
      ).to.equal(201);
      expect(
        httpRequest.request.method,
        "HTTP Request have POST method"
      ).to.equal("POST");
    });
  });

  it("Send and Test Register API", () => {
    const email = faker.internet.exampleEmail();
    const password = faker.internet.password();
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const age = faker.number.int({ min: 18, max: 99 });

    cy.request({
      method: "POST",
      url: "https://tegb-backend-877a0b063d29.herokuapp.com/auth/register",
      body: {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        age: age,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.user.email).to.equal(email);
      expect(response.body.user).to.have.property("id");
    });
  });
});
