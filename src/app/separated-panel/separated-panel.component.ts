import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CookieService } from 'ngx-cookie-service';

interface Preferences {
  fontSize: number,
  lineSpacing: number,
  textStyle: string,
  contrast: string,
  tocEnabled: boolean,
  enhancedInputs: boolean
}

const defaultPreferences = {
  fontSize: 1,
  lineSpacing: 1,
  textStyle: 'default',
  contrast: 'default',
  tocEnabled: false,
  enhancedInputs: false
};

@Component({
  selector: 'app-separated-panel',
  templateUrl: './separated-panel.component.html',
  styleUrls: ['./separated-panel.component.scss']
})
export class SeparatedPanelComponent implements OnInit {
  
  public visible:boolean = false;
  public preferences:Preferences;
  private baseFontSize: number;
  private baseLineHeight: number;

  preferencesHaveChanged(preferences): boolean {
    return JSON.stringify(preferences) === this.cookieService.get('flc-preferences');
  }

  togglePanel() {
    this.visible = !this.visible;
  }

  changeFontSize(value) {
    this.preferences['fontSize'] = value;
    document.body.style.fontSize = (this.baseFontSize * this.preferences.fontSize).toString() + "px";
    this.cookieService.set('flc-preferences', JSON.stringify(this.preferences));
  }

  changeLineSpacing(value) {
    this.preferences.lineSpacing = value;
    document.body.style.lineHeight = value;
    this.cookieService.set('flc-preferences', JSON.stringify(this.preferences));
  }

  changeContrast(value) {
    var allClasses = document.body.classList;
    allClasses.forEach(className => {
      if (className.startsWith("fl-theme-")) { document.body.classList.remove(className); }
    });
    document.body.classList.add("fl-theme-" + value);
    this.preferences.contrast = value;
    this.cookieService.set('flc-preferences', JSON.stringify(this.preferences));
  }

  changeTextStyle(event) {
    this.changeFontFamily(event.target.value);
    this.preferences.textStyle = event.target.value;
    this.cookieService.set('flc-preferences', JSON.stringify(this.preferences));
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
      this.createToc();
    } else {
      this.removeToc();
    }
  }

  createToc() {
    const toc = document.createElement("div"),
          tocUl = document.createElement("ul");
      
    toc.setAttribute("id", "toc");
    const tocTitle = document.createElement('h2');
    tocTitle.innerText = 'Table of contents';
    tocUl.classList.add("toc-ul");

    const allHeaders = document.body.querySelectorAll("h1, h2, h3, h4, h5, h6");

    allHeaders.forEach(header => {
      const hli = document.createElement("li"),
            headerId = encodeURI(header.textContent.toLowerCase());

      header.setAttribute("name", headerId);
      hli.classList.add("level-" + header.tagName[1]);
      hli.innerHTML = 
        "<span class='header-tag' aria-label=`header level ${header.tagName[1]}`>" +
        header.tagName + 
        "</span> <a href='#" + headerId + "'>" +
        header.textContent + "</a>";

      if (header.textContent) {
        tocUl.appendChild(hli);
      }
    });

    toc.appendChild(tocTitle);
    toc.appendChild(tocUl);
    document.body.prepend(toc);
  }

  removeToc() {
    const toc = document.getElementById("toc");
    if (toc) {
      toc.remove();
    }
  }

  toggleInputs(value) {
    if (value) {
      document.body.classList.add("fl-input-enhanced");
    } else {
      document.body.classList.remove("fl-input-enhanced");
    }
  }

  resetPreferences() {
    this.preferences = defaultPreferences;
    var allClasses = document.body.classList;
    this.setAllPreferences();
    this.cookieService.set('flc-preferences', JSON.stringify(this.preferences));
    window.location.reload();
  }

  setAllPreferences() {
    /* Start font size */
    document.body.style.fontSize = (this.baseFontSize * this.preferences.fontSize).toString() + "px";
    /* Line spacing */
    this.changeLineSpacing(this.preferences.lineSpacing);
    /* Change font family */
    this.changeFontFamily(this.preferences.textStyle);
    /* Contrast */
    document.body.classList.add("fl-theme-" + this.preferences.contrast);
    /* Toggle table of contents */
    if (this.preferences.tocEnabled) {
      this.createToc();
    } else {
      this.removeToc();
    }
    /* Enhance inputs */
    if (this.preferences.enhancedInputs) {
      document.body.classList.add("fl-input-enhanced");
    }
  }

  constructor(private cookieService: CookieService) {
    this.baseFontSize = Number(window.getComputedStyle(document.body).getPropertyValue('font-size').match(/\d+/)[0])
    this.preferences = cookieService.check('flc-preferences') ? JSON.parse(cookieService.get('flc-preferences')) : defaultPreferences;
   }

  ngOnInit(): void {
    this.setAllPreferences();
  }
}