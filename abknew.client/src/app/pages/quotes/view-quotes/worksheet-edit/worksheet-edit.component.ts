import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Manufecturers } from '../../../../models/manufecturers.model';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { MatGridListModule } from '@angular/material/grid-list';
import { Pdni } from '../../../../models/pdni.model';
import { WorkbookNotesWorksheet } from '../../../../models/workbook-notes-worksheet.model';
import { PdniWorksheetService } from '../../../../services/pdni-worksheet.service';
import { WorkbookNotesWorksheetService } from '../../../../services/workbook-notes-worksheet.service';

@Component({
  selector: 'app-worksheet-edit',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSlideToggleModule, CommonModule, MatSelectModule, MatGridListModule
  ],
  templateUrl: './worksheet-edit.component.html',
  styleUrl: './worksheet-edit.component.css'
})
export class WorksheetEditComponent
{
  //#region declaration
  quote: any;
  wrkshts: any = [];
  worksheetItems: any = [];
  products: DS[] = [];
  notes: DS[] = [];
  manufacturers: Manufecturers[] = [];
  pdnis: DS[] = [];
  data: any;
  selectedManufacturer!: Manufecturers;
  existingLineItem!: WorksheetItems[];
  existingPDNIs!: Pdni[];
  existingWorkbookNotes!: WorkbookNotes[];
  worksheetId: string = "";
  takeoffId: string = "";

  showActionDiv: boolean = false;
  private changeListener: EventListenerOrEventListenerObject | null = null;
  @ViewChild('manufacturer') selectElement!: ElementRef;
  //#endregion

  //#region calculation
  detectChange(index: number, eve: Event)
  {
    var obj = eve.target as HTMLElement;
    if (obj.matches('#quantity, #listPrice, #tlpMultiplier, #net, #freight'))
    {
      this.calculate(index);
    }
  }

  detectCheckboxChange(index: number, eve: MatCheckboxChange)
  {
    if (!eve.checked)
    {
      this.calculate(index);
    }
  }

  number(value: any)
  {
    if (value === '' || isNaN(value))
    {
      return 0;
    }
    return parseFloat(value);
  }

  calculate(index: number): void
  {
    var group = this.getworksheetFormGroup(index);
    var lineItems = this.getLineItems(index);
    var listTotal = 0;
    var netTotal = 0;
    lineItems.controls.forEach((item) =>
    {
      const listPrice = parseFloat(item.get('listPrice')?.value || '0');
      const net = parseFloat(item.get('net')?.value || '0');

      // Calculate listTotal and netTotal
      listTotal += listPrice;
      netTotal += net;
    });
    group.patchValue({
      totalList: listTotal.toFixed(2),
      totalNet: netTotal.toFixed(2),
    });

    // Manufacturer and tlpMultiplier calculations
    let tlp = listTotal;
    if (this.selectedManufacturer.isFeatured)
    {
      tlp *= 1 + parseFloat(this.selectedManufacturer.tlp.toString());
    }

    group.patchValue({ total: tlp });
    const overrideMultiplier = group.get('override_tlpMultiplier')?.value;
    let tlpMultiplier = parseFloat(group.get('tlpMultiplier')?.value || '1');

    if (!overrideMultiplier)
    {
      tlpMultiplier = this.getMultiplier(listTotal);
      if (!this.selectedManufacturer.isFeatured)
      {
        tlpMultiplier = 1.0;
      }
      group.patchValue({ tlpMultiplier });
    }

    const tlpMultiplied = tlpMultiplier * tlp;
    group.patchValue({ subtotal: tlpMultiplied.toFixed(2), grandNet: netTotal.toFixed(2) });

    // Freight and quote calculations
    const freight = parseFloat(group.get('freight')?.value || '0');
    const userQuoteAmount = parseInt(group.get('userQuoteAmount')?.value || '0', 10);

    let ttl = tlpMultiplied + netTotal + freight;
    let quoteAmount = userQuoteAmount > 0
      ? this.CTH_round_nearest(userQuoteAmount, this.selectedManufacturer.isFeatured ? 25 : 5)
      : this.CTH_round_nearest(ttl * parseFloat(this.selectedManufacturer.ttl.toString()), this.selectedManufacturer.isFeatured ? 25 : 5);

    group.patchValue({
      grand: ttl.toFixed(2),
      quoteAmount: quoteAmount.toFixed(2),
    });
  }

  getMultiplier(listTotal: number): number
  {
    if (listTotal > 0 && listTotal <= 3000) return 0.5;
    if (listTotal > 3000 && listTotal <= 10000) return 0.42;
    if (listTotal > 10000 && listTotal <= 17000) return 0.4;
    if (listTotal > 17000 && listTotal <= 25000) return 0.38;
    if (listTotal > 25000 && listTotal <= 40000) return 0.36;
    if (listTotal > 40000) return 0.33;
    return 1.0;
  }
  // Assuming CTH_round_nearest is a separate function that rounds a number to the nearest value in the provided increment
  CTH_round_nearest(value: number, increment: number): number
  {
    const nearest = Math.round(value / increment) * increment;
    return nearest;
  }

  range(start: number, end: number): number[]
  {
    const result: number[] = [];
    for (let i = start; i <= end; i++)
    {
      result.push(i);
    }
    return result;
  }
  //#endregion
  constructor(
    private service: WorksheetsService,
    private takeoffService: TakeoffService,
    private productService: ProductService,
    private workbooknoteService: WorkbookNotesService,
    private manufacturerService: ManufecturersService,
    private builder: FormBuilder,
    private dataService: DataService,
    private pdniService: PdniService,
    private pdniWorksheetService: PdniWorksheetService,
    private worksheetItemService: WorksheetItemsService,
    private worksheetNotesService: WorkbookNotesWorksheetService
  )
  {
    this.data = this.dataService.getData();
    this.worksheetId = this.data.worksheetId ?? '';
    this.takeoffId = this.data.takeoffId ?? '';
    this.getManufacturer();
    this.getWorkbookNotes();
    this.getPDNIs();
    this.getTakeoff(this.takeoffId);
  }

  ngOnInit(): void
  {
    this.ensureOneFormWorksheet();
    this.ensureOneFormNotes();
    //this.calculate();
  }

  //#region MultiForms
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
      subtotal: [0],
      frieght: [0],
      grand: [0],
      quoteAmount: [0],
      pdniId: [''],
      comments: [''],
      specialNotes: [''],
      total: [0],
      grand_net: [0],
      tlpMultiplier: [0],
      wiId: [''],
      userQuoteAmount: [0],
      override_tlpMultiplier: [false],
      worksheetItems: this.builder.array([]),
      pdnis: this.builder.array([]),
    });
  }

  addWItem()
  {
    this.worksheets.push(this.newWorksheet());
    // Add an initial Line Item to the new Item Group
    this.addLineItem(this.worksheets.length - 1);
    this.addPItem(this.worksheets.length - 1);
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

  //#region LineItems
  // Getter for the nested FormArray: Line Items
  getLineItems(groupIndex: number): FormArray
  {
    return this.worksheets.at(groupIndex).get('worksheetItems') as FormArray;
  }

  // Add a Line Item to a specific Item Group
  addLineItem(groupIndex: number): void
  {
    const lineItem = this.builder.group({
      wiId: [''],
      listPrice: [0],
      quantity: [1],
      productId: [''],
      net: [0]
    });
    this.getLineItems(groupIndex).push(lineItem);
  }

  // Remove a Line Item from a specific Item Group
  removeLineItem(groupIndex: number, lineIndex: number): void
  {
    this.getLineItems(groupIndex).removeAt(lineIndex);
  }
  //#endregion

  //#region workbook notes

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
      updated_at: [''],
      noteId: ['']
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
    if (this.workbookNotes.length === 0)
    {
      this.addNItem();
    }
  }
  //#endregion

  //#region PDNIS
  // Getter for the nested FormArray: Line Items
  getWPDNI(groupIndex: number): FormArray
  {
    return this.worksheets.at(groupIndex).get('pdnis') as FormArray;
  }

  // Add a Line Item to a specific Item Group
  addPItem(groupIndex: number): void
  {
    const lineItem = this.builder.group({
      wiId: [''],
      pdniId: [''],
      worksheetId: [''],
      createdAt: [''],
      updatedAt: ['']
    });
    this.getWPDNI(groupIndex).push(lineItem);
  }

  // Remove a Line Item from a specific Item Group
  deletePItem(groupIndex: number, lineIndex: number): void
  {
    this.getWPDNI(groupIndex).removeAt(lineIndex);
  }
  //#endregion
  //#endregion

  saveWorksheet()
  {
    var sheets = this.worksheets.value;
    sheets.forEach((sheet: any, index: any) =>
    {
      var wId = crypto.randomUUID();
      var lineItems = this.getLineItems(index).controls.map(control =>
      ({
        id: crypto.randomUUID(),
        unit: control.get('unit')?.value ?? 0,
        quantity: control.get('quantity')?.value,
        listPrice: control.get('listPrice')?.value,
        net: control.get('net')?.value,
        worksheetId: this.worksheetId ?? wId,
        manufecturerId: sheet.manufacturerId,
        productId: control.get('productId')?.value,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString()
      }));

      var notes = this.workbookNotes.controls.map(control => ({
        id: crypto.randomUUID(),
        workbookNoteId: control.get('workbookNoteId')?.value,
        worksheetId: this.worksheetId ?? wId
      }));

      var pdnis = this.getWPDNI(index).controls.map(control => ({
        id: crypto.randomUUID(),
        pdniId: control.get('pdniId')?.value,
        worksheetId: this.worksheetId ?? wId
      }));
      var wsheet = {
        id: this.worksheetId ?? wId,
        takeoffId: this.takeoffId,
        tlpMultiplier: sheet.tlpMultiplier ?? 0,
        overrideMultipler: sheet.overrideMultipler,
        manufacturerId: sheet.manufacturerId,
        freight: sheet.freight ?? 0,
        quoteAmount: sheet.quoteAmount,
        userQuoteAmount: sheet.userQuoteAmount,
        comments: sheet.comments,
        jobSpecificNotes: sheet.jobSpecificNotes,
        createdBy: sessionStorage.getItem('UserId') ?? '',
        createdAt: new Date().toDateString(),
        updatedBy: sessionStorage.getItem('UserId') ?? '',
        updatedAt: new Date().toDateString(),
        worksheetItems: lineItems,
        pdniWorksheets: pdnis,
        workbookNotes: notes
      }
      this.service.createWorksheetss(wsheet).subscribe(
        (result) =>
        {
          if (result)
          {

          }
        },
        (error) => { }
      );
    });
  }

  worksheetSubmit() { }

  noteSubmit() { }

  getManufacturer()
  {
    this.manufacturerService.getManufacturer().subscribe(
      (result) =>
      {
        this.manufacturers = result;
        //          result.map(item => ({ value: item.id, viewValue: `${item.name}` }));
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

  onSelectionChange(event: MatSelectChange)
  {
    //const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(event);
    this.selectedManufacturer = event.value;
    this.getProducts(event.value.id);
  }
}
