import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId, formatTakeoff } from './event-utils';
import { TakeoffService } from '../../services/takeoff.service';
import { EventInput } from '@fullcalendar/core';
import { DataService } from '../../services/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FullCalendarModule]
})
export class CalendarComponent
{
  calendarVisible = signal(true);
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridWeek',
    events: this.getTakeoffs.bind(this), // alternatively, use the `events` setting to fetch from a feed
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventMouseEnter: this.handleEventMouseEnter.bind(this), // Bind 'this'
    eventMouseLeave: this.handleEventMouseLeave.bind(this)
    //eventRender: function (event, element, view)
    //{
    //  var title = element.find('.fc-title');
    //  title.html(title.text());
    //}
    //eventContent: function (arg)
    //{
    //  return this.renderer.createComponent(arg.el, EventContentComponent, {
    //    event: arg.event,
    //  });
    //}
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents = signal<EventApi[]>([]);
  takeoffs: EventInput[] = [];
  safePopupContent: SafeHtml = "";

  popupVisible = false;
  popupTop = 0;
  popupLeft = 0;
  popupContent = '';
  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private service: TakeoffService,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  )
  {
    sessionStorage.setItem('SiteSettingId', 'c43f04d9-e1be-4c7b-9fc6-fbfb49182f43');
    sessionStorage.setItem('EmailAccountsId', '22f94c83-b443-44ff-8f5d-094abb755a2a');
    sessionStorage.setItem('UserId', 'd42b8a53-790a-4817-852d-c7d0ded46fa6');
    sessionStorage.setItem('CompanyId', '22f94c83-b443-44ff-8f5d-094abb755a2a');
    sessionStorage.setItem('Prefix_Takeoff', 'T');
    sessionStorage.setItem('Prefix_Quote', 'Q');
  }

  eventRender(e: any) { e.el.querySelectorAll('.fc-title')[0].innerHTML = e.el.querySelectorAll('.fc-title')[0].innerText; }

  async getTakeoffs(): Promise<EventInput[]>
  {
    return new Promise<EventInput[]>((resolve) =>
    {
      this.service.getTakeoff().subscribe(
        (result) =>
        {
          this.takeoffs = formatTakeoff(result);
          let events: EventInput[] = this.takeoffs;
          //this.calendarOptions.events = this.takeoffs;
          resolve(events);
        },
        error => console.error(error));
    });
  }

  handleEventMouseEnter(info: any)
  {
    this.safePopupContent = this.sanitizer.bypassSecurityTrustHtml(info.event.extendedProps['description'] || 'No description');
    this.popupTop = info.el.getBoundingClientRect().top - 30; // Adjust position
    this.popupLeft = info.el.getBoundingClientRect().left - 250;
    this.popupVisible = true;
  }

  handleEventMouseLeave(info: any)
  {
    this.popupVisible = false;
  }

  handleCalendarToggle()
  {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle()
  {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg)
  {
    this.dataService.setData({ dueDate: selectInfo.start });
    this.router.navigate(['takeoffs']);
  }

  handleEventClick(clickInfo: EventClickArg)
  {
    var takeoffId = clickInfo.event.id;
    this.dataService.setData({ id: takeoffId });
    this.router.navigate(['takeoffs']);
  }

  handleEvents(events: EventApi[])
  {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
