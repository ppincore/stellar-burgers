describe('Тестирование constructorBurger', function () {
  const baseUrl = Cypress.config('baseUrl')!;
  const modal = '[data-cy="modal"]';
  const ingredients = '[data-cy="ingredients"]';
  const bun = '[data-cy="bun"]';
  const overlay = '[data-cy="modal-overlay"]';
  const bunConstructor = '[data-cy="bun-constructor"]';
  const ingredientsConstrucor = '[data-cy="ingredients-constructor"]';

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', (req) => {
      console.log('Запрос перехвачен:', req.url);
      req.reply({ fixture: 'user.json' });
    }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'fetchNewOrder'
    );
    cy.setCookie('token', 'Bearer token');
    window.localStorage.setItem('token', 'Bearer token');
    window.localStorage.setItem('refreshToken', 'refresh-token');
    cy.visit(baseUrl);
  });

  it('open modal', () => {
    cy.contains('li', 'Соус традиционный галактический').click();
    cy.get(modal).contains('Соус традиционный галактический').should('exist');
  });

  it('close modal by button', () => {
    cy.contains('li', 'Соус традиционный галактический').click();
    cy.get(modal).contains('Соус традиционный галактический').should('exist');
  });

  it('close modal by overlay', () => {
    cy.contains('li', 'Соус традиционный галактический').click();
    cy.get(overlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });

  it('add bun to constructor', () => {
    cy.contains('li', 'Флюоресцентная булка R2-D3')
      .contains('Добавить')
      .click();
    cy.get(bun).contains('Флюоресцентная булка R2-D3').should('exist');
  });

  it('add ingredients', () => {
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .contains('Добавить')
      .click();
    cy.get(ingredients)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.contains('li', 'Кристаллы марсианских альфа-сахаридов')
      .contains('Добавить')
      .click();
    cy.get(ingredients)
      .contains('Кристаллы марсианских альфа-сахаридов')
      .should('exist');

    cy.contains('li', 'Соус фирменный Space Sauce')
      .contains('Добавить')
      .click();
    cy.get(ingredients).contains('Соус фирменный Space Sauce').should('exist');
  });

  it('order', () => {
    cy.contains('li', 'Флюоресцентная булка R2-D3')
      .contains('Добавить')
      .click();
    cy.contains('li', 'Филе Люминесцентного тетраодонтимформа')
      .contains('Добавить')
      .click();
    cy.contains('li', 'Кристаллы марсианских альфа-сахаридов')
      .contains('Добавить')
      .click();
    cy.contains('button', 'Оформить заказ').click();
    cy.wait('@fetchNewOrder');
    cy.get(modal).contains('1337').should('exist');
    cy.get(modal).find('button').click();
    cy.get(modal).should('not.exist');
    cy.get(bunConstructor).contains('Выберите булки').should('exist');
    cy.get(ingredientsConstrucor).contains('Выберите начинку').should('exist');
  });
});
