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
import { Takeoff } from '../../models/takeoffs.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-takeoffs',
  standalone: true,
  templateUrl: './takeoffs.component.html',
  styleUrl: './takeoffs.component.css',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSelectModule, CommonModule, MatExpansionModule, MatCardModule,
    MatDatepickerModule, MatNativeDateModule
  ]
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
  minDate: Date = new Date(1970, 1, 1);
  today: Date = new Date();

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
    this.statuses = [{
      value: 'Active',
      viewValue: 'Active'
    }, {
      value: 'Pending',
      viewValue: 'Pending'
    }];
    //this.getRoles();
    if (this.inputData?.id != undefined)
    {
      this.setPopupData(this.inputData.id);
    }
    else
    {
      this.myform.value.createDate = this.today.toString();
      this.myform.value.dueDate = this.inputData.dueDate;
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
    createDate: this.buildr.control(''),
    drawingDate: this.buildr.control(null),
    revisedDate: this.buildr.control(null),
    dueDate: this.buildr.control(null),
    quoteDate: this.buildr.control(null),
    salesmanId: this.buildr.control(''),
    engineerId: this.buildr.control(''),
    contractorId: this.buildr.control(''),
    architectId: this.buildr.control(''),
    bidderId: this.buildr.control(''),
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
    createdAt: this.buildr.control(null),
    deletedAt: this.buildr.control(null),
    updatedAt: this.buildr.control(null)
  });

  generateQuote()
  {
    if (this.inputData?.id != undefined)
    {
      if (this.myform.value.quoteId == null || this.myform.value.quoteId == "")
      {
        //item.quotedBy = sessionStorage.getItem("UserId");
        this.service.generateQuote(this.inputData?.id).subscribe(
          (result) =>
          {
            if (result)
              alert("Quote generated succesfully!");
            else
              alert("Quote not generated!")
          },
          (error) =>
          {
            console.error(error);
          }
        );
      }
      else
      {
        alert("Quote already created");
      }
    }
    else
    {
      alert("Please create takeoff first!");
    }
  }
  uploadFiles()
  {

    if (this.inputData?.id != undefined)
    {
      this.dataService.setData({ sectionId: this.inputData.id });
      this.router.navigate(['file-upload']);
    }
    else
    {
      alert("Please create takeoff first!");
    }
  }

  setPopupData(id: any)
  {
    this.service.getTakeoffById(id).subscribe(item =>
    {
      if (item != null)
      {
        this.editData = item;
        var obj = this.buildModel(this.editData);
        this.myform.setValue(obj);
      }
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
    else
      obj["takeoffId"] = "";

    if (data.quoteId && data.quoteId != "")
      obj["quoteId"] = data.quoteId;
    else
      obj["quoteId"] = "";

    if (data.bidderId && data.bidderId != "")
      obj["bidderId"] = data.bidderId;
    else
      obj["bidderId"] = "";

    if (data.createDate && data.createDate != "")
      obj["createDate"] = data.createDate;
    else
      obj["createDate"] = this.minDate;

    if (data.drawingDate && data.drawingDate != "")
      obj["drawingDate"] = data.drawingDate;
    else
      obj["drawingDate"] = this.minDate;

    if (data.revisedDate && data.revisedDate != "")
      obj["revisedDate"] = data.revisedDate;
    else
      obj["revisedDate"] = this.minDate;

    if (data.dueDate && data.dueDate != "")
      obj["dueDate"] = data.dueDate;
    else
      obj["dueDate"] = this.minDate;

    if (data.quoteDate && data.quoteDate != "")
      obj["quoteDate"] = data.quoteDate;
    else
      obj["quoteDate"] = this.minDate;

    if (data.salesmanId && data.salesmanId != "")
      obj["salesmanId"] = data.salesmanId;
    else
      obj["salesmanId"] = "";

    if (data.engineerId && data.engineerId != "")
      obj["engineerId"] = data.engineerId;
    else
      obj["engineerId"] = "";

    if (data.contractorId && data.contractorId != "")
      obj["contractorId"] = data.contractorId;
    else
      obj["contractorId"] = "";

    if (data.architectId && data.architectId != "")
      obj["architectId"] = data.architectId;
    else
      obj["architectId"] = "";

    if (data.specificationId && data.specificationId != "")
      obj["specificationId"] = data.specificationId;
    else
      obj["specificationId"] = "";

    if (data.jobName && data.jobName != "")
      obj["jobName"] = data.jobName;
    else
      obj["jobName"] = "";

    if (data.jobAddress && data.jobAddress != "")
      obj["jobAddress"] = data.jobAddress;
    else
      obj["jobAddress"] = "";

    if (data.comments && data.comments != "")
      obj["comments"] = data.comments;
    else
      obj["comments"] = "";

    if (data.worksheetGenerated && data.worksheetGenerated != "")
      obj["worksheetGenerated"] = data.worksheetGenerated;
    else
      obj["worksheetGenerated"] = "";

    if (data.pDFGenerated && data.pDFGenerated != "")
      obj["pDFGenerated"] = data.pDFGenerated;
    else
      obj["pDFGenerated"] = "";

    if (data.amount && data.amount != "")
      obj["amount"] = data.amount;
    else
      obj["amount"] = "";

    if (data.originalQuote && data.originalQuote != "")
      obj["originalQuote"] = data.originalQuote;
    else
      obj["originalQuote"] = "";

    if (data.quoteEntered && data.quoteEntered != "")
      obj["quoteEntered"] = data.quoteEntered;
    else
      obj["quoteEntered"] = "";

    if (data.createdBy && data.createdBy != "")
      obj["createdBy"] = data.createdBy;
    else
      obj["createdBy"] = "";

    if (data.quotedBy && data.quotedBy != "")
      obj["quotedBy"] = data.quotedBy;
    else
      obj["quotedBy"] = "";

    if (data.quoteComments && data.quoteComments != "")
      obj["quoteComments"] = data.quoteComments;
    else
      obj["quoteComments"] = "";

    if (data.status && data.status != "")
      obj["status"] = data.status;
    else
      obj["status"] = "";

    if (data.revActive && data.revActive != "")
      obj["revActive"] = data.revActive;
    else
      obj["revActive"] = "";

    if (data.projectNumber && data.projectNumber != "")
      obj["projectNumber"] = data.projectNumber;
    else
      obj["projectNumber"] = "";

    if (data.vibroLayIn && data.vibroLayIn != "")
      obj["vibroLayIn"] = data.vibroLayIn;
    else
      obj["vibroLayIn"] = "";

    if (data.drawingRCVDFrom && data.drawingRCVDFrom != "")
      obj["drawingRCVDFrom"] = data.drawingRCVDFrom;
    else
      obj["drawingRCVDFrom"] = "";

    if (data.quoteOut && data.quoteOut != "")
      obj["quoteOut"] = data.quoteOut;
    else
      obj["quoteOut"] = "";

    if (data.submittalDoneBy && data.submittalDoneBy != "")
      obj["submittalDoneBy"] = data.submittalDoneBy;
    else
      obj["submittalDoneBy"] = "";

    if (data.quoteRevision && data.quoteRevision != "")
      obj["quoteRevision"] = data.quoteRevision;
    else
      obj["quoteRevision"] = "";

    if (data.originalQuoteId && data.originalQuoteId != "")
      obj["originalQuoteId"] = data.originalQuoteId;
    else
      obj["originalQuoteId"] = "";

    if (data.deletedAt && data.deletedAt != "")
      obj["deletedAt"] = data.deletedAt;
    else
      obj["deletedAt"] = null;

    if (data.createdAt && data.createdAt != "")
      obj["createdAt"] = data.createdAt;
    else
      obj["createdAt"] = null;

    if (data.updatedAt && data.updatedAt != "")
      obj["updatedAt"] = data.updatedAt;
    else
      obj["updatedAt"] = null;

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
