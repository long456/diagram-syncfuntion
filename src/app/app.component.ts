import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ConnectorModel, ContextMenuSettingsModel, DiagramBeforeMenuOpenEventArgs, DiagramComponent, FlowShapeModel, HtmlModel, NodeModel, PaletteModel, PortConstraints, PortVisibility, ShapeStyleModel, ScrollSettingsModel, PrintAndExport, IExportOptions, Diagram} from '@syncfusion/ej2-angular-diagrams';
import { MenuEventArgs } from '@syncfusion/ej2-navigations';
import html2canvas from 'html2canvas';
import { NgxCaptureService } from 'ngx-capture';
import { tap } from 'rxjs/operators';
import { obj, options } from '../app/data';
Diagram.Inject(PrintAndExport);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit,AfterViewInit {
  title = 'diagram-syncfuntion';

  @ViewChild('diagram')
  diagramObj!: DiagramComponent;

  @ViewChild('cardTemplate')
  card!: HTMLElement;

  @ViewChild('screen', { static: true }) screen: any;

  constructor(private captureService: NgxCaptureService) {}

  isVisible = false;

  isOpen = false;

  diagramData: any;

  modalData: any;

  dropDownOptions = options;

  renderingOptions: any = [];

  startNode: ShapeStyleModel = {fill: '#ff0000'}

  public htmlShape: HtmlModel = { type: 'HTML' };
  public process: FlowShapeModel = { type: 'Flow', shape: 'Process' };

  public contextMenu?: ContextMenuSettingsModel

  public scrollSettings?: ScrollSettingsModel = {
    scrollLimit: 'Infinity',
    canAutoScroll: true
  }

  ngOnInit(): void {
    this.contextMenu = {
      show: true, items: [
        {
          text: 'Create', id: 'createCards',
          items : [
            {
              text: 'Card item', id: 'createCard',
            },
            {
              text: 'Action item', id: 'createAction',
            }
          ]
        },
        {
          text: 'Delete', id: 'delete',
        },
      ],
      showCustomMenuOnly: false, 
    } as ContextMenuSettingsModel
  }

  ngAfterViewInit(): void  {
    (document.querySelector('[style*="z-index: 999999"]') as HTMLElement).style.display = 'none';
  }

  log(data: any) {
    // console.log(data);
  }

  public nodes: NodeModel[] = [
    {
      id: "HTML",
      //sets the type of the shape as HTML
      offsetX: 160, offsetY: 250, width: 300, height: 300,
      data: {
        id: 'test',
        name: 'Nguyễn Ngọc Long',
        tittle: 'Lập báo cáo thu chi',
        status: 'On Process'
      },
      shape: {
        type: "HTML",
      },
      ports: [{
          visibility: PortVisibility.Hover,
          offset: {x:1, y: 0.3},
          shape : 'Custom',
          pathData : 'M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z',
          constraints: PortConstraints.Draw
      }],
    },
  ];

  public symbolPalette: PaletteModel[] = [
    {
      id: 'basic',
      symbols: this.getBasicShapes(),
      title: 'Basic Shapes',
    },
    {
      id: 'connectors',
      symbols: this.getConnectorts(),
      title: 'Connectors',
    },
  ];

  public getBasicShapes() : NodeModel[] {
    let basicshapes: NodeModel[] = [
      {
        id: 'Ellipse',
        shape : {type: 'Basic', shape: 'Ellipse' }
      },
      {
        id: 'Rectangle',
        shape : {type: 'Basic', shape: 'Rectangle' }
      },
      {
        id: 'Hexagon',
        shape : {type: 'Basic', shape: 'Hexagon' },
      },
    ]
    return basicshapes;
  }

  public getConnectorts(): ConnectorModel[] {
    let connectors: ConnectorModel[] = [
      {
        id: 'link1',
        type: 'Orthogonal',
        sourcePoint: {x: 0, y: 0},
        targetPoint: {x: 60, y: 60},
        targetDecorator: {shape: 'Arrow'},
        annotations: [{style: {fill: 'white'}}]
      },
      {
        id: 'link2',
        type: 'Bezier',
        sourcePoint: {x: 0, y: 0},
        targetPoint: {x: 60, y: 60},
        targetDecorator: {shape: 'Diamond'}
      },
      {
        id: 'link3',
        type: 'Straight',
        sourcePoint: {x: 0, y: 0},
        targetPoint: {x: 60, y: 60},
        targetDecorator: {shape: 'Arrow'}
      },
    ];

    return connectors
  }

  public getSymbolDefaults(symbol: NodeModel): void {
    symbol.width = 100;
    symbol.height = 100;
  }

  public contextMenuOpen(args: DiagramBeforeMenuOpenEventArgs): void { 
  //   //to get a node
  //  let selectedNode:NodeModel = this.diagram.selectedItems.nodes[0];
  //  //to get a connector
  //  let selectedConnector:ConnectorModel = this.diagram.selectedItems.connectors[0]; 
  //  if(selectedNode && selectedNode.annotations && selectedNode.annotations.length > 0) {
  //    //get a node annotation object
  //      let label = selectedNode.annotations[0];
  //  }

  //  if(selectedConnector && selectedConnector.annotations && selectedConnector.annotations.length > 0) {
  //    //get a connector annotation object
  //     let label = selectedConnector.annotations[0];
  //  }
  //  if(!(selectedNode || selectedConnector)) {
  //    //cancel a event if it is a diagram.
  //    args.cancel=true;
  //  }
 }

  public contextMenuClick(args: MenuEventArgs): void {
    if (args.item.id == 'delete') {
      if (((this.diagramObj as any).selectedItems.nodes.length + (this.diagramObj as any).selectedItems.connectors.length) > 0) {
        (this.diagramObj as any).cut();
      //  this.diagramObj.remove((this.diagramObj as any).selectedItems.nodes[0])
      }
    }
    
    if (args.item.id == 'createCard') {
      this.diagramObj.addNode(
        {
          id: Math.random().toString(36).substring(2, length+2),
          offsetX: (args as any).event.pageX, offsetY: (args as any).event.pageY, width: 300, height: 300,
          data: {
            id: 'test',
            name: 'Chưa set',
            tittle: 'Chưa set',
            status: 'On Setup'
          },
          shape: {
            type: "HTML",
          },
          ports: [{
              visibility: PortVisibility.Hover,
              offset: {x:1, y: 0.3},
              shape : 'Custom',
              pathData : 'M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z',
              constraints: PortConstraints.Draw
          }],
        } as NodeModel
      );
    }
 
  }

  showModal(data: any) {
    this.modalData = data;
    this.isVisible = true;
  }

  showEdit(data: any) {
    this.isOpen = true;
  }

  handleOk(): void {
    this.nodes.map(item => {
      if (item.id == this.modalData.id) {
        item.data = this.modalData.data
      }
    })
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isOpen = false;
  }

  onSave() {
    this.diagramData = this.diagramObj.saveDiagram();
    console.log(this.diagramData)
  }


  onLoad() {
    let objData: any = obj;
    // this.diagramObj.loadDiagram(this.diagramData);
    this.diagramObj.loadDiagram(objData);
  }

  onRedo() {
    this.diagramObj.redo();
  }

  onUndo() {
    this.diagramObj.undo();
  }

  onExport() {
    let exportOptions: IExportOptions = {
      format: 'PNG',
      mode: 'Download'
    }
    this.diagramObj.exportDiagram(exportOptions);
  }

  onPrint() {
    // let printOptions: IExportOptions = {
    //   mode: 'Data'
    // }
    // this.diagramObj.print(printOptions);
    this.diagramObj.unSelect((this.diagramObj as any).selectedItems.nodes[0])
    html2canvas(this.screen.nativeElement).then(canvas => {
      let imgUrl = canvas.toDataURL();
      console.log(imgUrl)
    })
  }

  render(data: any) {
    this.renderingOptions.push(data);
    console.log(this.renderingOptions)
  }
}
