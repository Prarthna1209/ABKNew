import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../app/material/material.module';
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router'

// import { NgxEditorModule, Editor } from 'ngx-editor';
// import { schema } from 'ngx-editor/schema';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import{ AngularEditorModule} from '@kolkov/angular-editor';

import { CustomSidenavComponent } from './components/custom-sidenav/custom-sidenav.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { TakeoffsComponent } from './pages/takeoffs/takeoffs.component';
import { JobAwardedComponent } from './pages/job-awarded/job-awarded.component';
import { UsersComponent } from './pages/users/users.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ShippingItemComponent } from './pages/DMP/shipping-item/shipping-item.component';
import { TaxesComponent } from './pages/DMP/taxes/taxes.component';
import { WorkbookNotesComponent } from './pages/DMP/workbook-notes/workbook-notes.component';
import { PdniComponent } from './pages/DMP/pdni/pdni.component';
import { SpecificationsComponent } from './pages/DMP/specifications/specifications.component';
import { ManufacturerComponent } from './pages/DMP/manufacturer/manufacturer.component';
import { PmComponent } from './pages/DMP/pm/pm.component';
import { ContractorComponent } from './pages/DMP/contractor/contractor.component';
import { EngineersComponent } from './pages/DMP/engineers/engineers.component';
import { BidderComponent } from './pages/DMP/bidder/bidder.component';
import { ArchitectComponent } from './pages/DMP/architect/architect.component';
import { ManageDataComponent } from './pages/settings/manage-data/manage-data.component';
import { PrefixComponent } from './pages/settings/prefix/prefix.component';
import { EmailAccountsComponent } from './pages/settings/email-accounts/email-accounts.component';
import { ApiComponent } from './pages/settings/api/api.component';
import { UpsApiComponent } from './pages/settings/ups-api/ups-api.component';
import { SmtpComponent } from './pages/settings/smtp/smtp.component';
import { ThemeComponent } from './pages/settings/theme/theme.component';
import { GeneralSettingsComponent } from './pages/settings/general-settings/general-settings.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { DMPComponent } from './pages/DMP/dmp.component';
import { PopupComponent } from './pages/DMP/shipping-item/popup/popup.component';
import { TaxPopupComponent } from './pages/DMP/taxes/tax-popup/tax-popup.component';
import { ShippingsComponent } from './pages/DMP/shippings/shippings.component';
import { ShippingPopupComponent } from './pages/DMP/shippings/shipping-popup/shipping-popup.component';
import { ArchitectPopupComponent } from './pages/DMP/architect/architect-popup/architect-popup.component';
import { BidderPopupComponent } from './pages/DMP/bidder/bidder-popup/bidder-popup.component';
import { EngineerPopupComponent } from './pages/DMP/engineers/engineer-popup/engineer-popup.component';
import { ContractorPopupComponent } from './pages/DMP/contractor/contractor-popup/contractor-popup.component';
import { ManufacturerPopupComponent } from './pages/DMP/manufacturer/manufacturer-popup/manufacturer-popup.component';
import { PdniPopupComponent } from './pages/DMP/pdni/pdni-popup/pdni-popup.component';
import { PmPopupComponent } from './pages/DMP/pm/pm-popup/pm-popup.component';
import { SpecificationsPopupComponent } from './pages/DMP/specifications/specifications-popup/specifications-popup.component';
import { WorkbookNotesPopupComponent } from './pages/DMP/workbook-notes/workbook-notes-popup/workbook-notes-popup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmailEditorComponent } from './pages/email-editor/email-editor.component';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './pages/users/create/create.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { WorksheetEditComponent } from './pages/quotes/view-quotes/worksheet-edit/worksheet-edit.component';
import { ProductComponent } from './pages/DMP/manufacturer/product/product.component';
import { AddProductComponent } from './pages/DMP/manufacturer/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    TaxPopupComponent,
    ShippingPopupComponent,
    ArchitectPopupComponent,
    BidderPopupComponent,
    EngineerPopupComponent,
    ContractorPopupComponent,
    ManufacturerPopupComponent,
    PdniPopupComponent,
    PmPopupComponent,
    SpecificationsPopupComponent,
    WorkbookNotesPopupComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    MatSlideToggleModule,
    CommonModule,
    RouterOutlet,
    MaterialModule,
    MatTableModule,
    MatFormFieldModule,
    AngularEditorModule,
    FormsModule,

    CalendarComponent,
    CustomSidenavComponent,
    TakeoffsComponent,
    JobAwardedComponent,
    UsersComponent,
    LogsComponent,
    ShippingItemComponent,
    TaxesComponent,
    WorkbookNotesComponent,
    PdniComponent,
    SpecificationsComponent,
    ManufacturerComponent,
    PmComponent,
    ContractorComponent,
    EngineersComponent,
    BidderComponent,
    ArchitectComponent,
    ManageDataComponent,
    PrefixComponent,
    EmailAccountsComponent,
    ApiComponent,
    UpsApiComponent,
    SmtpComponent,
    ThemeComponent,
    GeneralSettingsComponent,
    MenuItemComponent,
    DMPComponent,
    ShippingsComponent,
    EmailEditorComponent,
    CreateComponent,
    ProductComponent,
    AddProductComponent,
    WorksheetEditComponent,
  ],
  providers: [
    MatInputModule,
    // { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
