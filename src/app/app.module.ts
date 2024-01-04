import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiagramModule, SymbolPaletteModule, DiagramContextMenuService, PrintAndExport, } from '@syncfusion/ej2-angular-diagrams';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { BpmnDiagramsService} from '@syncfusion/ej2-angular-diagrams';
import { UndoRedoService } from '@syncfusion/ej2-angular-diagrams';
import { NgxCaptureModule } from 'ngx-capture';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TemplateRenderingComponent } from './template-rendering/template-rendering.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TemplateRenderingComponent
  ],
  imports: [
    BrowserModule,
    DiagramModule,
    SymbolPaletteModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzDatePickerModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzDropDownModule,
    NzTypographyModule,
    NgxCaptureModule
  ],
  providers: [DiagramContextMenuService, { provide: NZ_I18N, useValue: en_US }, BpmnDiagramsService, UndoRedoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
