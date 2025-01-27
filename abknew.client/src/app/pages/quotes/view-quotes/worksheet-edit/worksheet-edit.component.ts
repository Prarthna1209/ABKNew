import { Component } from '@angular/core';
import { TakeoffService } from '../../../../services/takeoff.service';
import { FormArray, FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DataService } from '../../../../services/data.service';
import { DS } from '../../../../models/DS.model';
import { ManufecturersService } from '../../../../services/manufecturers.service';
import { ProductService } from '../../../../services/product.service';
import { WorkbookNotesService } from '../../../../services/workbook-notes.service';
import { WorksheetItemsService } from '../../../../services/worksheet-items.service';
import { WorksheetsService } from '../../../../services/worksheet.service';
import { PdniService } from '../../../../services/pdni.service';
import { WorksheetItems } from '../../../../models/worksheetItems.model';
import { WorkbookNotes } from '../../../../models/workbook-notes.model';
import { Worksheets } from '../../../../models/worksheets.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-worksheet-edit',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSlideToggleModule, CommonModule
  ],
  templateUrl: './worksheet-edit.component.html',
  styleUrl: './worksheet-edit.component.css'
})
export class WorksheetEditComponent
{
  quote: any;
  wrkshts: any = [];
  worksheetItems: any = [];
  products: DS[] = [];
  notes: DS[] = [];
  manufacturers: DS[] = [];
  pdnis: DS[] = [];
  data: any;

  showActionDiv: boolean = false;

  constructor(
    private service: WorksheetsService,
    private worksheetItemService: WorksheetItemsService,
    private takeoffService: TakeoffService,
    private productService: ProductService,
    private workbooknoteService: WorkbookNotesService,
    private manufacturerService: ManufecturersService,
    private builder: FormBuilder,
    private dataService: DataService,
    private pdniService: PdniService
  )
  {
    this.data = this.dataService.getData();
    this.getManufacturer();
    this.getWorkbookNotes();
    this.getPDNIs();
    this.getTakeoff(this.data.takeoffId);
  }

  ngOnInit(): void
  {
    this.ensureOneFormWorksheet();
    this.ensureOneFormNotes();
  }

  worksheetFrm = this.builder.group({
    worksheets: this.builder.array([])
  });

  get worksheets(): FormArray
  {
    return this.worksheetFrm.get('worksheets') as FormArray;
  }

  getworksheetFormGroup(index: number): FormGroup
  {
    return this.worksheets.at(index) as FormGroup;
  }

  newWorksheet(): FormGroup
  {
    return this.builder.group({ //<WorksheetItems>
      id: [''],
      manufacturerId: [''],
      quantity: [0],
      productId: [''],
      unit: [''],
      listPrice: [0],
      net: [0],
      worksheetId: [''],
      createdAt: [''],
      updatedAt: [''],
      totalList: [0],
      totalNet: [0],
      tlpMul: [0],
      frieght: [0],
      TTL: [0],
      quoteAmount: [0],
      pdniId: [''],
      comments: [''],
      specialNotes: [''],
      listSum: [0],
      netSum: [0]
    });
  }

  addWItem()
  {
    this.worksheets.push(this.newWorksheet());
  }

  deleteWItem(index: number)
  {
    this.worksheets.removeAt(index);
  }

  ensureOneFormWorksheet()
  {
    if (this.worksheets.length === 0)
    {
      this.addWItem();
    }
  }

  notesFrm = this.builder.group({
    workbookNotes: this.builder.array([])
  });
  get workbookNotes(): FormArray
  {
    return this.notesFrm.get('workbookNotes') as FormArray;
  }

  getNotesFormGroup(index: number): FormGroup
  {
    return this.workbookNotes.at(index) as FormGroup;
  }

  newNote(): FormGroup
  {
    return this.builder.group({//<WorkbookNotes>
      note: [''],
      id: [''],
      created_at: [''],
      created_by: [''],
      updated_at: ['']
    });
  }

  addNItem()
  {
    this.workbookNotes.push(this.newNote());
  }

  deleteNItem(index: number)
  {
    this.workbookNotes.removeAt(index);
  }

  ensureOneFormNotes()
  {
    if (this.worksheets.length === 0)
    {
      this.addWItem();
    }
  }

  addPItem() { }
  deletePItem(index: number) { }

  saveWorksheet() { }

  worksheetSubmit() { }

  noteSubmit() { }

  getManufacturer()
  {
    this.manufacturerService.getManufacturer().subscribe(
      (result) =>
      {
        this.manufacturers = result.map(item => ({ value: item.id, viewValue: `${item.name}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getWorkbookNotes()
  {
    this.workbooknoteService.getWorkbookNote().subscribe(
      (result) =>
      {
        this.notes = result.map(item => ({ value: item.id, viewValue: `${item.note}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getProducts(manufacturerId: string)
  {
    this.productService.getProduct(manufacturerId).subscribe(
      (result) =>
      {
        this.products = result.map(item => ({ value: item.id, viewValue: `${item.name}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getPDNIs()
  {
    this.pdniService.getPdni().subscribe(
      (result) =>
      {
        this.pdnis = result.map(item => ({ value: item.id, viewValue: `${item.name}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getTakeoff(id: string)
  {
    this.takeoffService.getTakeoffById(id).subscribe(
      (result) =>
      {
        this.quote = result;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }
}
