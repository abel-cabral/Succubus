const AssistantV1 = require('watson-developer-cloud/assistant/v1');

const watsonAssistant = new AssistantV1({
  iam_apikey: 'ahDJGC4IVf-e7ONAt8rKtzohKRUdMOPyZanlRTayuhNp',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16'
});

module.exports = watsonAssistant;
