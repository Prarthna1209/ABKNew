import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { TakeoffsComponent } from './pages/takeoffs/takeoffs.component';
import { JobAwardedComponent } from './pages/job-awarded/job-awarded.component';
import { UsersComponent } from './pages/users/users.component';
import { EmailTemplatesComponent } from './pages/email-templates/email-templates.component';
import { LogsComponent } from './pages/logs/logs.component';
import { ArchitectComponent } from './pages/DMP/architect/architect.component';
import { BidderComponent } from './pages/DMP/bidder/bidder.component';
import { EngineersComponent } from './pages/DMP/engineers/engineers.component';
import { ContractorComponent } from './pages/DMP/contractor/contractor.component';
import { PmComponent } from './pages/DMP/pm/pm.component';
import { ManufacturerComponent } from './pages/DMP/manufacturer/manufacturer.component';
import { SpecificationsComponent } from './pages/DMP/specifications/specifications.component';
import { PdniComponent } from './pages/DMP/pdni/pdni.component';
import { WorkbookNotesComponent } from './pages/DMP/workbook-notes/workbook-notes.component';
import { ShippingItemComponent } from './pages/DMP/shipping-item/shipping-item.component';
import { TaxesComponent } from './pages/DMP/taxes/taxes.component';
import { GeneralSettingsComponent } from './pages/settings/general-settings/general-settings.component';
import { ThemeComponent } from './pages/settings/theme/theme.component';
import { SmtpComponent } from './pages/settings/smtp/smtp.component';
import { UpsApiComponent } from './pages/settings/ups-api/ups-api.component';
import { ApiComponent } from './pages/settings/api/api.component';
import { EmailAccountsComponent } from './pages/settings/email-accounts/email-accounts.component';
import { PrefixComponent } from './pages/settings/prefix/prefix.component';
import { ManageDataComponent } from './pages/settings/manage-data/manage-data.component';
import { DMPComponent } from './pages/DMP/dmp.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { ViewFollowupsComponent } from './pages/quotes/view-followups/view-followups.component';
import { ViewQuotesComponent } from './pages/quotes/view-quotes/view-quotes.component';
import { PendingTakeoffsComponent } from './pages/quotes/pending-takeoffs/pending-takeoffs.component';
import { CreateComponent } from './pages/users/create/create.component';
import { ShippingsComponent } from './pages/DMP/shippings/shippings.component';
import { EmailEditorComponent } from './pages/email-editor/email-editor.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'calendar'
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'takeoffs',
    component: TakeoffsComponent
  },
  {
    path: 'DMP',
    children: [{
      path: 'architect',
      component: ArchitectComponent
    },
    {
      path: 'bidder',
      component: BidderComponent
    },
    {
      path: 'engineers',
      component: EngineersComponent
    },
    {
      path: 'contractor',
      component: ContractorComponent
    },
    {
      path: 'pm',
      component: PmComponent
    },
    {
      path: 'manufacturer',
      component: ManufacturerComponent
    },
    {
      path: 'specifications',
      component: SpecificationsComponent
    },
    {
      path: 'pdni',
      component: PdniComponent
    },
    {
      path: 'workbook-notes',
      component: WorkbookNotesComponent
    },
    {
      path: 'shipping/TO',
      component: ShippingsComponent
    },
    {
      path: 'shipping/VIA',
      component: ShippingsComponent
    },
    {
      path: 'shipping-item',
      component: ShippingItemComponent
    },
    {
      path: 'taxes',
      component: TaxesComponent
    }]
  }, {
    path: 'file-upload',
    component: FileUploadComponent
  },
  {
    path: 'jobawarded',
    component: JobAwardedComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'users/create',
    component: CreateComponent
  },
  {
    path: 'emailtemplate',
    component: EmailTemplatesComponent
  },
  {
    path:'email-editor',
    component: EmailEditorComponent
  },
  {
    path: 'logs',
    component: LogsComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [{
      path: 'general-settings',
      component: GeneralSettingsComponent
    },
    {
      path: 'theme',
      component: ThemeComponent
    },
    {
      path: 'smtp',
      component: SmtpComponent
    },
    {
      path: 'ups-api',
      component: UpsApiComponent
    },
    {
      path: 'api',
      component: ApiComponent
    },
    {
      path: 'email-accounts',
      component: EmailAccountsComponent
    },
    {
      path: 'prefix',
      component: PrefixComponent
    },
    {
      path: 'manage-data',
      component: ManageDataComponent
    }]
  },
  {
    path: 'quotes',
    component: QuotesComponent,
    children: [{
      path: 'view-followups',
      component: ViewFollowupsComponent
    },
    {
      path: 'view-quotes',
      component: ViewQuotesComponent
    },
    {
      path: 'pending-takeoff',
      component: PendingTakeoffsComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
