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
    //<b>Usercode: </b> ${item.u}</br >

    takeoffs.push({
      id: item.id,
      title: `${item.takeoffId} / ${item.quoteId}\n${item.jobName}`,
      start: formatDate(item.dueDate, 'yyyy-MM-dd', "en-US"),
      extendedProps: {
        description: `<div>
          <b>Takeoff ID:</b> ${item.takeoffId}</br>
          <b>QuoteID:</b> ${item.quoteId}</br>
          <b>Job Name:</b> ${item.jobName}</div>
          <b>Job Address:</b> ${item.jobAddress}</br>
          <b>Created Date:</b> ${item.createDate}</br>
          <b>Due Date:</b> ${item.dueDate}</br>
          <b>Salesman:</b> ${item.salesman}</br>
          <b>Engineer:</b> ${item.engineer}</br>
          <b>Architect:</b> ${item.architect}</br>
          <b>Specs:</b> ${item.specification}</br>
          <b>Bidder:</b> ${item.bidder}</br>
          <b>Drwng Date:</b> ${item.drawingDate}</br>
          <b>Revise Date:</b> ${item.revisedDate}</br>
          <b>Drwng Rcvd Date:</b> ${item.drawingRCVDFrom}</br>
          <b>Takeoff Comment:</b> ${item.comments}</br>
          <b>GC List:</b></br>`,
        takeoff: item
      }
//        formatDate(item.dueDate, 'yyyy-MM-dd', "en-US")
        //new Date(item.dueDate).toISOString()
    })
  }

  return takeoffs;
}

export function objectContainsSearchString(obj: any, searchString: string): boolean
{
  if (!obj || typeof obj !== 'object' || !searchString)
  {
    return false; // Handle null, non-objects, or empty search strings
  }

  const lowerCaseSearchString = searchString.toLowerCase();

  return Object.values(obj).some(value =>
  {
    if (typeof value === 'string')
    {
      return value.toLowerCase().includes(lowerCaseSearchString);
    } else if (typeof value === 'number')
    {
      return value.toString().includes(lowerCaseSearchString);
    }
    return false; // Ignore non-string/number values
  });
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
