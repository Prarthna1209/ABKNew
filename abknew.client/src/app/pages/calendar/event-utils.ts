import { EventInput } from '@fullcalendar/core';
import { TakeoffService } from '../../services/takeoff.service';
import { Takeoff } from '../../models/takeoffs.model';

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
      title: `Takeoff ID: ${item.takeoffId}</br>QuoteID: ${item.quoteId}</br>Job Name: ${item.jobName}`,
      start: new Date(item.dueDate).toISOString()
    })
  }

  return takeoffs;
}
