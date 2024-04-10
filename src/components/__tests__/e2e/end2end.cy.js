// https://on.cypress.io/api

describe('Checkout E2E', () => {
  it('submits form', () => {
    cy.intercept({ method:'POST', url:'http://127.0.0.1:8080/confirmCheckout'}).as('confirmCheckout');

    cy.visit('/')
    cy.contains('h1', 'You did it!')
    cy.contains('h1', 'Confirm Checkout')

    cy.get('[placeholder="Introduce your email"]').invoke('val').should('equal','');
    cy.get('[placeholder="Enter street"]').invoke('val').should('equal','');
    cy.get('[placeholder="Enter Zip Code"]').invoke('val').should('equal','');


    cy.get('[placeholder="Introduce your email"]').type('testEmail@gmail.com');
    cy.get('[placeholder="Enter street"]').type('street calle 13');
    cy.get('[placeholder="Enter Zip Code"]').type('12345');

    cy.get('[placeholder="Introduce your email"]').invoke('val').should('equal','testEmail@gmail.com');
    cy.get('[placeholder="Enter street"]').invoke('val').should('equal','street calle 13');
    cy.get('[placeholder="Enter Zip Code"]').invoke('val').should('equal','12345');

    cy.get('p').invoke('val').should('equal','');

    cy.get('button').click();

    cy.wait('@confirmCheckout').then((interception) => {
      const desc = interception.response.body['description'];
      expect(desc).to.contain('checkout created for order');
      expect(interception.response.statusCode).to.equal(201);
    });
  })
})
