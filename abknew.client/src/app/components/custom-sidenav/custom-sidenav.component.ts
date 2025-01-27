import { Component, Input, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';

export type MenuItem = {
  icon: string;
  label: string;
  include?: boolean;
  route?: string;
  subItems?: MenuItem[];
};
@Component({
  selector: 'app-custom-sidenav',
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterModule,
    MenuItemComponent
  ]
})
export class CustomSidenavComponent
{
  username = "ABKNew User";

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean)
  {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: "date_range",
      label: "Home",
      route: "calendar",
      include: true
    }, {
      icon: "flight_takeoff",
      label: "Takeoffs",
      route: "takeoffs",
      include: false
    }, {
      icon: "request_quote",
      label: "Quotes",
      route: "quotes",
      include: true,
      subItems: [{
        icon: "airplane_ticket",
        label: "Pending Takeoffs",
        route: "pending-takeoff"
      }, {
        icon: "receipt_long",
        label: "View Quotes",
        route: "view-quotes"
      }, {
        icon: "phone_callback",
        label: "View Followups",
        route: "view-followups"
      }]
    }, {
      icon: "stars",
      label: "Job Awarded",
      route: "jobawarded",
      include: true
    }, {
      icon: "account_box",
      label: "Users",
      route: "users",
      include: true
    }, {
      icon: "markunread_mailbox",
      label: "Email Templates",
      route: "emailtemplate",
      include: true
    }, {
      icon: "dataset",
      label: "DMP",
      route: "DMP",
      include: true,
      subItems: [{
        icon: "architecture",
        label: "Architect DB",
        route: "architect"
      }, {
        icon: "currency_rupee",
        label: "Bidder DB",
        route: "bidder"
      }, {
        icon: "engineering",
        label: "Engineers DB",
        route: "engineers"
      }, {
        icon: "building",
        label: "Contractor DB",
        route: "contractor"
      }, {
        icon: "contact_emergency",
        label: "PM DB",
        route: "pm"
      }, {
        icon: "factory",
        label: "Manufacturer DB",
        route: "manufacturer"
      }, {
        icon: "settings_suggest",
        label: "Specifications DB",
        route: "specifications"
      }, {
        icon: "account_box",
        label: "PDNI DB",
        route: "pdni"
      }, {
        icon: "book",
        label: "Workbook Notes",
        route: "workbook-notes"
      }, {
        icon: "local_shipping",
        label: "Shipped To DB",
        route: "shipping/TO"
      }, {
        icon: "commute",
        label: "Shipped Via DB",
        route: "shipping/VIA"
      }, {
        icon: "money",
        label: "Taxes DB",
        route: "taxes"
      }, {
        icon: "iron",
        label: "Shipping Item DB",
        route: "shipping-item"
      }]
    }, {
      icon: "view_headline",
      label: "Logs",
      route: "logs",
      include: true
    }, {
      icon: "settings_applications",
      label: "Settings",
      route: "settings",
      include: true,
      subItems: [{
        icon: "settings",
        label: "General",
        route: "general-settings"
      }, {
        icon: "auto_awesome",
        label: "Theme",
        route: "theme"
      }, {
        icon: "contact_mail",
        label: "SMTP",
        route: "smtp"
      }, {
        icon: "settings_ethernet",
        label: "UPS API",
        route: "ups-api"
      }, {
        icon: "api",
        label: "API",
        route: "api"
      }, {
        icon: "mail_lock",
        label: "Email Accounts",
        route: "email-accounts"
      }, {
        icon: "tune",
        label: "Prefix",
        route: "prefix"
      }, {
        icon: "storage",
        label: "Manage Data",
        route: "manage-data"
      }]
    }
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
