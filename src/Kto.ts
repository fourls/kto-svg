namespace Kto {
  /** Represents a sentence comprised of Kto words. */
  export class Sentence {
    words: Word[];
    
    constructor(words: Word[]) {
      this.words = words;
    }
  }

  /** Stores information about a chain of one or multiple Kto characters (i.e. multisyllabic words). */
  export class Word {
    characters: Char[];

    constructor(characters: Char[]) {
      this.characters = characters;
    }
  }


  /** Stores information about a single Kto character. */
  export class Char {
    /** The character's central vowel. */
    vowel: string;
    /** The consonant(s) to the left of the character. */
    initials: string[];
    /** The consonant(s) to the right of the character. */
    finals: string[];
    /** The number of segments in the consonant column with the most segments in it. */
    maxSegments: number;
    
    constructor(vowel: string, startConsonants: string[], endConsonants: string[]) {
      this.vowel = vowel;
      this.initials = startConsonants;
      this.finals = endConsonants;

      this.maxSegments = startConsonants.length > endConsonants.length ? startConsonants.length : endConsonants.length;
    }
  }
}