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
    initialView: 'dayGridMonth',
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
  ;
  currentEvents = signal<EventApi[]>([]);
  takeoffs: EventInput[] = [];
  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private service: TakeoffService,
    private dataService: DataService
  )
  {
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
    this.router.navigate(['takeoffs']);
    //const title = prompt('Please enter a new title for your event');
    //const calendarApi = selectInfo.view.calendar;

    //calendarApi.unselect(); // clear date selection

    //if (title)
    //{
    //  calendarApi.addEvent({
    //    id: createEventId(),
    //    title,
    //    start: selectInfo.startStr,
    //    end: selectInfo.endStr,
    //    allDay: selectInfo.allDay
    //  });
    //}
  }

  handleEventClick(clickInfo: EventClickArg)
  {
    var title = clickInfo.event.title;
    var takeoffId = "";
    this.dataService.setData({ id: takeoffId });
    this.router.navigate(['takeoffs']);
  }

  handleEvents(events: EventApi[])
  {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
