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