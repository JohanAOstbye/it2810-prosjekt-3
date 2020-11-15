describe("Searchbar filtering and sorting ", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("It focuses the searchbar", () => {
    cy.focused().should("have.attr", "type", "name");
  });

  it("Search should search", () => {
    cy.focused().type("abra{enter}")

    cy.get(".makeStyles-pokemonContainer-20").first().should("contain", "63")
  })

  it("Search should filter by name", () => {
    cy.get(".makeStyles-sortSelect-12").click()
    cy.get("ul.MuiMenu-list")
  })

  it("Sorting should sort by pokemon attributes", () => {
    const pokemonsids: Array<String> = ["1", "460", "191", "92" , "595"]
    cy.get(".makeStyles-sortSelect-12").click()
    cy.get("ul.MuiMenu-list").children().each((element, index) => {
      if(index != 0) {
        cy.get(".makeStyles-sortSelect-12").click()
      }
      cy.get('[data-value="' + element.attr("data-value") + '"]').click()
      cy.get(".makeStyles-pokemonContainer-20").first().should("contain", pokemonsids[index])
    })
  })

  it("Pokemons should filter by generation", () => {
    const pokemonsids: Array<String> = ["1", "1", "152", "252" , "387"]
    cy.get(".makeStyles-sortSelect-12").click()
    cy.get(".makeStyles-sideBarList-18").children().each((value, index) => {
      if(index >= 5) {
        return false
      }
      cy.wrap(value).click({ force: true})
      cy.get(".makeStyles-pokemonContainer-20").should("contain", pokemonsids[index])
    })
  })
});
export {};
