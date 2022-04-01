export interface IwordList {
  [x: number]: { splitedWord: string, correct: boolean | null, length: number };
  splitedWord: string;
  correct: boolean | null;
}

export interface IcurrentWordID {
  word: number;
  sign: number;
}

export interface IKeyboardEvent {
  key: string;
  keyCode: number;
}

export interface IcountCorrectnessOfCharacters {
  correctType: number;
  falseType: number;
  sumType: number;
}

export enum KeyAllowed {
  //Numbers
  ZERO = 48,
  ONE = 49,
  TWO = 50,
  THREE = 51,
  FOR = 52,
  FIVE = 53,
  SIX = 54,
  SEVEN = 55,
  EIGHT = 56,
  NINE = 57,

  NUMPAD_ZERO = 96,
  NUMPAD_ONE = 97,
  NUMPAD_TWO = 98,
  NUMPAD_THREE = 99,
  NUMPAD_FOR = 100,
  NUMPAD_FIVE = 101,
  NUMPAD_SIX = 102,
  NUMPAD_SEVEN = 103,
  NUMPAD_EIGHT = 104,
  NUMPAD_NINE = 105,

  //Letters
  "a" = 65,
  "b" = 66,
  "c" = 67,
  "d" = 68,
  "e" = 69,
  "f" = 70,
  "g" = 71,
  "h" = 72,
  "i" = 73,
  "j" = 74,
  "k" = 75,
  "l" = 76,
  "m" = 77,
  "n" = 78,
  "o" = 79,
  "p" = 80,
  "q" = 81,
  "r" = 82,
  "s" = 83,
  "t" = 84,
  "u" = 85,
  "v" = 86,
  "w" = 87,
  "x" = 88,
  "y" = 89,
  "z" = 90,

  //Spaces
  " " = 32,
  NO_BREAK_SPACE = "\u00A0",

  //Right side of a keyboard
  COMMA = 188,
  DOT = 190,
  COLON = 186,
  SEMICOLON = 186,
  QUOTE = 222,
  SINGLE_QUOTE = 122,
  QUESTION_MARK = 191,

  //Upper side of a keyboard
  EXCLAMATION_MARK = 49,
  AT = 50,
  HASH = 51,
  PERCENT = 53,
  AMPERSAND = 55,
  PARENTHESIS_LEFT = 57,
  PARENTHESIS_RIGHT = 48,
  DASH = 189,

  CAPS_LOCK = 20,
  DELETE = 46,
  BACKSPACE = 8,
}

export enum classOptions {
  default = "workflow__sign",
  current = `workflow__sign workflow__sign--current`,
  correct = `workflow__sign workflow__sign--correct`,
  wrong = `workflow__sign workflow__sign--wrong`,
}