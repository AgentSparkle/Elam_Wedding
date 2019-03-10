'use strict';

module.exports = {
  generateRandomData
};

// Make sure to "npm install faker" first.
const Faker = require('faker');
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function generateRandomData(userContext, events, done) {
  // generate data with Faker:
  const name = `${Faker.name.firstName()} ${Faker.name.lastName()}`;
  const email = Faker.internet.exampleEmail();
  const guestCount = getRandomInt(11);
  const favoriteSong = Faker.commerce.color() + " " + Faker.company.bsNoun();
  const comment = Faker.lorem.text();

  // add variables to virtual user's context:
  userContext.vars.name = name;
  userContext.vars.email = email;
  userContext.vars.guestCount = guestCount;
  userContext.vars.favoriteSong = favoriteSong;
  userContext.vars.comment = comment;
  // continue with executing the scenario:
  return done();
}