function makeUsername() {
  var username = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    username += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return username;
}

describe("Testing User registration", () => {
  const {username, password, wrongPassword, email}: {username: string, password: string, wrongPassword: string, email: string} ={
    username: makeUsername(),
    password: "safePassword",
    wrongPassword: "wrongPassword",
    email: "hei@online.ntnu.no"
  }
  beforeEach(() => {
    cy.log("Entering app-page");
    cy.visit("/");
  });

  it("test wrong registering", () => {
    cy.get("#btnSwitchForm").click()

    cy.get("#username").type(username)
    cy.get("#password").type(password)
    cy.get("#confirmPassword").type(wrongPassword)
    cy.get("#email").type(email)

    cy.get("#btnSendUser").click()

    cy.get(".login").should('not.contain', 'Welcome')
  });

  it("test correct registering", () => {
    cy.get("#btnSwitchForm").click()

    cy.get("#username").type(username)
    cy.get("#password").type(password)
    cy.get("#confirmPassword").type(password)
    cy.get("#email").type(email)

    cy.get("#btnSendUser").click()

    cy.get(".login").should('contain', "Welcome")
  });
});

describe("Testing User login", () => {
  const {username, password, wrongPassword, email}: {username: string, password: string, wrongPassword: string, email: string} ={
    username: makeUsername(),
    password: "safePassword",
    wrongPassword: "wrongPassword",
    email: "hei@online.ntnu.no"
  }

  before(() => {
    cy.visit("/");

    cy.get("#btnSwitchForm").click()

    cy.get("#username").type(username)
    cy.get("#password").type(password)
    cy.get("#confirmPassword").type(password)
    cy.get("#email").type(email)

    cy.get("#btnSendUser").click()
    cy.log("user registered!")
  })

  beforeEach(() => {
    cy.log("Entering app-page");
    cy.visit("/");
  });

  it("test wrong login password", () => {
    cy.get("#username").type(username)
    cy.get("#password").type(wrongPassword)

    cy.get("#btnSendUser").click()

    cy.get(".login").should('not.contain', 'Welcome')
  });

  it("test wrong login username", () => {
    cy.get("#username").type("notAUser")
    cy.get("#password").type(password)

    cy.get("#btnSendUser").click()

    cy.get(".login").should('not.contain', 'Welcome')
  });

  it("test correct login", () => {
    cy.get("#username").type(username)
    cy.get("#password").type(password)

    cy.get("#btnSendUser").click()

    cy.get(".login").should('contain', "Welcome")
  });
});

describe("Testing User spesific options", () => {
  const {username, password, wrongPassword, email}: {username: string, password: string, wrongPassword: string, email: string} ={
    username: makeUsername(),
    password: "safePassword",
    wrongPassword: "wrongPassword",
    email: "hei@online.ntnu.no"
  }

  before(() => {
    cy.visit("/");

    cy.get("#btnSwitchForm").click()

    cy.get("#username").type(username)
    cy.get("#password").type(password)
    cy.get("#confirmPassword").type(password)
    cy.get("#email").type(email)

    cy.get("#btnSendUser").click()
    cy.log("user registered!")
  })

  beforeEach(() => {
    cy.log("Entering app-page");
    cy.visit("/");

    cy.log("loggin in user")
    cy.get("#username").type(username)
    cy.get("#password").type(password)
    cy.get("#btnSendUser").click()
  });

  it("User can select pokedex", () => {
    cy.get(".makeStyles-container-11").should('contain', 'Show your pokedex')
  });

  it("User can add pokemon", () => {
    cy.get(".makeStyles-pokemonContainer-20").first().click()
    cy.get(".addPokemon").click
    cy.type('{esc}')
    // cy.get(".PrivateSwitchBase-input-35").check()
    // cy.get(".makeStyles-pokemonContainer-20").first().should("contain", "1")
  });
});
export {}
