/// <reference path="Config.ts"/>
/// <reference path="RenderMethods.ts"/>
/// <reference path="Utility.ts"/>

namespace Render {
  // shorthand
  import Dimensions = Utility.Dimensions;
  import Svg = Utility.Svg;

  /** Base class for any object handling rendering of an SVG element. */
  abstract class RenderObject {
    /**
     * Draw this object with the given dimensions inside the given parent.
     * @param dims Any dimensions that are specified by the parent.
     * @param svgParent The SVG element to parent any rendered SVG elements to.
     */
    abstract draw(dims: {x?: number, y?: number, width?: number, height?: number}, svgParent: SVGElement): Dimensions;
  }

  /** Rendering class for the head of a Kto character. */
  class RenderHead extends RenderObject {
    /** The method that draws this specific head. */
    headDraw: HeadRenderMethod;

    /**
     * @param head The vowel this head will render, in text form.
     */
    constructor(head: string) {
      super();

      // get the draw method corresponding to the given vowel
      this.headDraw = RenderMethods.hasHead(head) ? RenderMethods.heads[head] : (dims) => dims;
    }

    draw(dims: Dimensions, svgParent: SVGGElement): Dimensions {
      return this.headDraw(dims,svgParent);
    }
  }

  /** Rendering class for a segment in a Kto character. */
  class RenderSegment extends RenderObject {
    /** The method that draws this specific segment. */
    segmentDraw: SegmentRenderMethod;

    /**
     * @param segment The initial or final consonant this segment will render, in text form.
     */
    constructor(segment: string) {
      super();

      // get the draw method corresponding to the given consonant
      this.segmentDraw = RenderMethods.hasSegment(segment) ? RenderMethods.segments[segment] : (dims) => ({ height: 0, ...dims });
    }

    draw(dims: {x: number, y: number, width: number}, svgParent: SVGGElement): Dimensions {
      return this.segmentDraw(dims,svgParent);
    }
  }

  /** Rendering class for an empty segment in a Kto character. */
  class EmptyRenderSegment extends RenderSegment {
    constructor() {
      super("");

      this.segmentDraw = RenderMethods.emptySegment;
    }
  }

  /** Rendering class for a column of segments in a Kto character. */
  class RenderSegmentColumn extends RenderObject {
    /** The consonants this column will render as segments, in text form. */
    segments: string[];
    /** Whether this column should be flipped on the x axis. */
    flip: boolean;

    /**
     * 
     * @param segments The consonants this column will render as segments, in text form.
     * @param isLeft Whether this column is the left-hand column of the character.
     */
    constructor(segments: string[], isLeft: boolean) {
      super();

      this.segments = segments;
      this.flip = isLeft;
    }

    draw(dims: {x: number, y: number, width: number}, svgParent: SVGGElement): Dimensions {
      let yOffset = 0;

      // if there are no segments in this column, render the empty segment
      if(this.segments.length == 0) {
        let renderSegment = new EmptyRenderSegment();

        let segDims = renderSegment.draw({
          x: dims.x,
          y: dims.y + yOffset,
          width: dims.width
        },svgParent);

        // increment the y offset (so that the resultant height is consistent)
        yOffset += segDims.height;
      } else {
        this.segments.forEach((segment,i) => {
          let renderSegment = new RenderSegment(segment);
          let segDims = renderSegment.draw({
            x: dims.x,
            y: dims.y + yOffset,
            width: dims.width,
          },svgParent);
          
          // increment the y offset by the height, and the space between segments (as long as this isn't the last one!)
          yOffset += segDims.height + (i+1 == this.segments.length ? 0 : Config.Draw.Segments.spaceBetween);
        });
      }


      return {
        ...dims,
        height: yOffset
      }
    }
  }

  /** Rendering class for the tail of a Kto character. */
  class RenderTail extends RenderObject {
    constructor() {
      super();
    }

    draw(dims: {x: number, y: number, width: number}, svgParent: SVGGElement): Dimensions {
      let size = 6;

      // a triangle
      let points = [
        dims.x + dims.width/2 - size, dims.y + size,
        dims.x + dims.width/2    , dims.y + 0,
        dims.x + dims.width/2 + size, dims.y + size,
      ]

      // the polyline draws the triangle twice, to ensure no strange lines
      let tail = Svg.polyline([
        ...points,
        ...points
      ]);

      svgParent.appendChild(tail);

      return {
        ...dims,
        height: size
      };
    }
  }

  /** Rendering class for a Kto character. */
  export class RenderCharacter extends RenderObject {
    /** The character being rendered. */
    char: Kto.Char;
    /** Whether this character is the last character in a word. */
    isLastChar: boolean;

    /**
     * @param char The character being rendered.
     * @param isLastChar Whether this character is the last character in a word.
     */
    constructor(char: Kto.Char, isLastChar: boolean) {
      super();

      this.char = char;
      this.isLastChar = isLastChar;
    }

    draw(dims: {x: number, y: number, width: number}, svgParent: SVGElement): Dimensions {
      /** The total height of the character so far. */
      let height = 0;

      /** The head of the character. */
      let head = new RenderHead(this.char.vowel);
      /** The segment columns of the character. */
      let columns = {
        left: new RenderSegmentColumn(this.char.initials,true),
        right: new RenderSegmentColumn(this.char.finals,false)
      }; ``

      /** The group containing the character. */
      let charG = Svg.g(null,["char"]);
      charG.setAttribute("transform",`translate(${dims.x},${dims.y})`);

      /** The group containing the head. */
      let headG = Svg.g(null,["head"]);

      let headBounds = head.draw({
        x: 0,
        y: 0,
        width: dims.width,
        height: Config.Draw.Characters.normalHeadHeight
      },headG);

      /** The height of the head and neck combined. */
      let headAndNeckHeight = headBounds.height + Config.Draw.Characters.neckHeight;

      // increment the height
      height += headAndNeckHeight;
      
      /** The group contaning the segment column groups. */
      let segmentsG = Svg.g(null,["segments"]);

      /** The group containing all right segments. */
      let rightColG = Svg.g(null,["right"]);

      /** The group containing all left segments. */
      let leftColG = Svg.g(null,["left"]);

      /** The dimensions given to the columns. As the left and right columns are in the same theoretical space, it's the same. */
      let segmentGuides = {
        x: 0,
        y: headBounds.y + headAndNeckHeight,
        width: dims.width/2 - Config.Draw.Segments.sidePadding
      };
      
      /** The height of the biggest column. */
      let biggestColHeight = Config.Draw.Segments.EmptySegment.height;

      let leftColYOffset = 0;
      let rightColYOffset = 0;

      // if there's at least one segment at all..
      if(this.char.initials.length != 0 || this.char.finals.length != 0) {
        let leftColBounds = columns.left.draw(segmentGuides,leftColG);
        let rightColBounds = columns.right.draw(segmentGuides,rightColG);
        
        // if extend small chars to min size, make the biggest column height at least the empty segment height
        if(Config.Draw.Characters.extendSmallCharsToMinSize)
          biggestColHeight = Math.max(Config.Draw.Segments.EmptySegment.height,leftColBounds.height,rightColBounds.height);
        else
          biggestColHeight = Math.max(leftColBounds.height,rightColBounds.height);
        
        if(Config.Draw.Segments.centerSingleSegments) {

          // if center by largest single segment, if there is one segment on either side, align by the larger column
          if(Config.Draw.Segments.centerByLargestSingleSegment && this.char.initials.length == 1 && this.char.finals.length == 1) {
            let leftLarger = leftColBounds.height > rightColBounds.height;

            let largerHeight = leftLarger ? leftColBounds.height : rightColBounds.height;

            leftColYOffset = biggestColHeight/2 - largerHeight/2;
            rightColYOffset = biggestColHeight/2 - largerHeight/2;
          
          
          } else if(this.char.initials.length == 1 && this.char.finals.length == 0) {
            leftColYOffset = biggestColHeight/2 - leftColBounds.height/2;
          } else if(this.char.finals.length == 1 && this.char.initials.length == 0) {
            rightColYOffset = biggestColHeight/2 - rightColBounds.height/2;
          }
        }
      }
      
      rightColG.setAttribute("transform",`translate(${dims.width/2},${rightColYOffset})`);
      // the left column is in the same position as the right column, but flipped horizontally
      leftColG.setAttribute("transform",`translate(${dims.width/2},${leftColYOffset}) scale(-1 1)`);

      height += biggestColHeight;
      
      let tailG = Svg.g(null,["tail"]);
      let tailHeight = Config.Draw.Characters.lastCharTailHeight;

      if(!this.isLastChar) {
        let tail = new RenderTail();
        let tailBounds = tail.draw({
          x: 0,
          y: segmentGuides.y + biggestColHeight + Config.Draw.Characters.normalPreTailHeight,
          width: dims.width
        },tailG);

        tailHeight = Config.Draw.Characters.normalPreTailHeight + tailBounds.height;
      }

      height += tailHeight;

      let spineY1 = headBounds.y + headBounds.height;
      
      let spine = Svg.line(dims.width/2,spineY1,dims.width/2,spineY1 + height - headBounds.height);
      spine.classList.add("spine");

      // put everything together in the correct order
      charG.appendChild(headG);
      segmentsG.appendChild(leftColG);
      segmentsG.appendChild(rightColG);
      charG.appendChild(segmentsG);
      charG.appendChild(spine);
      charG.appendChild(tailG);
      svgParent.appendChild(charG);

      return {
        ...dims,
        height: height
      };
    }
  }

  export class RenderWord extends RenderObject {
    word: Kto.Word;

    constructor(word: Kto.Word) {
      super();

      this.word = word;
    }

    draw(dims: {x: number, y: number, width: number},svgParent: SVGElement): Dimensions {
      let yOffset = 0;

      let wordG = Svg.g(null,["word"]);
      wordG.setAttribute("transform",`translate(${dims.x} ${dims.y})`);
      svgParent.appendChild(wordG);

      this.word.characters.forEach((char,i) => {
        let renderChar = new RenderCharacter(char,i+1 == this.word.characters.length);
        let charBounds = renderChar.draw({
          x: 0,
          y: yOffset,
          width: dims.width
        },wordG);

        let endSpace = Config.Draw.Words.spaceBetweenChars;

        if(i+1 != this.word.characters.length && Config.Draw.Words.closeFitChars.includes(this.word.characters[i+1].vowel))
          endSpace = Config.Draw.Words.spaceBetweenBeforeCloseFitChars;

        yOffset += charBounds.height + endSpace;
      });

      if(yOffset != 0)
        yOffset -= Config.Draw.Words.spaceBetweenChars;

      return {
        ...dims,
        height: yOffset
      }
    }
  }
  
  export class RenderSentence extends RenderObject {
    sentence: Kto.Sentence;

    constructor(word: Kto.Sentence) {
      super();

      this.sentence = word;
    }

    draw(dims: {x: number, y: number, width: number},svgParent: SVGElement): Dimensions {
      let yOffset = 0;

      let sentenceG = Svg.g(null,["sentence"]);
      sentenceG.setAttribute("transform",`translate(${dims.x} ${dims.y})`);
      svgParent.appendChild(sentenceG);

      this.sentence.words.forEach((word,i) => {
        let renderWord = new RenderWord(word);
        let wordBounds = renderWord.draw({
          x: 0,
          y: yOffset,
          width: dims.width
        },sentenceG);

        yOffset += wordBounds.height + Config.Draw.Sentences.spaceBetweenWords;
      });

      if(yOffset != 0)
        yOffset -= Config.Draw.Sentences.spaceBetweenWords;

      return {
        ...dims,
        height: yOffset
      }
    }
  }
}