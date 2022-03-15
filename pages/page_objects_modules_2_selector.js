const { I } = inject();

module.exports = {
  answerYn(q_step, q_text, q_answer) {
    I.waitInUrl(`/${q_step}`, 20);
    I.waitForText(q_text, 20);
    I.see(q_text);
    I.click(q_answer);
  },
  answerInput(q_step, q_text, q_input) {
    I.waitInUrl(`/${q_step}`, 20);
    I.waitForText(q_text, 20);
    I.see(q_text);
    I.fillField('.mz-input', q_input);
    I.click('Continue');
  },
  answerDate(q_step, q_text, q_date) {
    I.waitInUrl(`/${q_step}`, 20);
    I.waitForText(q_text, 20);
    I.see(q_text);
    I.fillField('input', q_date);
    I.click('.k-select');
    I.waitForText('Today');
    I.click(
      'kendo-calendar-viewlist > kendo-calendar-header > span.k-calendar-nav > span',
    );
    I.click('Continue');
  },
  answer() {
    // switch
  },
  async getQuestionTitle() {
    const text = await I.grabTextFrom('.instant-questionnaire-title');
    console.log(text);
    return text;
  },
};
