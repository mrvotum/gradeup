import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CardService } from '../card.service';

import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

@Component({
  selector: 'app-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.scss']
})
export class CardResultComponent implements OnInit {

  constructor(public service: CardService) { }

  ngOnInit(): void {
  }

  @ViewChild('content', { static: true }) el!: ElementRef<HTMLImageElement>;

  exportPDF() {
    // html2canvas(this.el.nativeElement).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/jpeg')

    //   const pdf = new jsPDF({
    //     orientation:'portrait'
    //   })

    //   const imageProps = pdf.getImageProperties(imgData)

    //   const pdfw = pdf.internal.pageSize.getWidth()

    //   const pdfh = (imageProps.height * pdfw) / imageProps.width

    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfw, pdfh)

    //   pdf.save('your level.pdf')
    // })

    html2canvas(this.el.nativeElement).then(canvas => {
      const linkHolder = document.getElementById('link-holder');

      var link = document.createElement('a');
      linkHolder?.appendChild(link);
      link.download = 'your level.jpg';
      link.href = canvas.toDataURL();
      link.target = '_blank';
      link.click();
    });
  }

}
