import type { PageComponent } from '@interfaces/page';
import { route } from '@/utils/router';
import { renderer, DOMElement } from '@/utils';
import { api } from '@/api/_api';

interface User {
  name: string;
  email: string;
}

interface FileUploadResponse {
  url: string;
  filename: string;
}

interface CustomData {
  id: number;
  title: string;
}

export default class HomePage extends DOMElement implements PageComponent {
  private userForm!: DOMElement;
  private fileForm!: DOMElement;
  private fetchButton!: DOMElement;
  private userResult!: DOMElement;
  private uploadResult!: DOMElement;
  private dataResult!: DOMElement;

  constructor() {
    super(document.createElement('div'));
    console.log('Home Page loaded');
    this.initializeElements();
    this.render();
  }

  private initializeElements() {
    // Create user form
    this.userForm = new DOMElement(document.createElement('form'))
      .setClass('mb-8 p-4 bg-white rounded shadow')
      .add(
        new DOMElement(document.createElement('h2')).setTextContent('Create User'),
        new DOMElement(document.createElement('input'))
          .setType('text')
          .setId('userName')
          .setPlaceholder('Name')
          .setRequired(true),
        new DOMElement(document.createElement('input'))
          .setType('email')
          .setId('userEmail')
          .setPlaceholder('Email')
          .setRequired(true),
        new DOMElement(document.createElement('button'))
          .setType('submit')
          .setTextContent('Submit User')
      );
    this.userResult = new DOMElement(document.createElement('div')).setId('userResult');

    // Create file upload form
    this.fileForm = new DOMElement(document.createElement('form'))
      .setClass('mb-8 p-4 bg-white rounded shadow')
      .add(
        new DOMElement(document.createElement('h2')).setTextContent('Upload File'),
        new DOMElement(document.createElement('input'))
          .setType('file')
          .setId('fileInput'),
        new DOMElement(document.createElement('button'))
          .setType('submit')
          .setTextContent('Upload')
      );
    this.uploadResult = new DOMElement(document.createElement('div')).setId('uploadResult');

    // Create fetch data button
    this.fetchButton = new DOMElement(document.createElement('button'))
      .setClass('mb-4 px-4 py-2 bg-blue-500 text-white rounded')
      .setTextContent('Fetch Data');
    this.dataResult = new DOMElement(document.createElement('div')).setId('dataResult');

    // Set up event handlers
    this.setupEventHandlers();
  }

  private setupEventHandlers() {
    // User form submission
    this.userForm.onSubmit(async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('userName') as HTMLInputElement;
      const emailInput = document.getElementById('userEmail') as HTMLInputElement;

      try {
        const response = await api.post<User>('/users', {
          name: nameInput.value,
          email: emailInput.value
        });

        if (response.error) {
          this.userResult.setTextContent(`Error: ${response.error}`);
          return;
        }

        this.userResult.setTextContent(`User created: ${response.data?.name}`);
        this.userForm.reset();
      } catch (error) {
        this.userResult.setTextContent('Failed to create user');
      }
    });

    // File upload form submission
    this.fileForm.onSubmit(async (e) => {
      e.preventDefault();
      const fileInput = document.getElementById('fileInput') as HTMLInputElement;

      if (!fileInput.files?.length) {
        this.uploadResult.setTextContent('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', fileInput.files[0]);

      try {
        const response = await api.formData<FileUploadResponse>('/upload', formData);

        if (response.error) {
          this.uploadResult.setTextContent(`Error: ${response.error}`);
          return;
        }

        this.uploadResult.setTextContent(`File uploaded: ${response.data?.filename}`);
        this.fileForm.reset();
      } catch (error) {
        this.uploadResult.setTextContent('Failed to upload file');
      }
    });

    // Fetch data button click
    this.fetchButton.onClick(async () => {
      try {
        const response = await api.get<CustomData>('/data', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          timeout: 5000
        });

        if (response.error) {
          this.dataResult.setTextContent(`Error: ${response.error}`);
          return;
        }

        this.dataResult.setTextContent(`Received data: ${JSON.stringify(response.data)}`);
      } catch (error) {
        this.dataResult.setTextContent('Failed to fetch data');
      }
    });
  }

  private render() {
    this.setClass('min-h-screen bg-gray-100 p-8')
      .add(
        new DOMElement(document.createElement('h1'))
          .setClass('text-3xl font-bold mb-8')
          .setTextContent('Welcome Home'),
        this.userForm,
        this.userResult,
        new DOMElement(document.createElement('hr')).setClass('my-8'),
        this.fileForm,
        this.uploadResult,
        new DOMElement(document.createElement('hr')).setClass('my-8'),
        this.fetchButton,
        this.dataResult,
        new DOMElement(document.createElement('button'))
          .setClass('mt-8 px-4 py-2 bg-red-500 text-white rounded')
          .setTextContent('Logout')
          .onClick(this.handleLogout)
      );
    renderer.render(this);
  }

  private handleLogout = () => {
    route('/login');
  }

  dispose() {
    console.log('Home Page disposed');
    renderer.render(null);
  }
}