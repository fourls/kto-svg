/// <reference path="Parse.ts"/>
/// <reference path="Render.ts"/>

let mainSvg: SVGSVGElement|null = null;
let downloadButton: HTMLButtonElement|null = null;

/** Redraws the transcription SVG. */
function redraw() {
  if(mainSvg == null) return;

  let textfield = document.querySelector("#textfield") as HTMLInputElement;
  let sentence = Parse.ParseSentence(textfield.value);

  Render.render(mainSvg,sentence);

  if(downloadButton != null)
    downloadButton.disabled = false;
}

function downloadSvg() {
  if(downloadButton == null) return;

  if(mainSvg == null) {
    downloadButton.disabled = true;
    return;
  }

  let data = mainSvg.outerHTML;

  let blob = new Blob([data],{type: "image/svg+xml;charset=utf-8"});
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
  mainSvg = document.querySelector("#svg-root") as SVGSVGElement;

  downloadButton = document.querySelector("#download") as HTMLButtonElement;
  downloadButton.disabled = true;
  downloadButton.addEventListener("click",() => downloadSvg());

  // Set the form to call 'redraw()' on submit, instead of going to a different page
  let form = document.querySelector("#transcribe-form") as HTMLFormElement;
  form.addEventListener("submit",(e) => {
    e.preventDefault();
    redraw();
  });
}

// register init
document.addEventListener("DOMContentLoaded",init);