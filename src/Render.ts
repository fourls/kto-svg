/// <reference path="Kto.ts"/>
/// <reference path="RenderMethods.ts"/>
/// <reference path="RenderObject.ts"/>

namespace Render {
  export function render(svg: SVGSVGElement, sentence: Kto.Sentence) {
    Utility.removeAllChildren(svg);
    
    let style = document.createElementNS(Utility.Svg.svgNS,"style");
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
      width: bounds.width + 2*CharCfg.padding,
      height: bounds.height + 2*CharCfg.padding
    }
    
    svg.setAttribute("viewBox",`0 0 ${svgBounds.width} ${svgBounds.height}`);
  }
}