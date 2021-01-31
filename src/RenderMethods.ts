/// <reference path="Utility.ts"/>

namespace Render {
  // shorthand
  import Dimensions = Utility.Dimensions;
  import Svg = Utility.Svg;

  export type HeadRenderMethod = (dims: Dimensions, parent: SVGElement) => Dimensions;
  export type SegmentRenderMethod = (
    dims: {
      x: number, 
      y: number, 
      width: number
    },
    parent: SVGElement
  ) => Dimensions;
  
  /** Contains methods to draw specific heads and segments of Kto characters. */
  export abstract class RenderMethods {
    /** Determine if the given string corresponds to a head. */
    static hasHead(key: string): boolean {
      return Object.keys(this.heads).includes(key);
    }
    
    /** Determine if the given string corresponds to a segment. */
    static hasSegment(key: string): boolean {
      return Object.keys(this.segments).includes(key);
    }
      
    /** Method that draws the empty segment, given dimensions and a parent element. */
    static readonly emptySegment: SegmentRenderMethod = (dims,g) => {
      let apparentCircleRadius = Config.Draw.Segments.EmptySegment.Circles.apparentRadius;
      let trueCircleRadius = apparentCircleRadius - Config.Draw.strokeWidth/2;

      let x = dims.x + apparentCircleRadius*2;
      let startY = dims.y + apparentCircleRadius;
      let yPaddingBetweenCircles = Config.Draw.Segments.EmptySegment.Circles.spaceBetween;
      let yIncrement = apparentCircleRadius*2 + yPaddingBetweenCircles;

      g.appendChild(Svg.circle(x, startY, trueCircleRadius, Config.Draw.Segments.EmptySegment.Circles.fill));
      g.appendChild(Svg.circle(x, startY + yIncrement, trueCircleRadius, Config.Draw.Segments.EmptySegment.Circles.fill));
      g.appendChild(Svg.circle(x, startY + 2*yIncrement, trueCircleRadius, Config.Draw.Segments.EmptySegment.Circles.fill));

      return {...dims, height: Config.Draw.Segments.EmptySegment.height }
    };

    /*
     *   _   _                _ 
     *  | | | | ___  __ _  __| |
     *  | |_| |/ _ \/ _` |/ _` |
     *  |  _  |  __/ (_| | (_| |
     *  |_| |_|\___|\__,_|\__,_|
    */
    /** Methods that draw character heads, given dimensions and a parent element. */
    static readonly heads: {[key: string]: HeadRenderMethod} = {
      /*
       * /
       * -----------     A
      */
      "a": (dims,g) => {
        let lineY = dims.y + dims.height;

        // left arrow polyline
        g.appendChild(Svg.polyline([
          dims.x + dims.width/4, dims.y,
          dims.x               , lineY,
          dims.width           , lineY
        ]));

        return {...dims};
      },
      /*
       * |         |
       * -----------     E
      */
      "e": (dims,g) => {
        let lineY = dims.y + dims.height;
        // prong polyline
        g.appendChild(Svg.polyline([
          dims.x             ,dims.y,
          dims.x             ,lineY,
          dims.x + dims.width,lineY,
          dims.x + dims.width,dims.y
        ]));

        return {...dims};
      },
      /*
       * |         
       * +---------      I
       * |
      */
      "i": (dims,g) => {
        let lineY = dims.y + dims.height;
        // normal top line
        g.appendChild(Svg.line(
          dims.x,lineY,
          dims.x + dims.width,lineY
        ));

        // left side line
        g.appendChild(Svg.line(
          dims.x,dims.y,
          dims.x,dims.y + 2*dims.height
        ));

        return {...dims};
      },
      /*
       *    \_/          O 
      */
      "o": (dims,g) => {
        let radius = 7;
    
        g.appendChild(Svg.arc(
          dims.x + (dims.width / 2) - radius, dims.y,
          radius, dims.height,
          0,
          false, false,
          radius * 2, 0
        ));

        return {...dims};
      },
      /*
       *           \
       * -----------     U
      */
      "u": (dims,g) => {
        let lineY = dims.y + dims.height;

        // right arrow polyline
        g.appendChild(Svg.polyline([
          dims.x                   , lineY,
          dims.width               , lineY,
          dims.x + dims.width*(3/4), dims.y,
        ]));

        return {...dims};
      },
      /*
       * /     
       * ----------o     YA
      */
      "ya": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["a"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width - apparentRadius + 1, 
          dims.y + dims.height, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      /*
       * |    o    |
       * -----------     YE
      */
      "ye": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["e"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      /*
       * |         
       * +--------o      YI
       * |
      */
      "yi": (dims,g) => {
        let apparentRadius = 4;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["i"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width - apparentRadius + 1, 
          dims.y + dims.height, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      /*
       *     o
       *    \_/          YO
      */
      "yo": (dims,g) => {
        let apparentCircleRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueCircleRadius = apparentCircleRadius - Config.Draw.strokeWidth/2;
        let circleYOffset = apparentCircleRadius;
        let offsetFromO = circleYOffset*0.75;

        let oG = Svg.g(null,["o"]);
        oG.setAttribute("transform",`translate(0,${offsetFromO})`);
        g.appendChild(oG);
        
        RenderMethods.heads["o"](dims,oG);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + circleYOffset, 
          trueCircleRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims, height: dims.height + offsetFromO };
      },
      /*
       *          \
       * o----------     YU
      */
      "yu": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["u"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + apparentRadius - 1, 
          dims.y + dims.height, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      /*
       * /
       * ----------|     AI
      */
      "ai": (dims,g) => {
        let lineY = dims.y + dims.height;
        
        let aDims = RenderMethods.heads["a"](dims,g);

        // right side line
        g.appendChild(Svg.line(
          dims.x + dims.width,dims.y,
          dims.x + dims.width,dims.y + 2*dims.height
        ));

        return aDims;
      },
      /*
       * /      |
       * ------/     ao
      */
      "ao": (dims,g) => {
        g.appendChild(Svg.path(`
          M ${dims.x + dims.width/4} ${dims.y}
          l ${-dims.width/4} ${dims.height}
          l ${dims.width * Config.Draw.Characters.oDerivativeFlatSectionRatio} 0
          a ${dims.height} ${dims.height} 0 0 0 ${dims.height} ${-dims.height}
        `));

        return dims;
      },
      /*
       * /      \
       * +------+    au
      */
      "au": (dims,g) => {
        let lineY = dims.y + dims.height;

        // left arrow polyline
        g.appendChild(Svg.polyline([
          dims.x + dims.width/4, dims.y,
          dims.x               , lineY,
          dims.width           , lineY,
          dims.x + dims.width*(3/4), dims.y,
        ]));

        return dims;
      },
      /*
       * |      |
       * +------+    au
       *        |
      */
      "ei": (dims,g) => { 
        let lineY = dims.y + dims.height;
        // prong polyline
        g.appendChild(Svg.polyline([
          dims.x             ,dims.y,
          dims.x             ,lineY,
          dims.x + dims.width,lineY
        ]));

        g.appendChild(Svg.line(
          dims.x + dims.width,dims.y,
          dims.x + dims.width,dims.y + 2*dims.height
        ));

        return {...dims};
      },
      /*
       * |      |
       *  \-----+    oi
       *        |
      */
      "oi": (dims,g) => {
        // o arc
        g.appendChild(Svg.path(`
          M ${dims.x + dims.width} ${dims.height}
          l ${-dims.width * Config.Draw.Characters.oDerivativeFlatSectionRatio} 0
          a ${dims.height} ${dims.height} 0 0 1 ${-dims.height} ${-dims.height}
        `));
        
        // i line
        g.appendChild(Svg.line(
          dims.x + dims.width,dims.y,
          dims.x + dims.width,dims.y + 2*dims.height
        ));

        return dims;
      },
      /*
       * |      \
       *  \-----+    ou
      */
      "ou": (dims,g) => {
        g.appendChild(Svg.path(`
          M ${dims.x + dims.width*(3/4)} ${dims.y}
          l ${dims.width/4} ${dims.height}
          l ${-dims.width * Config.Draw.Characters.oDerivativeFlatSectionRatio} 0
          a ${dims.height} ${dims.height} 0 0 1 ${-dims.height} ${-dims.height}
        `));

        return dims;
      },
      "yai": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["ai"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      "yao": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["ao"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      "yau": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["au"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      "yei": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["ei"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      "yoi": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["oi"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
      },
      "you": (dims,g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        RenderMethods.heads["ou"](dims,g);
  
        // 'y' circle
        g.appendChild(Svg.circle(
          dims.x + dims.width/2, 
          dims.y + dims.height - apparentRadius*1.5, 
          trueRadius, 
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return {...dims};
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
    static readonly segments: {[key: string]: SegmentRenderMethod} = {
      /*
       *-------
       *
       *------+    P
       *------+
      */
      "p": (dims,g) => {
        let segHeight = 8;

        // line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        // rect
        g.appendChild(Svg.rect(
          dims.x, dims.y + segHeight/2,
          dims.width - Config.Draw.strokeWidth/2, segHeight/2
        ));

        return {...dims, height: segHeight};
      },
      /*
       *-------
       *
       *------+    B
       *---+--+
       *   |
      */
      "b": (dims,g) => {
        let pHeight = 8;
        let segHeight = pHeight + 4;

        // line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        // rect
        g.appendChild(Svg.rect(
          dims.x, dims.y + pHeight/2,
          dims.width - Config.Draw.strokeWidth/2, pHeight/2
        ));
        // small line
        g.appendChild(Svg.line(
          dims.x + dims.width/2, dims.y + pHeight,
          dims.x + dims.width/2,dims.y + segHeight
        ));

        return {...dims, height: segHeight};
      },
      /*
       *-------
       *-------   SC
      */
      "sc": (dims,g) => {
        let segHeight = 4;
        
        // top line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        
        // bottom line
        g.appendChild(Svg.line(
          dims.x             , dims.y + segHeight,
          dims.x + dims.width, dims.y + segHeight
        ));

        return {...dims, height: segHeight};
      },
      /*
       *-------
       *---+---   ZC
       *   |
      */
      "zc": (dims,g) => {
        let scHeight = 4;
        let segHeight = scHeight + 4;
        
        // top line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        
        // bottom line
        g.appendChild(Svg.line(
          dims.x             , dims.y + scHeight,
          dims.x + dims.width, dims.y + scHeight
        ));
        
        // vert line
        g.appendChild(Svg.line(
          dims.x + dims.width/2, dims.y + scHeight,
          dims.x + dims.width/2, dims.y + segHeight
        ));

        return {...dims, height: segHeight};
      },
      /*
       *-------    T
      */
      "t": (dims,g) => {
        // line
        g.appendChild(Svg.line(
          dims.x             ,dims.y,
          dims.x + dims.width,dims.y
        ));

        return {...dims, height: 0};
      },
      /*
       *---+---    D
       *   |       
      */
      "d": (dims,g) => {
        let segHeight = 4;
        
        // horiz line
        g.appendChild(Svg.line(
          dims.x             ,dims.y,
          dims.x + dims.width,dims.y
        ));

        g.appendChild(Svg.line(
          dims.x + dims.width/2,dims.y,
          dims.x + dims.width/2,dims.y + segHeight
        ));

        return {...dims, height: segHeight};
      },
      /*
       *---+---
       *   |       S
       *---+---
      */
      "s": (dims, g) => {
        let scHeight = 12;
        let halfHeight = (1/2) * scHeight;
        let baseY = dims.y + halfHeight;
        
        // top horiz line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        // vert line
        g.appendChild(Svg.line(
          dims.x + dims.width/2, dims.y,
          dims.x + dims.width/2, baseY
        ));
        // bottom horiz line
        g.appendChild(Svg.line(
          dims.x             , baseY,
          dims.x + dims.width, baseY
        ));

        return { ...dims, height: halfHeight }
      },
      /*
       *---+---
       *   |
       *---+---    Z
       *   |
      */
      "z": (dims, g) => {
        let scHeight = 12;
        let halfHeight = (1/2) * scHeight;
        let baseY = dims.y + halfHeight;
        
        // top horiz line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        // vert line
        g.appendChild(Svg.line(
          dims.x + dims.width/2, dims.y,
          dims.x + dims.width/2, dims.y + scHeight
        ));
        // bottom horiz line
        g.appendChild(Svg.line(
          dims.x             , baseY,
          dims.x + dims.width, baseY
        ));

        return { ...dims, height: scHeight }
      },
      /*
       *-------    K
       *----
      */
     "k": (dims,g) => {
        let segHeight = 4;
          
        // top line
        g.appendChild(Svg.line(
          dims.x             , dims.y,
          dims.x + dims.width, dims.y
        ));
        
        // bottom line
        g.appendChild(Svg.line(
          dims.x             , dims.y + segHeight,
          dims.x + dims.width/2, dims.y + segHeight
        ));

        return {...dims, height: segHeight};
      },
     /*
      *-------    K
      *----
     */
      "g": (dims,g) => {
      let kHeight = 4;
      let segHeight = kHeight*2;
        
      // top line
      g.appendChild(Svg.line(
        dims.x             , dims.y,
        dims.x + dims.width, dims.y
      ));
      
      // bottom line
      g.appendChild(Svg.polyline([
        dims.x, dims.y + kHeight,
        dims.x + dims.width/2, dims.y + kHeight,
        dims.x + dims.width/2, dims.y + segHeight
      ]));

      return {...dims, height: segHeight};
      },
      /*
       *   +---    F
       *---+
      */
      "f": (dims,g) => {
        let segHeight = 4;

        // big polyline
        g.appendChild(Svg.polyline([
          dims.x, dims.y + segHeight,
          dims.x + dims.width/2, dims.y + segHeight,
          dims.x + dims.width/2, dims.y,
          dims.x + dims.width, dims.y
        ]));

        return { ...dims, height: segHeight };
      },
      /*
       *   +---    V
       *---+
       *   |
      */
      "v": (dims,g) => {
        let fHeight = 4;
        let segHeight = fHeight + 4;

        // big polyline
        g.appendChild(Svg.polyline([
          dims.x, dims.y + fHeight,
          dims.x + dims.width/2, dims.y + fHeight,
          dims.x + dims.width/2, dims.y,
          dims.x + dims.width, dims.y
        ]));

        g.appendChild(Svg.line(
          dims.x + dims.width/2,dims.y + fHeight,
          dims.x + dims.width/2,dims.y + segHeight
        ));

        return { ...dims, height: segHeight };
      },
      /*
       *      |     
       *------+    L
       *------+
       *      |
      */
      "l": (dims,g) => {
        let thirdHeight = 4;
        let segHeight = thirdHeight*3;

        let width = dims.width*(5/8);

        // top line
        g.appendChild(Svg.line(
          dims.x,dims.y + thirdHeight,
          dims.x + width,dims.y + thirdHeight
        ));
        // horiz line
        g.appendChild(Svg.line(
          dims.x + width,dims.y,
          dims.x + width,dims.y + segHeight
        ));

        // bottom line
        g.appendChild(Svg.line(
          dims.x,dims.y + thirdHeight*2,
          dims.x + width,dims.y + thirdHeight*2
        ));

        return { ...dims, height: segHeight };
      },
      /*      |
       *---+  |     M
       *    \-+
      */
      "m": (dims,g) => {

        // fucked path
        g.appendChild(Svg.path(`        
          M ${dims.x} ${dims.y}
          l ${dims.width/2} 0
          a ${dims.width/2} ${dims.width/2} 0 0 0 ${dims.width/2} ${dims.width/2}
          l 0 ${-dims.width/2 - Config.Draw.strokeWidth/2}
        `));

        return { ...dims, height: dims.width/2 };
      },
      /*
       *---+
       *   +---    N
      */
      "n": (dims,g) => {
        let segHeight = 4;

        g.appendChild(Svg.polyline([
          dims.x,dims.y,
          dims.x + dims.width/2,dims.y,
          dims.x + dims.width/2,dims.y + segHeight,
          dims.x + dims.width,dims.y + segHeight
        ]));

        return { ...dims, height: segHeight };
      },
      /*
       *   |   
       *   |  |    R
       *---+--+
      */
      "r": (dims,g) => {
        let segHeight = 12;
        let thirdHeight = (1/3) * segHeight;
        let baseY = dims.y + 2 * thirdHeight;

        // base line
        g.appendChild(Svg.polyline([
          dims.x, baseY,
          dims.x + dims.width - Config.Draw.strokeWidth/2, baseY,
          dims.x + dims.width - Config.Draw.strokeWidth/2, dims.y + thirdHeight
        ]));
        // little line
        g.appendChild(Svg.line(
          dims.x + dims.width/2, dims.y,
          dims.x + dims.width/2, baseY
        ));

        return { ...dims, height: segHeight-thirdHeight };
      },
      /*
        *   |   
        *   |  |
        *---+--+    RC
        *   |
      */
      "rc": (dims,g) => {
        let segHeight = 12;
        let thirdHeight = (1/3) * segHeight;
        let baseY = 2 * thirdHeight + dims.y;

        // base line
        g.appendChild(Svg.polyline([
          dims.x, baseY,
          dims.x + dims.width - Config.Draw.strokeWidth/2, baseY,
          dims.x + dims.width - Config.Draw.strokeWidth/2, dims.y + thirdHeight
        ]));
        // little line
        g.appendChild(Svg.line(
          dims.x + dims.width/2, dims.y,
          dims.x + dims.width/2, dims.y + segHeight
        ));

        return { ...dims, height: segHeight };
      },
      /*
       *---O         H
      */
      "h": (dims, g) => {
        let apparentRadius = Config.Draw.Segments.CircleDiacritic.apparentRadius;
        let trueRadius = apparentRadius - Config.Draw.strokeWidth/2;

        g.appendChild(Svg.line(
          dims.x,dims.y + apparentRadius,
          dims.x + dims.width/2,dims.y + apparentRadius
        ));
        g.appendChild(Svg.circle(
          dims.x + dims.width/2,dims.y + apparentRadius,
          trueRadius,
          Config.Draw.Segments.CircleDiacritic.fill
        ));

        return { ...dims, height: apparentRadius*2 };
      },
    };
  }
}