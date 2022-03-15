const { answerInput, answerYn, answerDate } = require('../../pages/page_objects_modules_2_selector');

const { urls } = inject();
const fs = require('fs');
//
Feature('questionnaire');
Scenario('RunQ', ({ I }) => {

  const str = fs.readFileSync('./participants.csv', 'utf8');
const q_id = str.split('\n')[0];
const q_version = str.split('\n')[1];
  I.amOnPage(`${urls.employerUI()}/questionings/${q_id}/${q_version}/participant`);
  // I.amOnPage("https://dev-employer-testproject.testcompany.online/questionings/281c802c-e072-4c74-a49a-9eb439619fe7/48804e7e-589c-4391-afbb-d773600cb98b");
  answerYn(1, 'Q1', 'Answer1');
  
  //
})
  .tag('@q_1v2');
