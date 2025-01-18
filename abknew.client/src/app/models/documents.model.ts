export interface Documents
{
  id: string,
  section: string,
  sectionId: string,
  file?: File,
  filename: string,
  createdAt: string,
  type: string,
  size?: number
}
