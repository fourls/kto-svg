/// <reference path="SvgUtility.ts"/>

namespace Utility {
  export interface Dimensions {
    x: number;
    y: number;
    width: number;
    height: number;
  }
  
  /**
   * Remove all children of a node.
   * @param node The parent node.
   */
  export function removeAllChildren(node: Node): void {
    while (node.firstChild) {
      if(node.lastChild != null)
        node.removeChild(node.lastChild);
    }
  }
}