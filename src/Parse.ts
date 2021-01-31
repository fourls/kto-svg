/// <reference path="Kto.ts"/>

namespace Parse {

const EXAMPLE_SENTENCE = new Kto.Sentence([
  // new Kto.Word([
  //   new Kto.Char("yo",["d","s"],[]),
  // ]),
  // new Kto.Word([
  //   new Kto.Char("a",["h"],[]),
  //   new Kto.Char("ai",["l"],[]),
  // ]),
  // new Kto.Word([
  //   new Kto.Char("i",[],[]),
  // ]),
  // new Kto.Word([
  //   new Kto.Char("a",["t"],[]),
  //   new Kto.Char("i",[],["sc"]),
  // ]),
  // new Kto.Word([
  //   new Kto.Char("i",["m"],["rh"]),
  // ]),
  // new Kto.Word([
  //   new Kto.Char("u",["rc"],["rh"]),
  // ]),
  // new Kto.Word([
  //   new Kto.Char("a",["hl"],[]),
  //   new Kto.Char("i",["r"],["t","s"]),
  // ]),
  new Kto.Word([
    new Kto.Char("ye",["v","s"],[]),
    new Kto.Char("yei",["r"],[]),
  ]),
]);

/**
 * Parse a Kto string into a data format.
 * @param phrase The input phrase.
 */
export function ParseSentence(phrase: string): Kto.Sentence {
  let words = phrase.toLowerCase().split(/\s/).filter(word => word.trim());

  let ktoWords = words.map(word => ParseWord(word));

  return new Kto.Sentence(ktoWords);
}

function ParseWord(word: string): Kto.Word {
  let chars = word.split("'").filter(char => char.trim());

  let ktoChars = chars.map(char => ParseChar(char));

  return new Kto.Word(ktoChars);
}

function ParseChar(char: string): Kto.Char {
  let initials: string[] = [];
  let vowel = "";
  let finals: string[] = [];

  let pastVowel = false;
  let firstConsonantInCluster = true;
  let forceClusterUnvoiced = false;

  for(let i = 0; i < char.length; i++) {
    if(Config.Parse.consonantLetters.includes(char[i])) {
      let fullConsonant = char[i];
      // if this cons and the next cons make a single consonant together, join them up
      if(i+1 != char.length && Config.Parse.ktoConsonants.includes(fullConsonant + char[i+1])) {
        fullConsonant = char[i] + char[i+1];
        
        // the next char is processed already!
        i += 1;
      }
      
      // if this is now a valid consonant...
      if(Config.Parse.ktoConsonants.includes(fullConsonant)) {
        // if unvoiced is being forced and this is a voiced consonant, turn it into the unvoiced version
        if(forceClusterUnvoiced && Object.keys(Config.Parse.voicedToUnvoicedConsonants).includes(fullConsonant))
          fullConsonant = Config.Parse.voicedToUnvoicedConsonants[fullConsonant];

        if(pastVowel) { 
          finals.push(fullConsonant);
        } else {
          // if this is the first initial and it is voiced, force all others to seem unvoiced
          if(firstConsonantInCluster && Config.Parse.voicedConsonants.includes(fullConsonant) && Config.Parse.firstVoicedForcesRestUnvoiced) {
            forceClusterUnvoiced = true;
          }

          firstConsonantInCluster = false;

          initials.push(fullConsonant);
        }
        
        continue;
      }
    } else if(Config.Parse.vowelLetters.includes(char[i])) {
      let fullVowel = char[i];
      
      // collect up to three consecutive vowel letters
      if(i+1 != char.length && Config.Parse.vowelLetters.includes(char[i+1])) {
        fullVowel += char[i+1];

        if(i+2 != char.length && Config.Parse.vowelLetters.includes(char[i+2])) {
          fullVowel += char[i+2];
        }
      }

      if(Config.Parse.ktoVowels.includes(fullVowel)) {
        pastVowel = true;

        // because this is the vowel, the next consonant cluster is a new one!
        firstConsonantInCluster = true;
        forceClusterUnvoiced = false;

        vowel = fullVowel;
      } else {
        continue;
      }
      
      i += fullVowel.length-1;
      continue;
    }
  }

  let ktoChar = new Kto.Char(vowel,initials,finals);

  return ktoChar;
}

}