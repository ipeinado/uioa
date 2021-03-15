import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

interface Preferences {
  fontSize: number,
  lineSpacing: number,
  textStyle: string,
  contrast: string,
  tocEnabled: boolean,
  enhancedInputs: boolean
}

@Component({
  selector: 'app-separated-panel',
  templateUrl: './separated-panel.component.html',
  styleUrls: ['./separated-panel.component.scss']
})
export class SeparatedPanelComponent implements OnInit {
  
  public visible:boolean = true;
  public preferences:Preferences;

  private baseFontSize: number;
  private baseLineHeight: number;

  togglePanel() {
    this.visible = !this.visible;
  }

  changeFontSize(value) {
    document.body.style.fontSize = (this.baseFontSize * this.preferences.fontSize).toString() + "px";
  }

  changeLineSpacing(value) {
    document.body.style.lineHeight = value;
  }

  changeContrast(value) {
    var allClasses = document.body.classList;
    allClasses.forEach(className => {
      if (className.startsWith("fl-theme-")) { document.body.classList.remove(className); }
    });
    document.body.classList.add("fl-theme-" + value);
  }

  changeTextStyle(event) {
    this.changeFontFamily(event.target.value);
  }

  changeFontFamily(value) {
    var allClasses = document.body.classList;
    allClasses.forEach(className => {
      if (className.startsWith("fl-font-")) { document.body.classList.remove(className); }
    });
    document.body.classList.add("fl-font-" + value);
  }

  toggleToC(value) {
    console.log("TABLE OF CONTENTS ", value);
    console.log("PREFERENCES TOC", this.preferences.tocEnabled);

    if (value) {
      const toc = document.createElement("div"),
            tocUl = document.createElement("ul");
      
      toc.setAttribute("id", "toc");
      tocUl.classList.add("toc-ul");

      const allHeaders = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

      allHeaders.forEach(header => {
        const hli = document.createElement("li"),
              headerId = encodeURI(header.textContent.toLowerCase());

        header.setAttribute("name", headerId);
        hli.classList.add("level-" + header.tagName[1]);
        hli.innerHTML = 
          header.tagName + 
          " - <a href='#" + headerId + "'>" +
          header.textContent + "</a>";

        if (header.textContent) {
          tocUl.appendChild(hli);
        }
      });

      toc.appendChild(tocUl);
      document.body.appendChild(toc);
    } else {
      const toc = document.getElementById("toc");
      if (toc) {
        toc.remove();
      }
    }
  }

  toggleInputs(value) {
    if (value) {
      document.body.classList.add("fl-input-enhanced");
    } else {
      document.body.classList.remove("fl-input-enhanced");
    }
  }

  constructor() {
    this.baseFontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
   }

  ngOnInit(): void {
    this.preferences = {
      fontSize: 1.2,
      lineSpacing: 1.6,
      textStyle: 'tnr',
      contrast: 'yb',
      tocEnabled: true,
      enhancedInputs: true
    };
    
    this.changeFontSize(this.preferences.fontSize);
    this.changeLineSpacing(this.preferences.lineSpacing);
    this.changeFontFamily(this.preferences.textStyle);
    this.toggleToC(this.preferences.tocEnabled);
  }
}
