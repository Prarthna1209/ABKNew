import { Component } from '@angular/core';
import { TakeoffService } from '../../services/takeoff.service';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { DS } from '../../models/DS.model';
import { ArchitectService } from '../../services/architect.service';
import { BidderService } from '../../services/bidder.service';
import { ContractorsService } from '../../services/contractors.service';
import { DataService } from '../../services/data.service';
import { EngineersService } from '../../services/engineers.service';
import { SpecificationsService } from '../../services/specifications.service';
import { UserService } from '../../services/user.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-takeoffs',
  standalone: true,
  templateUrl: './takeoffs.component.html',
  styleUrl: './takeoffs.component.css',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSelectModule, CommonModule, MatExpansionModule, MatCardModule]
})
export class TakeoffsComponent
{
  inputData: any = { header: 'Add Takeoff' };
  editData: any;
  selectedFiles: any;
  passwordVisible: boolean = false;
  statuses!: DS[];
  salespersons!: DS[];
  engineers!: DS[];
  architects!: DS[];
  specifications!: DS[];
  bidders!: DS[];
  contractors!: DS[];

  constructor(
    private buildr: FormBuilder,
    private service: TakeoffService,
    private dataService: DataService,
    private router: Router,
    private userService: UserService,
    private architectService: ArchitectService,
    private specificationService: SpecificationsService,
    private bidderService: BidderService,
    private contractorService: ContractorsService,
    private engineerService: EngineersService
  )
  {
    this.getSalespersons();
    this.getEngineers();
    this.getContractors();
    this.getArchitects();
    this.getBidders();
    this.getSpecifications();
  }

  getTakeoffs()
  {
    this.service.getTakeoff().subscribe(
      (result) =>
      {
        //this.salespersons = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  ngOnInit(): void
  {
    this.inputData = this.dataService.getData();
    //this.getRoles();
    if (this.inputData?.id != undefined)
    {
      this.setPopupData(this.inputData.id);
    }
    else
    {
      this.inputData = { header: 'Add Takeoff' };
    }
  }

  getSalespersons()
  {
    this.userService.getSalesPersons().subscribe(
      (result) =>
      {
        this.salespersons = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getEngineers()
  {
    this.engineerService.getEngineers().subscribe(
      (result) =>
      {
        this.engineers = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getContractors()
  {
    this.contractorService.getContractor().subscribe(
      (result) =>
      {
        this.contractors = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getArchitects()
  {
    this.architectService.getArchitectss().subscribe(
      (result) =>
      {
        this.architects = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getBidders()
  {
    this.bidderService.getBidders().subscribe(
      (result) =>
      {
        this.bidders = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getSpecifications()
  {
    this.specificationService.getSpecification().subscribe(
      (result) =>
      {
        this.specifications = result.map(item => ({ value: item.id, viewValue: `${item.name}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  onClickRevealPassword(event: any)
  {
    event.preventDefault();
    // Prevent revealing the password when enter button is pressed.
    if (event?.pointerType)
    {
      this.passwordVisible = !this.passwordVisible;
    }
  }

  selectFile(event: any)
  {
    this.selectedFiles = event.target.files;
  }

  cancel(): void
  {
    this.router.navigate(['takeoffs']);
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    takeoffId: this.buildr.control(''),
    quoteId: this.buildr.control(''),
    createdDate: this.buildr.control(''),
    drawingDate: this.buildr.control(''),
    revisedDate: this.buildr.control(''),
    dueDate: this.buildr.control(''),
    quoteDate: this.buildr.control(''),
    salesmanId: this.buildr.control(''),
    engineerId: this.buildr.control(''),
    contractorId: this.buildr.control(''),
    architectId: this.buildr.control(''),
    specificationId: this.buildr.control(''),
    jobName: this.buildr.control(''),
    jobAddress: this.buildr.control(''),
    comments: this.buildr.control(''),
    worksheetGenerated: this.buildr.control(''),
    pDFGenerated: this.buildr.control(''),
    amount: this.buildr.control(''),
    originalQuote: this.buildr.control(''),
    quoteEntered: this.buildr.control(''),
    createdBy: this.buildr.control(''),
    quotedBy: this.buildr.control(''),
    quoteComments: this.buildr.control(''),
    status: this.buildr.control(''),
    revActive: this.buildr.control(''),
    projectNumber: this.buildr.control(''),
    vibroLayIn: this.buildr.control(''),
    drawingRCVDFrom: this.buildr.control(''),
    quoteOut: this.buildr.control(''),
    submittalDoneBy: this.buildr.control(''),
    quoteRevision: this.buildr.control(''),
    originalQuoteId: this.buildr.control(''),
    createdAt: this.buildr.control(''),
    deletedAt: this.buildr.control(''),
    updatedAt: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getTakeoffById(id).subscribe(item =>
    {
      this.editData = item;
      var obj = this.buildModel(this.editData);
      this.myform.setValue(obj);
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
    {
      this.updateTakeoff(id);
    }
    else
    {
      this.saveItem();
    }
    this.cancel();
  }

  buildModel(data: any)
  {
    var obj: any = {};
    if (data.id && data.id != "")
      obj["id"] = data.id;
    if (data.takeoffId && data.takeoffId != "")
      obj["takeoffId"] = data.takeoffId;
    if (data.quoteId && data.quoteId != "")
      obj["quoteId"] = data.quoteId;
    if (data.createdDate && data.createdDate != "")
      obj["createdDate"] = data.createdDate;
    if (data.drawingDate && data.drawingDate != "")
      obj["drawingDate"] = data.drawingDate;
    if (data.revisedDate && data.revisedDate != "")
      obj["revisedDate"] = data.revisedDate;
    if (data.dueDate && data.dueDate != "")
      obj["dueDate"] = data.dueDate;
    if (data.quoteDate && data.quoteDate != "")
      obj["quoteDate"] = data.quoteDate;
    if (data.salesmanId && data.salesmanId != "")
      obj["salesmanId"] = data.salesmanId;
    if (data.engineerId && data.engineerId != "")
      obj["engineerId"] = data.engineerId;
    if (data.contractorId && data.contractorId != "")
      obj["contractorId"] = data.contractorId;
    if (data.architectId && data.architectId != "")
      obj["architectId"] = data.architectId;
    if (data.specificationId && data.specificationId != "")
      obj["specificationId"] = data.specificationId;
    if (data.jobName && data.jobName != "")
      obj["jobName"] = data.jobName;
    if (data.jobAddress && data.jobAddress != "")
      obj["jobAddress"] = data.jobAddress;
    if (data.comments && data.comments != "")
      obj["comments"] = data.comments;
    if (data.worksheetGenerated && data.worksheetGenerated != "")
      obj["worksheetGenerated"] = data.worksheetGenerated;
    if (data.pDFGenerated && data.pDFGenerated != "")
      obj["pDFGenerated"] = data.pDFGenerated;
    if (data.amount && data.amount != "")
      obj["amount"] = data.amount;
    if (data.originalQuote && data.originalQuote != "")
      obj["originalQuote"] = data.originalQuote;
    if (data.quoteEntered && data.quoteEntered != "")
      obj["quoteEntered"] = data.quoteEntered;
    if (data.createdBy && data.createdBy != "")
      obj["createdBy"] = data.createdBy;
    if (data.quotedBy && data.quotedBy != "")
      obj["quotedBy"] = data.quotedBy;
    if (data.quoteComments && data.quoteComments != "")
      obj["quoteComments"] = data.quoteComments;
    if (data.status && data.status != "")
      obj["status"] = data.status;
    if (data.revActive && data.revActive != "")
      obj["revActive"] = data.revActive;
    if (data.projectNumber && data.projectNumber != "")
      obj["projectNumber"] = data.projectNumber;
    if (data.vibroLayIn && data.vibroLayIn != "")
      obj["vibroLayIn"] = data.vibroLayIn;
    if (data.drawingRCVDFrom && data.drawingRCVDFrom != "")
      obj["drawingRCVDFrom"] = data.drawingRCVDFrom;
    if (data.quoteOut && data.quoteOut != "")
      obj["quoteOut"] = data.quoteOut;
    if (data.submittalDoneBy && data.submittalDoneBy != "")
      obj["submittalDoneBy"] = data.submittalDoneBy;
    if (data.quoteRevision && data.quoteRevision != "")
      obj["quoteRevision"] = data.quoteRevision;
    if (data.originalQuoteId && data.originalQuoteId != "")
      obj["originalQuoteId"] = data.originalQuoteId;
    if (data.deletedAt && data.deletedAt != "")
      obj["deletedAt"] = data.deletedAt;
    if (data.createdAt && data.createdAt != "")
      obj["createdAt"] = data.createdAt;
    if (data.updatedAt && data.updatedAt != "")
      obj["updatedAt"] = data.updatedAt;
    return obj;
  }

  updateTakeoff(id: any)
  {
    var item = this.buildModel(this.myform.value);
    this.service.updateTakeoff(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Takeoff updated successfully!");
        }
        else
        {
          alert("Takeoff not updated!");
        }
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  saveItem(): any
  {
    console.log(this.myform.value);
    var item = this.buildModel(this.myform.value);
    item.id = "";
    this.service.createTakeoff(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Takeoff created successfully!");
        }
        else
        {
          alert("Takeoff not created!");
        }
      },
      (error) =>
      {
        console.error(error);
        alert(error);
      }
    );
  }
}
