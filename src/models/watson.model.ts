export interface WatsonResponseModel {
  output: {
    intents: [];
    entities: [];
    generic: generic[];
  };
}

interface generic {
    response_type: string;
    text: string;
}
