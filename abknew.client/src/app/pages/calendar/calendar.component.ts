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
    private service: TakeoffService
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
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`))
    {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[])
  {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
