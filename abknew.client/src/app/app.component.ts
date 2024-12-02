import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent
{
  collapsed = signal(false);

  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}
