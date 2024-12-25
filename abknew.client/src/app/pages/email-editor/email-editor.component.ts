import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AccessibilityHelp, Alignment, Autoformat, AutoImage, Autosave, BalloonToolbar, BlockQuote, BlockToolbar, Bold, ClassicEditor, CloudServices, EditorConfig, Essentials, FullPage, GeneralHtmlSupport, Heading, HtmlComment, HtmlEmbed, ImageBlock, ImageInline, ImageInsert, ImageInsertViaUrl, ImageResize, ImageStyle, ImageToolbar, ImageUpload, Indent, IndentBlock, Italic, Link, List, ListProperties, Paragraph, SelectAll, ShowBlocks, SimpleUploadAdapter, SourceEditing, Strikethrough, Table, TableCaption, TableCellProperties, TableColumnResize, TableProperties, TableToolbar, TextPartLanguage, TextTransformation, Title, TodoList, Underline, Undo } from 'ckeditor5';
import { DataService } from '../../services/data.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { EmailTemplateServie } from '../../services/email-templates.service';
import { MaterialModule } from '../../material/material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

const QuoteMail = ['{{logo}}', '{{company_address}}', '{{company_phone}}', '{{company_fax}}',
  '{{company_website}}', '{{company_email}}', '{{project_name}}', '{{project_address}}',
  '{{plan_date}}', '{{quote_number}}', '{{quote_date}}', '{{user_code}}',
  '{{engineer}}', '{{architect}}', '{{quote_rows}}', '{{quote_notes}}', '{{company_name}}'
];
const ProductLine = ['{{quantity}}', '{{product_name}}', '{{list_price}}',
  '{{net}}', '{{multiplied_price}}'];

const ManufacturerLine = ['{{manufacturer}}', '{{quoted_amount}}', '{{product_line_items}}',
  '{{pdni}}', '{{quote_special_notes}}'
];
const BiddeQuoteMail = ['{{quote}}', '{{drawing_date}}', '{{job_name}}', '{{job_address}}',
  '{{engineer}}', '{{user_code}}', '{{estimator}}', '{{regards}}',
  '{{bidder_name}}', '{{company_name}}', '{{company_address}}', '{{company_email}}'
];
const NewTakeOffMail = ['{{takeoff_id}}', '{{date_entered}}', '{{salesman}}', '{{user_code}}',
  '{{engineer}}', '{{architect}}', '{{job_name}}', '{{job_address}}',
  '{{drawing_date}}', '{{revised_date}}', '{{due_date}}', '{{specifications}}',
  '{{drawing_revised_from}}', '{{list_of_bidders}}', '{{comments}}', '{{regards}}',
  '{{project_number}}', '{{list_of_gc}}'
];
const InventoryReorderMail = ['{{logo}}', '{{company_address}}', '{{company_phone}}',
  '{{company_name}}', '{{location_name}}', '{{company_email}}', '{{company_name}}',
  '{{item_name}}'
];

@Component({
  selector: 'app-email-editor',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule, CommonModule, CKEditorModule, DragDropModule],
  templateUrl: './email-editor.component.html',
  styleUrl: './email-editor.component.css',
  encapsulation: ViewEncapsulation.None,
})

export class EmailEditorComponent
{
  objectMap: { [key: string]: any } = {
    QuoteMail,
    ProductLine,
    ManufacturerLine,
    BiddeQuoteMail,
    NewTakeOffMail,
    InventoryReorderMail
  };

  constructor(private changeDetector: ChangeDetectorRef,
    private router: Router,
    private dataService: DataService,
    private buildr: FormBuilder,
    private service: EmailTemplateServie) { }

  data = this.dataService.getData();
  htmlTemplate = this.data.htmlTemplate;
  textTemplate = this.data.textTemplate;
  subject = this.data.subject;
  name = this.data.name;
  mailable = this.data.mailable;
  mailableFull = this.data.mailableFull;
  templateVars = this.objectMap[this.mailable] ?? [];
  public editorData: string = '';
  editorInstance: any;

  myform = this.buildr.group({
    id: this.buildr.control(''),
    name: this.buildr.control(''),
    mailable: this.buildr.control(''),
    subject: this.buildr.control(''),
    htmlTemplate: this.buildr.control(''),
    textTemplate: this.buildr.control(''),
    updated_at: this.buildr.control(''),
    created_at: this.buildr.control('')
  });

  // Capture the editor instance
  onReady(editor: any)
  {
    this.editorInstance = editor;
  }

  public isLayoutReady = false;
  public Editor = ClassicEditor;
  public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
  public ngAfterViewInit(): void
  {
    this.config = {
      toolbar: {
        items: [
          'undo',
          'redo',
          '|',
          'sourceEditing',
          'showBlocks',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'link',
          'insertImage',
          'insertTable',
          'htmlEmbed',
          '|',
          'alignment',
          '|',
          'bulletedList',
          'numberedList',
          'todoList',
          'outdent',
          'indent'
        ],
        shouldNotGroupWhenFull: false
      },
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        Autosave,
        BalloonToolbar,
        BlockToolbar,
        Bold,
        CloudServices,
        Essentials,
        GeneralHtmlSupport,
        HtmlComment,
        HtmlEmbed,
        ImageBlock,
        ImageInline,
        ImageInsert,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        List,
        ListProperties,
        Paragraph,
        SelectAll,
        ShowBlocks,
        SimpleUploadAdapter,
        SourceEditing,
        Strikethrough,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo
      ],
      balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
      blockToolbar: ['bold', 'italic', '|', 'link', 'insertImage', 'insertTable', '|', 'bulletedList', 'numberedList', 'outdent', 'indent'],
      htmlSupport: {
        allow: [
          {
            name: /^.*$/,
            styles: true,
            attributes: true,
            classes: true
          }
        ]
      },
      image: {
        toolbar: ['imageTextAlternative', '|', 'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|', 'resizeImage']
      },
      initialData: this.htmlTemplate,
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: 'https://',
        decorators: {
          toggleDownloadable: {
            mode: 'manual',
            label: 'Downloadable',
            attributes: {
              download: 'file'
            }
          }
        }
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true
        }
      },
      placeholder: 'Type or paste your content here!',
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
      }
    };

    this.isLayoutReady = true;
    this.changeDetector.detectChanges();

    this.myform.setValue({
      id: this.data.id,
      name: this.name,
      mailable: this.mailableFull,
      subject: this.subject,
      htmlTemplate: this.htmlTemplate,
      textTemplate: this.textTemplate,
      updated_at: this.data.updated_at || '',
      created_at: this.data.created_at || ''
    })
  }

  public plainText: string = '';
  public htmlText: string = '';
  // Method to extract plain text and HTML content
  getContent()
  {
    // Get HTML content
    this.htmlText = this.editorInstance.getData();

    // Get plain text by removing HTML tags
    const div = document.createElement('div');
    div.innerHTML = this.htmlText;
    this.plainText = div.textContent || div.innerText || '';
  }

  // Drag event handlers
  onDragStart(event: DragEvent, label: string)
  {
    event.dataTransfer?.setData('text/plain', label);
  }

  onDrop(event: DragEvent, editorElement: any)
  {
    event.preventDefault();
    const text = event.dataTransfer?.getData('text/plain');
    if (text)
    {
      // Insert the dragged text into the CKEditor instance
      const editorInstance = editorElement.editorInstance;
      const selection = editorInstance.model.document.selection;
      editorInstance.model.change((writer: { insertText: (arg0: string, arg1: any) => void; }) =>
      {
        writer.insertText(text, selection.getFirstPosition());
      });
    }
  }

  onDragOver(event: DragEvent)
  {
    event.preventDefault(); // Necessary to allow drop
  }

  updateTemplate()
  {
    this.getContent();
    var item = {
      id: this.data.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      name: this.name,
      subject: this.myform.value.subject || '',
      mailable: this.mailableFull,
      htmlTemplate: this.htmlText || '',
      textTemplate: this.plainText || ''
    };

    this.service.updateEmailTemplatess(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Email template updated successfully!");
        }
        else
        {
          alert("Email template not updated!");
        }
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  cancel()
  {
    this.router.navigate(['emailtemplate']);
  }
}
