import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CardService } from '../card.service';
import { TestReaderService } from '../test-reader.service';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-card-result',
  templateUrl: './card-result.component.html',
  styleUrls: ['./card-result.component.scss'],
  providers: [ TestReaderService ]
})
export class CardResultComponent implements OnInit {
  testDB: any = null;

  constructor(
    public service: CardService,
    private serviceReader: TestReaderService
    ) { }

  ngOnInit(): void {
    this.serviceReader.getJSON().subscribe(data => {
      this.testDB = data;
      this.service.testDB = data;
    });
  }

  @ViewChild('content', { static: true }) el!: ElementRef<HTMLImageElement>;

  exportImgResult() {
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
