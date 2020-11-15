describe('Submodule', () => {
  beforeEach(() => 
    cy.visit('http://localhost:3000/submodule.html')
  );

  it('should render only one bacon image', () => {
    const imgElement = cy.get('img');

    imgElement.should('have.attr', 'src', 'http://media.washtimes.com.s3.amazonaws.com/media/image/2015/02/23/bacon.jpg');
    imgElement.should('have.length', 1);
  });

  it('should clone bacon image on button click', () => {
    cy.get('img').should('have.length', 1);

    cy.get('button').click();
    
    cy.get('img').should('have.length', 2);
  });
  
})
