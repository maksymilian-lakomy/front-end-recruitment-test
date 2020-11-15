/// <reference types="Cypress" />

describe("Index", () => {
  describe("checkout", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
      cy.contains("checkout", { matchCase: false }).click();
    });

    const formFieldClassName = ".ml-form-field";

    const findErrorByFormFieldId = (id) => {
      return cy
        .get(id)
        .parents(formFieldClassName)
        .find(`${formFieldClassName}__error`);
    };

    it("should display error when first name is not provided", () => {
      const formFieldId = "#first-name";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when last name is not provided", () => {
      const formFieldId = "#last-name";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when e-mail is not provided", () => {
      const formFieldId = "#email";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when e-mail is not valid", () => {
      const formFieldId = "#email";

      cy.get(formFieldId).clear().type("mock@not-valid-emai.l");
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when postal code is not provided", () => {
      const formFieldId = "#postal-code";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when phone number is not provided", () => {
      const formFieldId = "#phone-number";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when phone number is not valid", () => {
      const formFieldId = "#phone-number";

      cy.get(formFieldId).clear().type("123a456789");
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should render master-card logo when credit card number starts with 27", () => {
      const formFieldId = "#credit-card-number";

      cy.get(formFieldId)
        .clear()
        .type("2700-0000-0000-0000")
        .parents(formFieldClassName)
        .find("img")
        .and("have.attr", "src", "./images/mastercard-logo.svg");
    });

    it("should render visa logo when credit card number starts with 45", () => {
      const formFieldId = "#credit-card-number";

      cy.get(formFieldId)
        .clear()
        .type("4500-0000-0000-0000")
        .parents(formFieldClassName)
        .find("img")
        .and("have.attr", "src", "./images/visa-logo.svg");
    });

    it("should not render logo when no card provider found", () => {
      const formFieldId = "#credit-card-number";

      cy.get(formFieldId).clear().parents(formFieldClassName).not().find("img");
    });

    it("should display error when credit card number is not provided", () => {
      const formFieldId = "#credit-card-number";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when credit card number is not valid", () => {
      const formFieldId = "#credit-card-number";

      cy.get(formFieldId).clear().type("0000f0000 0000 0000");
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when security code is not provided", () => {
      const formFieldId = "#security-code";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when security code length is different than 3", () => {
      const formFieldId = "#security-code";

      cy.get(formFieldId).clear().type('12');
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display error when expiration-date is not provided", () => {
      const formFieldId = "#expiration-date";

      cy.get(formFieldId).clear();
      cy.get('[type="submit"]').click();

      findErrorByFormFieldId(formFieldId);
    });

    it("should display success message when all fields are valid", () => {
      const successClassName = '.ml-form-success-message';

      cy.get(successClassName).should('not.exist');

      cy.get('#first-name').clear().type("Elon");
      cy.get('#last-name').clear().type("Musk");
      cy.get('#email').clear().type("elon@spacex.com");
      cy.get('#country').select("United States");
      cy.get('#postal-code').clear().type("10001");
      cy.get('#phone-number').clear().type("123 456 789");
    
      cy.get('#credit-card-number').clear().type("0000-0000-0000-0000");
      cy.get('#security-code').clear().type("123");
      cy.get('#expiration-date').clear().type("2020-12");

      cy.get('[type="submit"]').click();

      cy.get(successClassName);
    });
  });
});
