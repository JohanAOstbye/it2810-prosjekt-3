describe("Searing for names", () => {
    it("it focuses the searchbar", () => {
      cy.visit("/");
      cy.focused().should("have.attr", "type", "name");
    });
    before
  });
  export {};
  