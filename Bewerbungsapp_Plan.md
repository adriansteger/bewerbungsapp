# Bewerbungsapp Development Plan

## Overview

This document outlines the plan for developing the Bewerbungsapp, a job application management application.

## Requirements

*   Frontend: React
*   Backend: Node.js
*   Database: MongoDB
*   Documents: PDFs and DOCX
*   Document Generation: AI (OpenAI, Google Gemini, and Deepseek)
*   Authentication: JWT
*   UI Framework: Material UI
*   Domain: jobs.vernoh.com
*   Hosting: Self-hosted Plesk Server

## Architecture

```mermaid
graph TD
    subgraph Overall Architecture
        A[Frontend (React)] --> B(Backend (Node.js));
        B --> C(Database (MongoDB));
        B --> D[AI Document Generation (OpenAI, Gemini, Deepseek)];
        E[User] --> A;
        E --> B;
        F[Plesk Server] -- Hosts --> A;
        F -- Hosts --> B;
        G(jobs.vernoh.com) -- Domain --> F;
    end

    subgraph Frontend (React)
        A1[Material UI Components];
        A2[Application Form];
        A3[Overview Table];
        A4["+" Button];
        A5[Document Upload];
        A6[User Profile];
        A --> A1;
        A --> A2;
        A --> A3;
        A3 --> A4;
        A --> A5;
        A --> A6;
    end

    subgraph Backend (Node.js)
        B1[API Endpoints];
        B2[JWT Authentication];
        B3[Data Validation];
        B4[Document Storage];
        B5[AI Integration];
        B --> B1;
        B --> B2;
        B --> B3;
        B --> B4;
        B --> B5;
    end

    subgraph Database (MongoDB)
        C1[User Profiles Collection];
        C2[Application Data Collection];
        C3[Document Metadata Collection];
        C --> C1;
        C --> C2;
        C --> C3;
    end

    subgraph AI Document Generation
        D1[OpenAI API];
        D2[Google Gemini API];
        D3[Deepseek API];
        D --> D1;
        D --> D2;
        D --> D3;
    end
```

## Database Schema

*   **User Profiles Collection:**
    *   `userId`: unique identifier
    *   `firstName`: string
    *   `lastName`: string
    *   `email`: string
    *   `password`: string (hashed)
    *   `resume`: reference to document metadata
    *   `certificates`: array of references to document metadata
    *   `applicationLetters`: array of references to document metadata
*   **Application Data Collection:**
    *   `applicationId`: unique identifier
    *   `userId`: reference to user profile
    *   `applicationDate`: date
    *   `applyChannels`: array of strings (e.g., "Electronic", "Mail", "Personal", "Phone")
    *   `companyName`: string
    *   `companyAddress`: object (street, houseNumber, postOfficeBoxNumber, countryIsoCode, zip, city)
    *   `contactPerson`: string
    *   `companyEmailAndUrl`: object (email, url)
    *   `phone`: string
    *   `occupation`: string
    *   `appliedThroughRav`: boolean
    *   `workload`: string (e.g., "Fulltime", "Parttime")
    *   `interview`: boolean
    *   `applyStatus`: string (e.g., "Pending", "Employed", "Rejected")
*   **Document Metadata Collection:**
    *   `documentId`: unique identifier
    *   `userId`: reference to user profile
    *   `filename`: string
    *   `contentType`: string (e.g., "application/pdf", "application/docx")
    *   `size`: number (in bytes)
    *   `uploadDate`: date
    *   `storagePath`: string (path to the stored document)

## Development Process

1.  **Analyze Existing Codebase (api/, src/):**
    *   Examine the existing PHP code and determine if it can be migrated to the Node.js backend.
    *   Analyze the React components and identify areas for improvement and refactoring.
    *   Examine the existing database component (`AppDB.js`) and determine how it can be integrated with MongoDB.

2.  **Refactor Existing Code (PHP -> Node.js, Material UI, AppDB.js -> MongoDB):**
    *   Migrate relevant PHP code to Node.js.
    *   Refactor React components to use Material UI components.
    *   Integrate the existing database component (`AppDB.js`) with MongoDB.

3.  **Implement User Authentication (JWT):**
    *   Create user registration and login API endpoints.
    *   Implement JWT token generation and verification.
    *   Create middleware to protect API endpoints.

4.  **Design and Implement Database Schema:**
    *   Implement the MongoDB schema as defined above.

5.  **Develop API Endpoints (CRUD operations):**
    *   User profile management: create, read, update, delete.
    *   Application data management: create, read, update, delete.
    *   Document management: upload, download, delete, list.

6.  **Implement Frontend Components (Form, Table, Upload):**
    *   **Application Form:**
        *   Use Material UI components for form fields.
        *   Implement form validation.
        *   Implement data binding to the application data collection.
    *   **Overview Table:**
        *   Display application data in a tabular format using Material UI's Table component.
        *   Implement sorting and filtering.
        *   Add a "+" button to create new applications.
    *   **Document Upload:**
        *   Implement a file upload component using Material UI.
        *   Store documents in a designated directory on the server.
        *   Store document metadata in the document metadata collection.

7.  **Integrate AI Document Generation:**
    *   Implement API calls to OpenAI, Google Gemini, and Deepseek.
    *   Allow users to select which AI model to use for document generation.
    *   Pass application data and documents to the AI model.
    *   Receive generated documents from the AI model.
        *   Allow users to download the generated documents.

8.  **Implement Document Storage:**
    *   Store uploaded documents in a secure directory on the server.
    *   Use a consistent naming convention for documents.
    *   Store document metadata in the document metadata collection.

9.  **Testing and Validation:**
    *   Unit tests for backend API endpoints.
    *   Integration tests for frontend components.
    *   User acceptance testing.

10. **Deployment to Plesk Server:**
    *   Configure the Plesk server to host the Node.js backend and React frontend.
    *   Setup a reverse proxy to route traffic to the appropriate services.
    *   Configure SSL certificates for secure communication.

11. **Configure Domain (jobs.vernoh.com):**
    *   Point the domain name `jobs.vernoh.com` to the Plesk server's IP address.
    *   Configure DNS records for the domain.