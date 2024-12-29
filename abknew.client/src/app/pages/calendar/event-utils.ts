import { EventInput } from '@fullcalendar/core';
import { TakeoffService } from '../../services/takeoff.service';
import { Takeoff } from '../../models/takeoffs.model';
import { formatDate } from '@angular/common';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
let service = TakeoffService;

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}

export function formatTakeoff(obj: Takeoff[])
{
  let takeoffs: EventInput[] = [];
  for (let item of obj)
  {
    takeoffs.push({
      id: item.id,
      title: `<div><b>Takeoff ID:</b> ${item.takeoffId}</br><b>QuoteID:</b> ${item.quoteId}</br><b>Job Name:</b> ${item.jobName}</div>`,
      start: formatDate(item.dueDate, 'yyyy-MM-dd', "en-US")
//        formatDate(item.dueDate, 'yyyy-MM-dd', "en-US")
        //new Date(item.dueDate).toISOString()
    })
  }

  return takeoffs;
}



function parseDate(dateString: any): Date | string | null{
  if (!dateString) return null;
  if (typeof dateString === 'string')
  {
    const date = new Date(dateString);
    if (isNaN(date.getTime()))
    {
      console.error("Invalid date string", dateString);
      return null;
    }
    return date;
  }
  return dateString;
}
