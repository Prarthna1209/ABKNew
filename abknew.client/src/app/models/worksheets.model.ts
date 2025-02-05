import { WorksheetItems } from './worksheetItems.model';
import { PdniWorksheet } from './pdni-worksheet.model';
import { WorkbookNotesWorksheet } from './workbook-notes-worksheet.model';
export interface Worksheets
{
  id: string,
  takeoffId: string,
  tlpMultiplier: number,
  overrideMultipler: number,
  manufacturerId: string,
  freight: number,
  quoteAmount: number,
  userQuoteAmount: number,
  comments: string,
  jobSpecificNotes: string,
  updatedBy?: string,
  createdBy?: string,
  createdAt?: string,
  updatedAt?: string,
  worksheetItems?: WorksheetItems[],
  pdniWorksheets?: PdniWorksheet[],
  workbookNotes?: WorkbookNotesWorksheet[]
}
