"use strict";
// /// <reference path="Config.ts"/>
// /// <reference path="SVGUtility.ts"/>
// /** Stores information about how a particular component is drawn. */
// class CharComponent {
//   height: number;
//   draw: (g: SVGGElement, yOffset: number, isTop?: boolean) => void;
//   /**
//    * @param height The height of this component when drawn.
//    * @param drawMethod The method called when this component is drawn.
//    */
//   constructor(height: number, drawMethod: (g: SVGGElement, yOffset: number, isTop?: boolean) => void) {
//     this.height = height;
//     this.draw = drawMethod;
//   }
// }
// const Components: {
//   head: { [consonant: string]: CharComponent },
//   leftSegments: { [consonant: string]: CharComponent },
//   rightSegments: { [consonant: string]: CharComponent },
//   emptyLeftSegment: CharComponent,
//   emptyRightSegment: CharComponent
// } = {
//   head: {
//     "a": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       g.appendChild(SVGUtility.createPolyline([
//         12, 0,
//         0, lineY,
//         lineWidth, lineY
//       ]));
//     }),
//     "yo": new CharComponent(C.headHeight, (g, yOffset) => {
//       let bottomY = C.headHeight/2;
//       let radius = 8;
//       g.appendChild(SVGUtility.createArc(
//         (C.charContentWidth / 2) - radius, 0,
//         radius, bottomY,
//         0,
//         false, false,
//         radius * 2, 0
//       ));
//       // 'y' circle
//       g.appendChild(SVGUtility.createCircle(C.charContentWidth / 2, 0.5, 2, true));
//     }),
//     "e": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       // big boy line
//       g.appendChild(SVGUtility.createPolyline([
//         0,0,
//         0,lineY,
//         lineWidth,lineY,
//         lineWidth,0
//       ]));
//     }),
//     "ye": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       // big boy line
//       g.appendChild(SVGUtility.createPolyline([
//         0,0,
//         0,lineY,
//         lineWidth,lineY,
//         lineWidth,0
//       ]));
//       // 'y' circle
//       g.appendChild(SVGUtility.createCircle(C.charContentWidth / 2, 0.5, 2, true));
//     }),
//     "yei": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       // big boy line
//       g.appendChild(SVGUtility.createPolyline([
//         0,0,
//         0,lineY,
//         lineWidth,lineY
//       ]));
//       g.appendChild(SVGUtility.createLine(
//         C.charContentWidth, lineY-8,
//         C.charContentWidth, lineY+8
//       ));
//       // 'y' circle
//       g.appendChild(SVGUtility.createCircle(C.charContentWidth / 2, 0.5, 2, true));
//     }),
//     "i": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       g.appendChild(SVGUtility.createLine(
//         0,lineY,
//         lineWidth,lineY
//       ));
//       g.appendChild(SVGUtility.createLine(
//         C.charContentWidth, lineY-8,
//         C.charContentWidth, lineY+8
//       ));
//     }),
//     "ai": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       g.appendChild(SVGUtility.createPolyline([
//         12, lineY-8,
//         0, lineY,
//         lineWidth, lineY
//       ]));
//       g.appendChild(SVGUtility.createLine(
//         C.charContentWidth, lineY-8,
//         C.charContentWidth, lineY+8
//       ));
//     }),
//     "u": new CharComponent(C.headHeight, (g, yOffset) => {
//       let lineWidth = C.charContentWidth;
//       let lineY = C.headHeight/2;
//       g.appendChild(SVGUtility.createPolyline([
//         0, lineY,
//         lineWidth, lineY,
//         lineWidth - 12, 0
//       ]));
//     }),
//   },
//   leftSegments: {
//     "d": new CharComponent(13, (g, yOffset) => {
//       // horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 2 + yOffset,
//         C.segmentWidth, 2 + yOffset
//       ));
//       // vert line
//       g.appendChild(SVGUtility.createLine(
//         C.segmentWidth / 2 + 2, 2 + yOffset,
//         C.segmentWidth / 2 + 2, 10 + yOffset
//       ));
//     }),
//     "f": new CharComponent(13, (g, yOffset) => {
//       let forearmX = 4;
//       let width = C.segmentWidth - forearmX;
//       g.appendChild(SVGUtility.createPolyline([
//         C.segmentWidth, 6,
//         C.segmentWidth - width/2, 6,
//         C.segmentWidth - width/2, 2,
//         forearmX, 2
//       ]));
//     }),
//     "v": new CharComponent(13, (g, yOffset) => {
//       let forearmX = 4;
//       let width = C.segmentWidth - forearmX;
//       g.appendChild(SVGUtility.createPolyline([
//         C.segmentWidth, 6 + yOffset,
//         C.segmentWidth - width/2, 6 + yOffset,
//         C.segmentWidth - width/2, 2 + yOffset,
//         forearmX, 2 + yOffset
//       ]));
//       g.appendChild(SVGUtility.createLine(
//         C.segmentWidth - width/2, 6 + yOffset,
//         C.segmentWidth - width/2, 11 + yOffset
//       ));
//     }),
//     "s": new CharComponent(13, (g, yOffset) => {
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 2 + yOffset,
//         C.segmentWidth, 2 + yOffset
//       ));
//       // vert line
//       g.appendChild(SVGUtility.createLine(
//         C.segmentWidth / 2 + 2, 2 + yOffset,
//         C.segmentWidth / 2 + 2, 10 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 10 + yOffset,
//         C.segmentWidth, 10 + yOffset
//       ));
//     }),
//     "z": new CharComponent(21, (g, yOffset) => {
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 2 + yOffset,
//         C.segmentWidth, 2 + yOffset
//       ));
//       // vert line
//       g.appendChild(SVGUtility.createLine(
//         C.segmentWidth / 2 + 2, 2 + yOffset,
//         C.segmentWidth / 2 + 2, 18 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 10 + yOffset,
//         C.segmentWidth, 10 + yOffset
//       ));
//     }),
//     "h": new CharComponent(24, (g, yOffset) => {
//       g.appendChild(SVGUtility.createCircle(C.segmentWidth/2,12,6));
//       g.appendChild(SVGUtility.createLine(C.segmentWidth/2+6,12,C.segmentWidth,12));
//     }),
//     "l": new CharComponent(20 + C.strokeWidth/2, (g, yOffset, isTop) => {
//       let vertLineX = C.segmentWidth/2 + 2;
//       let vertLineY1 = isTop ? -(C.headHeight/2 + C.neckHeight) : 0;
//       let center = isTop ? (13 - (C.headHeight/2 + C.neckHeight)) : 10;
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         vertLineX, center - 4 + yOffset,
//         C.segmentWidth, center - 4 + yOffset
//       ));
//       // vert line
//       g.appendChild(SVGUtility.createLine(
//         vertLineX, vertLineY1 + yOffset,
//         vertLineX, 20 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         vertLineX, center + 4 + yOffset,
//         C.segmentWidth, center + 4 + yOffset
//       ));
//     }),
//     "t": new CharComponent(20 + C.strokeWidth/2, (g, yOffset) => {
//       // horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 2 + yOffset,
//         C.segmentWidth, 2 + yOffset
//       ));
//     }),
//     "m": new CharComponent(20, (g, yOffset) => {
//       let forearmX = 4;
//       let width = C.segmentWidth - forearmX;
//       let midY = width/2 + yOffset;
//       g.appendChild(SVGUtility.createPath(`
//         M ${C.segmentWidth} ${midY}
//         l ${-width/2} 0
//         a ${width/2} ${width/2} 0 0 1 ${-width/2} ${width/2}
//         l 0 ${-width}
//       `));
//     }),
//     "r": new CharComponent(22, (g, yOffset) => {
//       let segHeight = 22;
//       let leftX = 4;
//       let width = C.segmentWidth - leftX;
//       let thirdHeight = (1/3) * segHeight;
//       let baseY = 2 * thirdHeight;
//       // base line
//       g.appendChild(SVGUtility.createPolyline([
//         C.segmentWidth,baseY + yOffset,
//         leftX,baseY + yOffset,
//         leftX,2 + yOffset
//       ]));
//       // x line
//       g.appendChild(SVGUtility.createLine(
//         4 + width/2,thirdHeight + yOffset,
//         4 + width/2,baseY + yOffset
//       ));
//     }),
//     "rc": new CharComponent(22, (g, yOffset) => {
//       let segHeight = 22;
//       let leftX = 4;
//       let width = C.segmentWidth - leftX;
//       let thirdHeight = (1/3) * segHeight;
//       let baseY = 2 * thirdHeight;
//       // base line
//       g.appendChild(SVGUtility.createPolyline([
//         C.segmentWidth,baseY + yOffset,
//         leftX,baseY + yOffset,
//         leftX,2 + yOffset
//       ]));
//       // x line
//       g.appendChild(SVGUtility.createLine(
//         4 + width/2,thirdHeight + yOffset,
//         4 + width/2,segHeight + yOffset
//       ));
//     }),
//     "hl": new CharComponent(20 + C.strokeWidth/2, (g, yOffset, isTop) => {
//       let vertLineX = C.segmentWidth/2 + 2;
//       let vertLineY1 = isTop ? -(C.headHeight/2 + C.neckHeight) : 0;
//       let center = isTop ? (13 - (C.headHeight/2 + C.neckHeight)) : 10;
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         vertLineX, center - 4 + yOffset,
//         C.segmentWidth, center - 4 + yOffset
//       ));
//       // vert line
//       g.appendChild(SVGUtility.createLine(
//         vertLineX, vertLineY1 + yOffset,
//         vertLineX, 20 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         vertLineX, center + 4 + yOffset,
//         C.segmentWidth, center + 4 + yOffset
//       ));
//       // h circle
//       g.appendChild(SVGUtility.createCircle(vertLineX - 8,center,4));
//     }),
//     "sc": new CharComponent(14, (g, yOffset) => {
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 2 + yOffset,
//         C.segmentWidth, 2 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         4, 10 + yOffset,
//         C.segmentWidth, 10 + yOffset
//       ));
//     }),
//   },
//   rightSegments: {
//     "sc": new CharComponent(12, (g, yOffset) => {
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         0, 2 + yOffset,
//         C.segmentWidth - 4, 2 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         0, 10 + yOffset,
//         C.segmentWidth - 4, 10 + yOffset
//       ));
//     }),
//     "r": new CharComponent(22, (g, yOffset) => {
//       let segHeight = 22;
//       let width = C.segmentWidth - 4;
//       let thirdHeight = (1/3) * segHeight;
//       let baseY = 2 * thirdHeight;
//       // base line
//       g.appendChild(SVGUtility.createPolyline([
//         0,baseY + yOffset,
//         width,baseY + yOffset,
//         width,2 + yOffset
//       ]));
//       // x line
//       g.appendChild(SVGUtility.createLine(
//         width/2,thirdHeight + yOffset,
//         width/2,baseY + yOffset
//       ));
//     }),
//     "rh": new CharComponent(22, (g, yOffset) => {
//       let segHeight = 22;
//       let width = C.segmentWidth - 4;
//       let thirdHeight = (1/3) * segHeight;
//       let baseY = 2 * thirdHeight;
//       // base line
//       g.appendChild(SVGUtility.createPolyline([
//         0,baseY + yOffset,
//         width,baseY + yOffset,
//         width,2 + yOffset
//       ]));
//       // x line
//       g.appendChild(SVGUtility.createLine(
//         width/2,thirdHeight + yOffset,
//         width/2,baseY + yOffset
//       ));
//       // h circle
//       g.appendChild(SVGUtility.createCircle(width/2,baseY + 8,4));
//     }),
//     "t": new CharComponent(6 + C.strokeWidth/2, (g, yOffset) => {
//       // horiz line
//       g.appendChild(SVGUtility.createLine(
//         0, 2 + yOffset,
//         C.segmentWidth - 4, 2 + yOffset
//       ));
//     }),
//     "s": new CharComponent(13, (g, yOffset) => {
//       // top horiz line
//       g.appendChild(SVGUtility.createLine(
//         0, 2 + yOffset,
//         C.segmentWidth - 4, 2 + yOffset
//       ));
//       // vert line
//       g.appendChild(SVGUtility.createLine(
//         C.segmentWidth / 2 - 2, 2 + yOffset,
//         C.segmentWidth / 2 - 2, 10 + yOffset
//       ));
//       // bottom horiz line
//       g.appendChild(SVGUtility.createLine(
//         0, 10 + yOffset,
//         C.segmentWidth - 4, 10 + yOffset
//       ));
//     }),
//   },
//   emptyLeftSegment: new CharComponent(40, (g, yOffset) => {
//     g.appendChild(SVGUtility.createCircle(C.segmentWidth - 10, 4 + yOffset, 1.5, true));
//     g.appendChild(SVGUtility.createCircle(C.segmentWidth - 10, 14 + yOffset, 1.5, true));
//     g.appendChild(SVGUtility.createCircle(C.segmentWidth - 10, 24 + yOffset, 1.5, true));
//   }),
//   emptyRightSegment: new CharComponent(40, (g, yOffset) => {
//     g.appendChild(SVGUtility.createCircle(10, 4 + yOffset, 1.5, true));
//     g.appendChild(SVGUtility.createCircle(10, 14 + yOffset, 1.5, true));
//     g.appendChild(SVGUtility.createCircle(10, 24 + yOffset, 1.5, true));
//   })
// };
// 
/** Contains various constants and configuration options. */
var Config;
(function (Config) {
    /** Contains configuration options for parsing Kto text. */
    let Parse;
    (function (Parse) {
        /** All letters that can be in Kto consonant segments. */
        Parse.consonantLetters = ["p", "b", "t", "d", "s", "z", "k", "g", "f", "v", "l", "m", "n", "r", "h"];
        /** All consonant segments a Kto word can contain. */
        Parse.ktoConsonants = ["p", "b", "sc", "zc", "t", "d", "s", "z", "k", "g", "f", "v", "l", "m", "n", "r", "rc", "h", "rh"];
        /** All letters that can be in Kto vowel segments. */
        Parse.vowelLetters = ["a", "e", "i", "o", "u", "y"];
        /** All vowel segments a Kto word can contain. */
        Parse.ktoVowels = ["a", "e", "i", "o", "u", "ai", "ao", "au", "ei", "oi", "ou", "ya", "ye", "yi", "yo", "yu", "yai", "yao", "yau", "yei", "yoi", "you"];
        /** All voiced Kto consonant segments. */
        Parse.voicedConsonants = ["b", "zc", "d", "z", "g", "v", "rc"];
        /** Map of unvoiced to voiced Kto consonant segments. */
        Parse.voicedToUnvoicedConsonants = {
            "b": "p",
            "zc": "sc",
            "d": "t",
            "z": "s",
            "g": "k",
            "v": "f",
            "rc": "r"
        };
        /** When the first consonant in a character is voiced, whether all other consonants should be forced unvoiced. */
        Parse.firstVoicedForcesRestUnvoiced = true;
    })(Parse = Config.Parse || (Config.Parse = {}));
    /** Contains configuration options for drawing Kto. */
    let Draw;
    (function (Draw) {
        /** The stroke width of drawn lines, polylines, arcs, and circles. */
        Draw.strokeWidth = 2;
        /** Contains configuration options for drawing Kto characters. */
        let Characters;
        (function (Characters) {
            /** The unpadded width of a Kto character. */
            Characters.contentWidth = 35;
            /** The padding around a Kto character. */
            Characters.padding = 4;
            /** The typical height of the head. */
            Characters.normalHeadHeight = 8;
            /** The height of the space between the head and the beginning of the segments. */
            Characters.neckHeight = 6;
            /** For Kto characters that are at the end of a word, the height of the space between the end of the segments and the beginning of the tail. */
            Characters.normalPreTailHeight = 2;
            /** For Kto characters that are at the end of a word, the height of the space between the end of the segments and the end of the character. */
            Characters.lastCharTailHeight = 6;
            /** Whether to force segment columns to be the empty segment length at minimum. */
            Characters.extendSmallCharsToMinSize = true;
        })(Characters = Draw.Characters || (Draw.Characters = {}));
        /** Contains configuration options for drawing Kto segments. */
        let Segments;
        (function (Segments) {
            /** The space between two segments. */
            Segments.spaceBetween = 4;
            /** The minimum x distance segments can be from the edge of the character. */
            Segments.sidePadding = 4;
            /** Whether to center a segment vertically if it is the only segment in that column. */
            Segments.centerSingleSegments = true;
            /** When both columns have a single segment, whether to center the segments such that the tops of both segments align. */
            Segments.centerByLargestSingleSegment = true;
            /** Contains configuration options for drawing the circle diacritic. */
            let CircleDiacritic;
            (function (CircleDiacritic) {
                /** The apparent radius of the circle (including border). */
                CircleDiacritic.apparentRadius = 4;
                /** The fill of the circle. Set to null for no fill. */
                CircleDiacritic.fill = "#fff";
            })(CircleDiacritic = Segments.CircleDiacritic || (Segments.CircleDiacritic = {}));
            /** Contains configuration options for drawing the empty segment. */
            let EmptySegment;
            (function (EmptySegment) {
                /** Contains configuration options for drawing the circles in the empty segment. */
                let Circles;
                (function (Circles) {
                    /** The apparent radius of the circles (including border). */
                    Circles.apparentRadius = 3;
                    /** The fill of the circle. Set to null for no fill. */
                    Circles.fill = "#fff";
                    /** The vertical space between circles. */
                    Circles.spaceBetween = Circles.apparentRadius / 2;
                })(Circles = EmptySegment.Circles || (EmptySegment.Circles = {}));
                /** The calculated height of the empty segment. */
                EmptySegment.height = 6 * Circles.apparentRadius + 2 * Circles.spaceBetween;
            })(EmptySegment = Segments.EmptySegment || (Segments.EmptySegment = {}));
        })(Segments = Draw.Segments || (Draw.Segments = {}));
        /** Contains configuration options for drawing Kto words. */
        let Words;
        (function (Words) {
            /** The space between two Kto characters in the same word. */
            Words.spaceBetweenChars = 4;
            /** Kto characters that allow the previous character to encroach upon its head space.  */
            Words.closeFitChars = ["a", "e", "i", "u", "ya", "yi", "yu", "ai", "ao", "au", "ei", "oi", "ou"];
            /** The space between one character and the next character, if the next character is close fit. */
            Words.spaceBetweenBeforeCloseFitChars = -4;
        })(Words = Draw.Words || (Draw.Words = {}));
        let Sentences;
        (function (Sentences) {
            Sentences.spaceBetweenWords = 4;
        })(Sentences = Draw.Sentences || (Draw.Sentences = {}));
        Draw.inlineCss = `
      svg {
        stroke: #000;
        stroke-width: ${Draw.strokeWidth};
        fill: none;
      }

      g.tail polyline {
        fill: #fff;
      }
    `;
    })(Draw = Config.Draw || (Config.Draw = {}));
})(Config || (Config = {}));
var Kto;
(function (Kto) {
    /** Represents a sentence comprised of Kto words. */
    class Sentence {
        constructor(words) {
            this.words = words;
        }
    }
    Kto.Sentence = Sentence;
    /** Stores information about a chain of one or multiple Kto characters (i.e. multisyllabic words). */
    class Word {
        constructor(characters) {
            this.characters = characters;
        }
    }
    Kto.Word = Word;
    /** Stores information about a single Kto character. */
    class Char {
        constructor(vowel, startConsonants, endConsonants) {
            this.vowel = vowel;
            this.initials = startConsonants;
            this.finals = endConsonants;
            this.maxSegments = startConsonants.length > endConsonants.length ? startConsonants.length : endConsonants.length;
        }
    }
    Kto.Char = Char;
})(Kto || (Kto = {}));
/// <reference path="Kto.ts"/>
var Parse;
(function (Parse) {
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
            new Kto.Char("ye", ["v", "s"], []),
            new Kto.Char("yei", ["r"], []),
        ]),
    ]);
    /**
     * Parse a Kto string into a data format.
     * @param phrase The input phrase.
     */
    function ParseSentence(phrase) {
        let words = phrase.toLowerCase().split(/\s/).filter(word => word.trim());
        let ktoWords = words.map(word => ParseWord(word));
        return new Kto.Sentence(ktoWords);
    }
    Parse.ParseSentence = ParseSentence;
    function ParseWord(word) {
        let chars = word.split("'").filter(char => char.trim());
        let ktoChars = chars.map(char => ParseChar(char));
        return new Kto.Word(ktoChars);
    }
    function ParseChar(char) {
        let initials = [];
        let vowel = "";
        let finals = [];
        let pastVowel = false;
        let firstConsonantInCluster = true;
        let forceClusterUnvoiced = false;
        for (let i = 0; i < char.length; i++) {
            if (Config.Parse.consonantLetters.includes(char[i])) {
                let fullConsonant = char[i];
                // if this cons and the next cons make a single consonant together, join them up
                if (i + 1 != char.length && Config.Parse.ktoConsonants.includes(fullConsonant + char[i + 1])) {
                    fullConsonant = char[i] + char[i + 1];
                    // the next char is processed already!
                    i += 1;
                }
                // if this is now a valid consonant...
                if (Config.Parse.ktoConsonants.includes(fullConsonant)) {
                    // if unvoiced is being forced and this is a voiced consonant, turn it into the unvoiced version
                    if (forceClusterUnvoiced && Object.keys(Config.Parse.voicedToUnvoicedConsonants).includes(fullConsonant))
                        fullConsonant = Config.Parse.voicedToUnvoicedConsonants[fullConsonant];
                    if (pastVowel) {
                        finals.push(fullConsonant);
                    }
                    else {
                        // if this is the first initial and it is voiced, force all others to seem unvoiced
                        if (firstConsonantInCluster && Config.Parse.voicedConsonants.includes(fullConsonant) && Config.Parse.firstVoicedForcesRestUnvoiced) {
                            forceClusterUnvoiced = true;
                        }
                        firstConsonantInCluster = false;
                        initials.push(fullConsonant);
                    }
                    continue;
                }
            }
            else if (Config.Parse.vowelLetters.includes(char[i])) {
                let fullVowel = char[i];
                // collect up to three consecutive vowel letters
                if (i + 1 != char.length && Config.Parse.vowelLetters.includes(char[i + 1])) {
                    fullVowel += char[i + 1];
                    if (i + 2 != char.length && Config.Parse.vowelLetters.includes(char[i + 2])) {
                        fullVowel += char[i + 2];
                    }
                }
                if (Config.Parse.ktoVowels.includes(fullVowel)) {
                    pastVowel = true;
                    // because this is the vowel, the next consonant cluster is a new one!
                    firstConsonantInCluster = true;
                    forceClusterUnvoiced = false;
                    vowel = fullVowel;
                }
                else {
                    continue;
                }
                i += fullVowel.length - 1;
                continue;
            }
        }
        let ktoChar = new Kto.Char(vowel, initials, finals);
        return ktoChar;
    }
})(Parse || (Parse = {}));
var Utility;
(function (Utility) {
    let Svg;
    (function (Svg) {
        Svg.svgNS = "http://www.w3.org/2000/svg";
        /**
         * Create an SVG symbol element.
         */
        function symbol() {
            return document.createElementNS(Svg.svgNS, "symbol");
        }
        Svg.symbol = symbol;
        /**
         * Create an SVG group element.
         */
        function g(id = null, classList) {
            let g = document.createElementNS(Svg.svgNS, "g");
            if (id != null)
                g.id = id;
            if (classList != undefined) {
                g.classList.add(...classList);
            }
            return g;
        }
        Svg.g = g;
        /**
         * Create an SVG group element.
         */
        function svg(id = null, classList) {
            let svg = document.createElementNS(Svg.svgNS, "svg");
            if (id != null)
                svg.id = id;
            if (classList != undefined) {
                svg.classList.add(...classList);
            }
            return svg;
        }
        Svg.svg = svg;
        /**
         * Create an SVG use element.
         * @param href The href of the symbol the use is displaying.
         */
        function use(href, x, y, width, height) {
            let use = document.createElementNS(Svg.svgNS, "use");
            use.setAttribute("href", href);
            use.setAttribute("x", x.toString());
            use.setAttribute("y", y.toString());
            use.setAttribute("width", width.toString());
            use.setAttribute("height", height.toString());
            return use;
        }
        Svg.use = use;
        /**
         * Create an SVG line element.
         */
        function line(x1, y1, x2, y2) {
            let line = document.createElementNS(Svg.svgNS, "line");
            line.setAttribute("x1", x1.toString());
            line.setAttribute("y1", y1.toString());
            line.setAttribute("x2", x2.toString());
            line.setAttribute("y2", y2.toString());
            return line;
        }
        Svg.line = line;
        /**
         * Create an SVG circle element.
         * @param cx The x coordinate of the circle center.
         * @param cy The y coordinate of the circle center.
         * @param r The radius of the circle.
         */
        function circle(cx, cy, r, fill = null) {
            let circle = document.createElementNS(Svg.svgNS, "circle");
            circle.setAttribute("cx", cx.toString());
            circle.setAttribute("cy", cy.toString());
            circle.setAttribute("r", r.toString());
            if (fill != null) {
                circle.setAttribute("fill", fill);
            }
            return circle;
        }
        Svg.circle = circle;
        /**
         * Create an SVG polyline element.
         * @param points The points in the polyline as a list of individual coordinates.
         */
        function polyline(points) {
            let polyline = document.createElementNS(Svg.svgNS, "polyline");
            let pointsStr = "";
            for (let i = 0; i < points.length; i++) {
                pointsStr += " " + points[i] + " ";
            }
            polyline.setAttribute("points", pointsStr);
            return polyline;
        }
        Svg.polyline = polyline;
        /**
         * Create an SVG arc using a path element.
         * @param cx The x coordinate of the beginning of the arc.
         * @param cy The y coordinate of the beginning of the arc.
         * @param rx The x radius of the arc ellipse.
         * @param ry The y radius of the arc ellipse.
         * @param rot The rotation of the arc ellipse.
         * @param largeArc Whether the traced line is the major or minor arc.
         * @param sweep Whether the arc is traced clockwise or counter-clockwise.
         * @param endx The x coordinate of the end of the arc, relative to the beginning.
         * @param endy The y coordinate of the end of the arc, relative to the beginning.
         */
        function arc(cx, cy, rx, ry, rot, largeArc, sweep, endx, endy) {
            let arc = document.createElementNS(Svg.svgNS, "path");
            arc.setAttribute("d", `
        M ${cx},${cy}
        a ${rx},${ry} ${rot} ${(largeArc ? 1 : 0)},${(sweep ? 1 : 0)} ${endx},${endy}
      `);
            return arc;
        }
        Svg.arc = arc;
        function path(d) {
            let path = document.createElementNS(Svg.svgNS, "path");
            path.setAttribute("d", d);
            return path;
        }
        Svg.path = path;
        function rect(x, y, width, height) {
            let rect = document.createElementNS(Svg.svgNS, "rect");
            rect.setAttribute("x", x.toString());
            rect.setAttribute("y", y.toString());
            rect.setAttribute("width", width.toString());
            rect.setAttribute("height", height.toString());
            return rect;
        }
        Svg.rect = rect;
    })(Svg = Utility.Svg || (Utility.Svg = {}));
})(Utility || (Utility = {}));
/// <reference path="SvgUtility.ts"/>
var Utility;
(function (Utility) {
    /**
     * Remove all children of a node.
     * @param node The parent node.
     */
    function removeAllChildren(node) {
        while (node.firstChild) {
            if (node.lastChild != null)
                node.removeChild(node.lastChild);
        }
    }
    Utility.removeAllChildren = removeAllChildren;
})(Utility || (Utility = {}));
/// <reference path="Utility.ts"/>
var Render;
(function (Render) {
    var Svg = Utility.Svg;
    /** Contains methods to draw specific heads and segments of Kto characters. */
    class RenderMethods {
        /** Determine if the given string corresponds to a head. */
        static hasHead(key) {
            return Object.keys(this.heads).includes(key);
        }
        /** Determine if the given string corresponds to a segment. */
        static hasSegment(key) {
            return Object.keys(this.segments).includes(key);
        }
    }
    /** Method that draws the empty segment, given dimensions and a parent element. */
    RenderMethods.emptySegment = (dims, g) => {
        let apparentCircleRadius = Config.Draw.Segments.EmptySegment.Circles.apparentRadius;
        let trueCircleRadius = apparentCircleRadius - Config.Draw.strokeWidth / 2;
        let x = dims.x + apparentCircleRadius * 2;
        let startY = dims.y + apparentCircleRadius;
        let yPaddingBetweenCircles = Config.Draw.Segments.EmptySegment.Circles.spaceBetween;
        let yIncrement = apparentCircleRadius * 2 + yPaddingBetweenCircles;
        g.appendChild(Svg.circle(x, startY, trueCircleRadius, Config.Draw.Segments.EmptySegment.Circles.fill));
        g.appendChild(Svg.circle(x, startY + yIncrement, trueCircleRadius, Config.Draw.Segments.EmptySegment.Circles.fill));
        g.appendChild(Svg.circle(x, startY + 2 * yIncrement, trueCircleRadius, Config.Draw.Segments.EmptySegment.Circles.fill));
        return Object.assign(Object.assign({}, dims), { height: Config.Draw.Segments.EmptySegment.height });
    };
    /*
     *   _   _                _
     *  | | | | ___  __ _  __| |
     *  | |_| |/ _ \/ _` |/ _` |
     *  |  _  |  __/ (_| | (_| |
     *  |_| |_|\___|\__,_|\__,_|
    */
    /** Methods that draw character heads, given dimensions and a parent element. */
    RenderMethods.heads = {
        /*
         * /
         * -----------     A
        */
        "a": (dims, g) => {
            let lineY = dims.y + dims.height;
            // left arrow polyline
            g.appendChild(Svg.polyline([
                dims.x + dims.width / 4, dims.y,
                dims.x, lineY,
                dims.width, lineY
            ]));
            return Object.assign({}, dims);
        },
        /*
         * |         |
         * -----------     E
        */
        "e": (dims, g) => {
            let lineY = dims.y + dims.height;
            // prong polyline
            g.appendChild(Svg.polyline([
                dims.x, dims.y,
                dims.x, lineY,
                dims.x + dims.width, lineY,
                dims.x + dims.width, dims.y
            ]));
            return Object.assign({}, dims);
        },
        /*
         * |
         * +---------      I
         * |
        */
        "i": (dims, g) => {
            let lineY = dims.y + dims.height;
            // normal top line
            g.appendChild(Svg.line(dims.x, lineY, dims.x + dims.width, lineY));
            // left side line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x, dims.y + 2 * dims.height));
            return Object.assign({}, dims);
        },
        /*
         *    \_/          O
        */
        "o": (dims, g) => {
            let radius = 7;
            g.appendChild(Svg.arc(dims.x + (dims.width / 2) - radius, dims.y, radius, dims.height, 0, false, false, radius * 2, 0));
            return Object.assign({}, dims);
        },
        /*
         *           \
         * -----------     U
        */
        "u": (dims, g) => {
            let lineY = dims.y + dims.height;
            // right arrow polyline
            g.appendChild(Svg.polyline([
                dims.x, lineY,
                dims.width, lineY,
                dims.x + dims.width * (3 / 4), dims.y,
            ]));
            return Object.assign({}, dims);
        },
        /*
         * /
         * ----------o     YA
        */
        "ya": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["a"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width - apparentRadius + 1, dims.y + dims.height, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        /*
         * |    o    |
         * -----------     YE
        */
        "ye": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["e"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        /*
         * |
         * +--------o      YI
         * |
        */
        "yi": (dims, g) => {
            let apparentRadius = 4;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["i"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width - apparentRadius + 1, dims.y + dims.height, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        /*
         *     o
         *    \_/          YO
        */
        "yo": (dims, g) => {
            let apparentCircleRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueCircleRadius = apparentCircleRadius - Config.Draw.strokeWidth / 2;
            let circleYOffset = apparentCircleRadius;
            let offsetFromO = circleYOffset * 0.75;
            let oG = Svg.g(null, ["o"]);
            oG.setAttribute("transform", `translate(0,${offsetFromO})`);
            g.appendChild(oG);
            RenderMethods.heads["o"](dims, oG);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + circleYOffset, trueCircleRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign(Object.assign({}, dims), { height: dims.height + offsetFromO });
        },
        /*
         *          \
         * o----------     YU
        */
        "yu": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["u"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + apparentRadius - 1, dims.y + dims.height, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        /*
         * /
         * ----------|     AI
        */
        "ai": (dims, g) => {
            let lineY = dims.y + dims.height;
            let aDims = RenderMethods.heads["a"](dims, g);
            // right side line
            g.appendChild(Svg.line(dims.x + dims.width, dims.y, dims.x + dims.width, dims.y + 2 * dims.height));
            return aDims;
        },
        /*
         * /      |
         * ------/     ao
        */
        "ao": (dims, g) => {
            g.appendChild(Svg.path(`
          M ${dims.x + dims.width / 4} ${dims.y}
          l ${-dims.width / 4} ${dims.height}
          l ${dims.width / 2} 0
          a ${dims.height} ${dims.height} 0 0 0 ${dims.height} ${-dims.height}
        `));
            return dims;
        },
        /*
         * /      \
         * +------+    au
        */
        "au": (dims, g) => {
            let lineY = dims.y + dims.height;
            // left arrow polyline
            g.appendChild(Svg.polyline([
                dims.x + dims.width / 4, dims.y,
                dims.x, lineY,
                dims.width, lineY,
                dims.x + dims.width * (3 / 4), dims.y,
            ]));
            return dims;
        },
        /*
         * |      |
         * +------+    au
         *        |
        */
        "ei": (dims, g) => {
            let lineY = dims.y + dims.height;
            // prong polyline
            g.appendChild(Svg.polyline([
                dims.x, dims.y,
                dims.x, lineY,
                dims.x + dims.width, lineY
            ]));
            g.appendChild(Svg.line(dims.x + dims.width, dims.y, dims.x + dims.width, dims.y + 2 * dims.height));
            return Object.assign({}, dims);
        },
        /*
         * |      |
         *  \-----+    oi
         *        |
        */
        "oi": (dims, g) => {
            // o arc
            g.appendChild(Svg.path(`
          M ${dims.x + dims.width} ${dims.height}
          l ${-dims.width / 2} 0
          a ${dims.height} ${dims.height} 0 0 1 ${-dims.height} ${-dims.height}
        `));
            // i line
            g.appendChild(Svg.line(dims.x + dims.width, dims.y, dims.x + dims.width, dims.y + 2 * dims.height));
            return dims;
        },
        /*
         * |      \
         *  \-----+    ou
        */
        "ou": (dims, g) => {
            g.appendChild(Svg.path(`
          M ${dims.x + dims.width * (3 / 4)} ${dims.y}
          l ${dims.width / 4} ${dims.height}
          l ${-dims.width / 2} 0
          a ${dims.height} ${dims.height} 0 0 1 ${-dims.height} ${-dims.height}
        `));
            return dims;
        },
        "yai": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["ai"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        "yao": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["ao"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        "yau": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["au"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        "yei": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["ei"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        "yoi": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["oi"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
        "you": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            RenderMethods.heads["ou"](dims, g);
            // 'y' circle
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + dims.height - apparentRadius * 1.5, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign({}, dims);
        },
    };
    /*
     *   ____                                  _
     *  / ___|  ___  __ _ _ __ ___   ___ _ __ | |_ ___
     *  \___ \ / _ \/ _` | '_ ` _ \ / _ \ '_ \| __/ __|
     *   ___) |  __/ (_| | | | | | |  __/ | | | |_\__ \
     *  |____/ \___|\__, |_| |_| |_|\___|_| |_|\__|___/
     *              |___/
    */
    /** Methods that draw character segments, given dimensions and a parent element. */
    RenderMethods.segments = {
        /*
         *-------
         *
         *------+    P
         *------+
        */
        "p": (dims, g) => {
            let segHeight = 8;
            // line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // rect
            g.appendChild(Svg.rect(dims.x, dims.y + segHeight / 2, dims.width - Config.Draw.strokeWidth / 2, segHeight / 2));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *-------
         *
         *------+    B
         *---+--+
         *   |
        */
        "b": (dims, g) => {
            let pHeight = 8;
            let segHeight = pHeight + 4;
            // line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // rect
            g.appendChild(Svg.rect(dims.x, dims.y + pHeight / 2, dims.width - Config.Draw.strokeWidth / 2, pHeight / 2));
            // small line
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y + pHeight, dims.x + dims.width / 2, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *-------
         *-------   SC
        */
        "sc": (dims, g) => {
            let segHeight = 4;
            // top line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // bottom line
            g.appendChild(Svg.line(dims.x, dims.y + segHeight, dims.x + dims.width, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *-------
         *---+---   ZC
         *   |
        */
        "zc": (dims, g) => {
            let scHeight = 4;
            let segHeight = scHeight + 4;
            // top line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // bottom line
            g.appendChild(Svg.line(dims.x, dims.y + scHeight, dims.x + dims.width, dims.y + scHeight));
            // vert line
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y + scHeight, dims.x + dims.width / 2, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *-------    T
        */
        "t": (dims, g) => {
            // line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            return Object.assign(Object.assign({}, dims), { height: 0 });
        },
        /*
         *---+---    D
         *   |
        */
        "d": (dims, g) => {
            let segHeight = 4;
            // horiz line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y, dims.x + dims.width / 2, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *---+---
         *   |       S
         *---+---
        */
        "s": (dims, g) => {
            let scHeight = 12;
            let halfHeight = (1 / 2) * scHeight;
            let baseY = dims.y + halfHeight;
            // top horiz line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // vert line
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y, dims.x + dims.width / 2, baseY));
            // bottom horiz line
            g.appendChild(Svg.line(dims.x, baseY, dims.x + dims.width, baseY));
            return Object.assign(Object.assign({}, dims), { height: halfHeight });
        },
        /*
         *---+---
         *   |
         *---+---    Z
         *   |
        */
        "z": (dims, g) => {
            let scHeight = 12;
            let halfHeight = (1 / 2) * scHeight;
            let baseY = dims.y + halfHeight;
            // top horiz line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // vert line
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y, dims.x + dims.width / 2, dims.y + scHeight));
            // bottom horiz line
            g.appendChild(Svg.line(dims.x, baseY, dims.x + dims.width, baseY));
            return Object.assign(Object.assign({}, dims), { height: scHeight });
        },
        /*
         *-------    K
         *----
        */
        "k": (dims, g) => {
            let segHeight = 4;
            // top line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // bottom line
            g.appendChild(Svg.line(dims.x, dims.y + segHeight, dims.x + dims.width / 2, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *-------    K
         *----
        */
        "g": (dims, g) => {
            let kHeight = 4;
            let segHeight = kHeight * 2;
            // top line
            g.appendChild(Svg.line(dims.x, dims.y, dims.x + dims.width, dims.y));
            // bottom line
            g.appendChild(Svg.polyline([
                dims.x, dims.y + kHeight,
                dims.x + dims.width / 2, dims.y + kHeight,
                dims.x + dims.width / 2, dims.y + segHeight
            ]));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *   +---    F
         *---+
        */
        "f": (dims, g) => {
            let segHeight = 4;
            // big polyline
            g.appendChild(Svg.polyline([
                dims.x, dims.y + segHeight,
                dims.x + dims.width / 2, dims.y + segHeight,
                dims.x + dims.width / 2, dims.y,
                dims.x + dims.width, dims.y
            ]));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *   +---    V
         *---+
         *   |
        */
        "v": (dims, g) => {
            let fHeight = 4;
            let segHeight = fHeight + 4;
            // big polyline
            g.appendChild(Svg.polyline([
                dims.x, dims.y + fHeight,
                dims.x + dims.width / 2, dims.y + fHeight,
                dims.x + dims.width / 2, dims.y,
                dims.x + dims.width, dims.y
            ]));
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y + fHeight, dims.x + dims.width / 2, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *      |
         *------+    L
         *------+
         *      |
        */
        "l": (dims, g) => {
            let thirdHeight = 4;
            let segHeight = thirdHeight * 3;
            let width = dims.width * (5 / 8);
            // top line
            g.appendChild(Svg.line(dims.x, dims.y + thirdHeight, dims.x + width, dims.y + thirdHeight));
            // horiz line
            g.appendChild(Svg.line(dims.x + width, dims.y, dims.x + width, dims.y + segHeight));
            // bottom line
            g.appendChild(Svg.line(dims.x, dims.y + thirdHeight * 2, dims.x + width, dims.y + thirdHeight * 2));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*      |
         *---+  |     M
         *    \-+
        */
        "m": (dims, g) => {
            // fucked path
            g.appendChild(Svg.path(`        
          M ${dims.x} ${dims.y}
          l ${dims.width / 2} 0
          a ${dims.width / 2} ${dims.width / 2} 0 0 0 ${dims.width / 2} ${dims.width / 2}
          l 0 ${-dims.width / 2 - Config.Draw.strokeWidth / 2}
        `));
            return Object.assign(Object.assign({}, dims), { height: dims.width / 2 });
        },
        /*
         *---+
         *   +---    N
        */
        "n": (dims, g) => {
            let segHeight = 4;
            g.appendChild(Svg.polyline([
                dims.x, dims.y,
                dims.x + dims.width / 2, dims.y,
                dims.x + dims.width / 2, dims.y + segHeight,
                dims.x + dims.width, dims.y + segHeight
            ]));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *   |
         *   |  |    R
         *---+--+
        */
        "r": (dims, g) => {
            let segHeight = 12;
            let thirdHeight = (1 / 3) * segHeight;
            let baseY = dims.y + 2 * thirdHeight;
            // base line
            g.appendChild(Svg.polyline([
                dims.x, baseY,
                dims.x + dims.width - Config.Draw.strokeWidth / 2, baseY,
                dims.x + dims.width - Config.Draw.strokeWidth / 2, dims.y + thirdHeight
            ]));
            // little line
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y, dims.x + dims.width / 2, baseY));
            return Object.assign(Object.assign({}, dims), { height: segHeight - thirdHeight });
        },
        /*
          *   |
          *   |  |
          *---+--+    RC
          *   |
        */
        "rc": (dims, g) => {
            let segHeight = 12;
            let thirdHeight = (1 / 3) * segHeight;
            let baseY = 2 * thirdHeight + dims.y;
            // base line
            g.appendChild(Svg.polyline([
                dims.x, baseY,
                dims.x + dims.width - Config.Draw.strokeWidth / 2, baseY,
                dims.x + dims.width - Config.Draw.strokeWidth / 2, dims.y + thirdHeight
            ]));
            // little line
            g.appendChild(Svg.line(dims.x + dims.width / 2, dims.y, dims.x + dims.width / 2, dims.y + segHeight));
            return Object.assign(Object.assign({}, dims), { height: segHeight });
        },
        /*
         *---O         H
        */
        "h": (dims, g) => {
            let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
            let trueRadius = apparentRadius - Config.Draw.strokeWidth / 2;
            g.appendChild(Svg.line(dims.x, dims.y + apparentRadius, dims.x + dims.width / 2, dims.y + apparentRadius));
            g.appendChild(Svg.circle(dims.x + dims.width / 2, dims.y + apparentRadius, trueRadius, Config.Draw.Segments.CircleDiacritic.fill));
            return Object.assign(Object.assign({}, dims), { height: apparentRadius * 2 });
        },
    };
    Render.RenderMethods = RenderMethods;
})(Render || (Render = {}));
/// <reference path="Config.ts"/>
/// <reference path="RenderMethods.ts"/>
/// <reference path="Utility.ts"/>
var Render;
(function (Render) {
    var Svg = Utility.Svg;
    /** Base class for any object handling rendering of an SVG element. */
    class RenderObject {
    }
    /** Rendering class for the head of a Kto character. */
    class RenderHead extends RenderObject {
        /**
         * @param head The vowel this head will render, in text form.
         */
        constructor(head) {
            super();
            // get the draw method corresponding to the given vowel
            this.headDraw = Render.RenderMethods.hasHead(head) ? Render.RenderMethods.heads[head] : (dims) => dims;
        }
        draw(dims, svgParent) {
            return this.headDraw(dims, svgParent);
        }
    }
    /** Rendering class for a segment in a Kto character. */
    class RenderSegment extends RenderObject {
        /**
         * @param segment The initial or final consonant this segment will render, in text form.
         */
        constructor(segment) {
            super();
            // get the draw method corresponding to the given consonant
            this.segmentDraw = Render.RenderMethods.hasSegment(segment) ? Render.RenderMethods.segments[segment] : (dims) => (Object.assign({ height: 0 }, dims));
        }
        draw(dims, svgParent) {
            return this.segmentDraw(dims, svgParent);
        }
    }
    /** Rendering class for an empty segment in a Kto character. */
    class EmptyRenderSegment extends RenderSegment {
        constructor() {
            super("");
            this.segmentDraw = Render.RenderMethods.emptySegment;
        }
    }
    /** Rendering class for a column of segments in a Kto character. */
    class RenderSegmentColumn extends RenderObject {
        /**
         *
         * @param segments The consonants this column will render as segments, in text form.
         * @param isLeft Whether this column is the left-hand column of the character.
         */
        constructor(segments, isLeft) {
            super();
            this.segments = segments;
            this.flip = isLeft;
        }
        draw(dims, svgParent) {
            let yOffset = 0;
            // if there are no segments in this column, render the empty segment
            if (this.segments.length == 0) {
                let renderSegment = new EmptyRenderSegment();
                let segDims = renderSegment.draw({
                    x: dims.x,
                    y: dims.y + yOffset,
                    width: dims.width
                }, svgParent);
                // increment the y offset (so that the resultant height is consistent)
                yOffset += segDims.height;
            }
            else {
                this.segments.forEach((segment, i) => {
                    let renderSegment = new RenderSegment(segment);
                    let segDims = renderSegment.draw({
                        x: dims.x,
                        y: dims.y + yOffset,
                        width: dims.width,
                    }, svgParent);
                    // increment the y offset by the height, and the space between segments (as long as this isn't the last one!)
                    yOffset += segDims.height + (i + 1 == this.segments.length ? 0 : Config.Draw.Segments.spaceBetween);
                });
            }
            return Object.assign(Object.assign({}, dims), { height: yOffset });
        }
    }
    /** Rendering class for the tail of a Kto character. */
    class RenderTail extends RenderObject {
        constructor() {
            super();
        }
        draw(dims, svgParent) {
            let size = 6;
            // a triangle
            let points = [
                dims.x + dims.width / 2 - size, dims.y + size,
                dims.x + dims.width / 2, dims.y + 0,
                dims.x + dims.width / 2 + size, dims.y + size,
            ];
            // the polyline draws the triangle twice, to ensure no strange lines
            let tail = Svg.polyline([
                ...points,
                ...points
            ]);
            svgParent.appendChild(tail);
            return Object.assign(Object.assign({}, dims), { height: size });
        }
    }
    /** Rendering class for a Kto character. */
    class RenderCharacter extends RenderObject {
        /**
         * @param char The character being rendered.
         * @param isLastChar Whether this character is the last character in a word.
         */
        constructor(char, isLastChar) {
            super();
            this.char = char;
            this.isLastChar = isLastChar;
        }
        draw(dims, svgParent) {
            /** The total height of the character so far. */
            let height = 0;
            /** The head of the character. */
            let head = new RenderHead(this.char.vowel);
            /** The segment columns of the character. */
            let columns = {
                left: new RenderSegmentColumn(this.char.initials, true),
                right: new RenderSegmentColumn(this.char.finals, false)
            };
            ``;
            /** The group containing the character. */
            let charG = Svg.g(null, ["char"]);
            charG.setAttribute("transform", `translate(${dims.x},${dims.y})`);
            /** The group containing the head. */
            let headG = Svg.g(null, ["head"]);
            let headBounds = head.draw({
                x: 0,
                y: 0,
                width: dims.width,
                height: Config.Draw.Characters.normalHeadHeight
            }, headG);
            /** The height of the head and neck combined. */
            let headAndNeckHeight = headBounds.height + Config.Draw.Characters.neckHeight;
            // increment the height
            height += headAndNeckHeight;
            /** The group contaning the segment column groups. */
            let segmentsG = Svg.g(null, ["segments"]);
            /** The group containing all right segments. */
            let rightColG = Svg.g(null, ["right"]);
            /** The group containing all left segments. */
            let leftColG = Svg.g(null, ["left"]);
            /** The dimensions given to the columns. As the left and right columns are in the same theoretical space, it's the same. */
            let segmentGuides = {
                x: 0,
                y: headBounds.y + headAndNeckHeight,
                width: dims.width / 2 - Config.Draw.Segments.sidePadding
            };
            /** The height of the biggest column. */
            let biggestColHeight = Config.Draw.Segments.EmptySegment.height;
            let leftColYOffset = 0;
            let rightColYOffset = 0;
            // if there's at least one segment at all..
            if (this.char.initials.length != 0 || this.char.finals.length != 0) {
                let leftColBounds = columns.left.draw(segmentGuides, leftColG);
                let rightColBounds = columns.right.draw(segmentGuides, rightColG);
                // if extend small chars to min size, make the biggest column height at least the empty segment height
                if (Config.Draw.Characters.extendSmallCharsToMinSize)
                    biggestColHeight = Math.max(Config.Draw.Segments.EmptySegment.height, leftColBounds.height, rightColBounds.height);
                else
                    biggestColHeight = Math.max(leftColBounds.height, rightColBounds.height);
                if (Config.Draw.Segments.centerSingleSegments) {
                    // if center by largest single segment, if there is one segment on either side, align by the larger column
                    if (Config.Draw.Segments.centerByLargestSingleSegment && this.char.initials.length == 1 && this.char.finals.length == 1) {
                        let leftLarger = leftColBounds.height > rightColBounds.height;
                        let largerHeight = leftLarger ? leftColBounds.height : rightColBounds.height;
                        leftColYOffset = biggestColHeight / 2 - largerHeight / 2;
                        rightColYOffset = biggestColHeight / 2 - largerHeight / 2;
                    }
                    else if (this.char.initials.length == 1 && this.char.finals.length == 0) {
                        leftColYOffset = biggestColHeight / 2 - leftColBounds.height / 2;
                    }
                    else if (this.char.finals.length == 1 && this.char.initials.length == 0) {
                        rightColYOffset = biggestColHeight / 2 - rightColBounds.height / 2;
                    }
                }
            }
            rightColG.setAttribute("transform", `translate(${dims.width / 2},${rightColYOffset})`);
            // the left column is in the same position as the right column, but flipped horizontally
            leftColG.setAttribute("transform", `translate(${dims.width / 2},${leftColYOffset}) scale(-1 1)`);
            height += biggestColHeight;
            let tailG = Svg.g(null, ["tail"]);
            let tailHeight = Config.Draw.Characters.lastCharTailHeight;
            if (!this.isLastChar) {
                let tail = new RenderTail();
                let tailBounds = tail.draw({
                    x: 0,
                    y: segmentGuides.y + biggestColHeight + Config.Draw.Characters.normalPreTailHeight,
                    width: dims.width
                }, tailG);
                tailHeight = Config.Draw.Characters.normalPreTailHeight + tailBounds.height;
            }
            height += tailHeight;
            let spineY1 = headBounds.y + headBounds.height;
            let spine = Svg.line(dims.width / 2, spineY1, dims.width / 2, spineY1 + height - headBounds.height);
            spine.classList.add("spine");
            // put everything together in the correct order
            charG.appendChild(headG);
            segmentsG.appendChild(leftColG);
            segmentsG.appendChild(rightColG);
            charG.appendChild(segmentsG);
            charG.appendChild(spine);
            charG.appendChild(tailG);
            svgParent.appendChild(charG);
            return Object.assign(Object.assign({}, dims), { height: height });
        }
    }
    Render.RenderCharacter = RenderCharacter;
    class RenderWord extends RenderObject {
        constructor(word) {
            super();
            this.word = word;
        }
        draw(dims, svgParent) {
            let yOffset = 0;
            let wordG = Svg.g(null, ["word"]);
            wordG.setAttribute("transform", `translate(${dims.x} ${dims.y})`);
            svgParent.appendChild(wordG);
            this.word.characters.forEach((char, i) => {
                let renderChar = new RenderCharacter(char, i + 1 == this.word.characters.length);
                let charBounds = renderChar.draw({
                    x: 0,
                    y: yOffset,
                    width: dims.width
                }, wordG);
                let endSpace = Config.Draw.Words.spaceBetweenChars;
                if (i + 1 != this.word.characters.length && Config.Draw.Words.closeFitChars.includes(this.word.characters[i + 1].vowel))
                    endSpace = Config.Draw.Words.spaceBetweenBeforeCloseFitChars;
                yOffset += charBounds.height + endSpace;
            });
            if (yOffset != 0)
                yOffset -= Config.Draw.Words.spaceBetweenChars;
            return Object.assign(Object.assign({}, dims), { height: yOffset });
        }
    }
    Render.RenderWord = RenderWord;
    class RenderSentence extends RenderObject {
        constructor(word) {
            super();
            this.sentence = word;
        }
        draw(dims, svgParent) {
            let yOffset = 0;
            let sentenceG = Svg.g(null, ["sentence"]);
            sentenceG.setAttribute("transform", `translate(${dims.x} ${dims.y})`);
            svgParent.appendChild(sentenceG);
            this.sentence.words.forEach((word, i) => {
                let renderWord = new RenderWord(word);
                let wordBounds = renderWord.draw({
                    x: 0,
                    y: yOffset,
                    width: dims.width
                }, sentenceG);
                yOffset += wordBounds.height + Config.Draw.Sentences.spaceBetweenWords;
            });
            if (yOffset != 0)
                yOffset -= Config.Draw.Sentences.spaceBetweenWords;
            return Object.assign(Object.assign({}, dims), { height: yOffset });
        }
    }
    Render.RenderSentence = RenderSentence;
})(Render || (Render = {}));
/// <reference path="Kto.ts"/>
/// <reference path="RenderMethods.ts"/>
/// <reference path="RenderObject.ts"/>
var Render;
(function (Render) {
    function render(svg, sentence) {
        Utility.removeAllChildren(svg);
        let style = document.createElementNS(Utility.Svg.svgNS, "style");
        style.type = "text/css";
        style.textContent = Config.Draw.inlineCss;
        svg.appendChild(style);
        const CharCfg = Config.Draw.Characters;
        let renderSentence = new Render.RenderSentence(sentence);
        let bounds = renderSentence.draw({
            x: CharCfg.padding,
            y: CharCfg.padding,
            width: CharCfg.contentWidth
        }, svg);
        let svgBounds = {
            x: 0,
            y: 0,
            width: bounds.width + 2 * CharCfg.padding,
            height: bounds.height + 2 * CharCfg.padding
        };
        svg.setAttribute("viewBox", `0 0 ${svgBounds.width} ${svgBounds.height}`);
    }
    Render.render = render;
})(Render || (Render = {}));
/// <reference path="Parse.ts"/>
/// <reference path="Render.ts"/>
let mainSvg = null;
let downloadButton = null;
/** Redraws the transcription SVG. */
function redraw() {
    if (mainSvg == null)
        return;
    let textfield = document.querySelector("#textfield");
    let sentence = Parse.ParseSentence(textfield.value);
    Render.render(mainSvg, sentence);
    if (downloadButton != null)
        downloadButton.disabled = false;
}
function downloadSvg() {
    if (downloadButton == null)
        return;
    if (mainSvg == null) {
        downloadButton.disabled = true;
        return;
    }
    let data = mainSvg.outerHTML;
    let blob = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(blob);
    console.log(svgUrl);
    var link = document.createElement("a");
    link.href = svgUrl;
    link.download = "kto.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
/** Called when the page is loaded. */
function init() {
    // set the main SVG
    mainSvg = document.querySelector("#svg-root");
    downloadButton = document.querySelector("#download");
    downloadButton.disabled = true;
    downloadButton.addEventListener("click", () => downloadSvg());
    // Set the form to call 'redraw()' on submit, instead of going to a different page
    let form = document.querySelector("#transcribe-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        redraw();
    });
}
// register init
document.addEventListener("DOMContentLoaded", init);
