/** Contains various constants and configuration options. */
namespace Config {
  /** Contains configuration options for parsing Kto text. */
  export namespace Parse {
    /** All letters that can be in Kto consonant segments. */
    export const consonantLetters = ["p","b","t","d","s","z","k","g","f","v","l","m","n","r","h"];
    /** All consonant segments a Kto word can contain. */
    export const ktoConsonants = ["p","b","sc","zc","t","d","s","z","k","g","f","v","l","m","n","r","rc","h","rh"];
    /** All letters that can be in Kto vowel segments. */
    export const vowelLetters = ["a","e","i","o","u","y"];
    /** All vowel segments a Kto word can contain. */
    export const ktoVowels = ["a","e","i","o","u","ai","ao","au","ei","oi","ou","ya","ye","yi","yo","yu","yai","yao","yau","yei","yoi","you"];
    /** All voiced Kto consonant segments. */
    export const voicedConsonants = ["b","zc","d","z","g","v","rc"];
    /** Map of unvoiced to voiced Kto consonant segments. */
    export const voicedToUnvoicedConsonants: {[key: string]: string} = {
        "b": "p",
        "zc": "sc",
        "d": "t",
        "z": "s",
        "g": "k",
        "v": "f",
        "rc": "r"
    };
    /** When the first consonant in a character is voiced, whether all other consonants should be forced unvoiced. */
    export const firstVoicedForcesRestUnvoiced = true;
  }

  /** Contains configuration options for drawing Kto. */
  export namespace Draw {
    /** The stroke width of drawn lines, polylines, arcs, and circles. */
    export const strokeWidth = 2;

    /** Contains configuration options for drawing Kto characters. */
    export namespace Characters {
      /** The unpadded width of a Kto character. */
      export const contentWidth = 35;
      /** The padding around a Kto character. */
      export const padding = 4;
      /** The typical height of the head. */
      export const normalHeadHeight = 8;
      /** The height of the space between the head and the beginning of the segments. */
      export const neckHeight = 6;
      /** For Kto characters that are at the end of a word, the height of the space between the end of the segments and the beginning of the tail. */
      export const normalPreTailHeight = 2;
      /** For Kto characters that are at the end of a word, the height of the space between the end of the segments and the end of the character. */
      export const lastCharTailHeight = 6;

      /** Whether to force segment columns to be the empty segment length at minimum. */
      export const extendSmallCharsToMinSize = true;
    }

    /** Contains configuration options for drawing Kto segments. */
    export namespace Segments {
      /** The space between two segments. */
      export const spaceBetween = 4;
      /** The minimum x distance segments can be from the edge of the character. */
      export const sidePadding = 4;
      
      /** Whether to center a segment vertically if it is the only segment in that column. */
      export const centerSingleSegments = true;
      /** When both columns have a single segment, whether to center the segments such that the tops of both segments align. */
      export const centerByLargestSingleSegment = true;

      /** Contains configuration options for drawing the circle diacritic. */
      export namespace CircleDiacritic {
        /** The apparent radius of the circle (including border). */
        export const apparentRadius = 4;
        /** The fill of the circle. Set to null for no fill. */
        export const fill: string|null = "#fff";
      }

      /** Contains configuration options for drawing the empty segment. */
      export namespace EmptySegment {
        /** Contains configuration options for drawing the circles in the empty segment. */
        export namespace Circles {
          /** The apparent radius of the circles (including border). */
          export const apparentRadius = 3;
          /** The fill of the circle. Set to null for no fill. */
          export const fill: string|null = "#fff";
          /** The vertical space between circles. */
          export const spaceBetween = apparentRadius/2;
        }

        /** The calculated height of the empty segment. */
        export const height = 6*Circles.apparentRadius + 2*Circles.spaceBetween;
      }
    }

    /** Contains configuration options for drawing Kto words. */
    export namespace Words {
      /** The space between two Kto characters in the same word. */
      export const spaceBetweenChars = 4;

      /** Kto characters that allow the previous character to encroach upon its head space.  */
      export const closeFitChars = ["a","e","i","u","ya","yi","yu","ai","ao","au","ei","oi","ou"];
      /** The space between one character and the next character, if the next character is close fit. */
      export const spaceBetweenBeforeCloseFitChars = -4;
    }

    export namespace Sentences {
      export const spaceBetweenWords = 4;
    }

    export const inlineCss = `
      svg {
        stroke: #000;
        stroke-width: ${strokeWidth};
        fill: none;
      }

      g.tail polyline {
        fill: #fff;
      }
    `;
  }
}