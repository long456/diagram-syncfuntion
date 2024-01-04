import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-rendering',
  templateUrl: './template-rendering.component.html',
  styleUrls: ['./template-rendering.component.css']
})
export class TemplateRenderingComponent implements OnInit {

  @Input() data: any = ''

  constructor() {}

  ngOnInit(): void {
    console.log(this.data)
  }

}
