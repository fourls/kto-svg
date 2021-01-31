namespace Utility {
  export namespace Svg {
    export const svgNS = "http://www.w3.org/2000/svg";

    /**
     * Create an SVG symbol element.
     */
    export function symbol(): SVGSymbolElement {
      return document.createElementNS(svgNS,"symbol") as SVGSymbolElement;
    }

    /**
     * Create an SVG group element.
     */
    export function g(id: string|null = null, classList?: string[]): SVGGElement {
      let g = document.createElementNS(svgNS,"g") as SVGGElement;

      if(id != null)
        g.id = id;

      if(classList != undefined) {
        g.classList.add(...classList);
      }

      return g;
    }

    /**
     * Create an SVG group element.
     */
    export function svg(id: string|null = null, classList?: string[]): SVGSVGElement {
      let svg = document.createElementNS(svgNS,"svg") as SVGSVGElement;

      if(id != null)
        svg.id = id;

      if(classList != undefined) {
        svg.classList.add(...classList);
      }

      return svg;
    }

    /**
     * Create an SVG use element.
     * @param href The href of the symbol the use is displaying.
     */
    export function use(href: string,x: number,y: number,width: number,height: number): SVGUseElement {
      let use = document.createElementNS(svgNS,"use") as SVGUseElement;
      use.setAttribute("href",href);
      use.setAttribute("x",x.toString());
      use.setAttribute("y",y.toString());
      use.setAttribute("width",width.toString());
      use.setAttribute("height",height.toString());
      return use;
    }

    /**
     * Create an SVG line element.
     */
    export function line(x1: number,y1: number,x2: number,y2: number): SVGLineElement {
      let line = document.createElementNS(svgNS,"line") as SVGLineElement;
      line.setAttribute("x1",x1.toString());
      line.setAttribute("y1",y1.toString());
      line.setAttribute("x2",x2.toString());
      line.setAttribute("y2",y2.toString());
      return line;
    }

    /**
     * Create an SVG circle element.
     * @param cx The x coordinate of the circle center.
     * @param cy The y coordinate of the circle center.
     * @param r The radius of the circle.
     */
    export function circle(cx: number,cy: number,r: number,fill: string|null = null): SVGCircleElement {
      let circle = document.createElementNS(svgNS,"circle") as SVGCircleElement;
      circle.setAttribute("cx",cx.toString());
      circle.setAttribute("cy",cy.toString());
      circle.setAttribute("r",r.toString());

      if(fill != null) {
        circle.setAttribute("fill",fill);
      }

      return circle;
    }

    /**
     * Create an SVG polyline element.
     * @param points The points in the polyline as a list of individual coordinates.
     */
    export function polyline(points: number[]): SVGPolylineElement {
      let polyline = document.createElementNS(svgNS,"polyline") as SVGPolylineElement;
      
      let pointsStr = "";
      for(let i = 0; i < points.length; i++) {
          pointsStr += " " + points[i] + " ";
      }
      
      polyline.setAttribute("points",pointsStr);
      
      return polyline;
    }

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
    export function arc(cx: number, cy: number, rx: number, ry: number, rot: number, largeArc: boolean, sweep: boolean, endx: number, endy: number): SVGPathElement {
      let arc = document.createElementNS(svgNS,"path") as SVGPathElement;

      arc.setAttribute("d",`
        M ${cx},${cy}
        a ${rx},${ry} ${rot} ${(largeArc ? 1 : 0)},${(sweep ? 1 : 0)} ${endx},${endy}
      `);

      return arc;
    }

    export function path(d: string) {
      let path = document.createElementNS(svgNS,"path") as SVGPathElement;
      path.setAttribute("d",d);

      return path;
    }

    export function rect(x: number, y: number, width: number, height: number) {
      let rect = document.createElementNS(svgNS,"rect") as SVGRectElement;

      rect.setAttribute("x",x.toString());
      rect.setAttribute("y",y.toString());
      rect.setAttribute("width",width.toString());
      rect.setAttribute("height",height.toString());

      return rect;
    }
  }
}