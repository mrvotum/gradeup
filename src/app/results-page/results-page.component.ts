import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelector('body')?.classList.add('body--results');
  }



  @ViewChild('content', { static: true }) el!: ElementRef<HTMLImageElement>;


  exportPDF() {

    html2canvas(this.el.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg")

      const pdf = new jsPDF({
        orientation:"portrait"
      })

      const imageProps = pdf.getImageProperties(imgData)

      const pdfw = pdf.internal.pageSize.getWidth()

      const pdfh = (imageProps.height * pdfw) / imageProps.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh)

      pdf.save("output.pdf")
    })
  }



  printScreen() {
    console.log('screen');
    const lol = document.getElementById("content")
    const kek: HTMLElement = lol!;

    html2canvas(kek).then(function(canvas) {
      var my_screen = canvas;
      document.querySelector("#result")?.appendChild(my_screen);

      console.log(document.querySelector("#result"));
    });
  }

}
