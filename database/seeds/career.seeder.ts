import { concat, defer, lastValueFrom } from 'rxjs';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, type QueryDeepPartialEntity } from 'typeorm';
import { Company, CompanyProject, ProjectTask } from '../../src/career/career.entity.js';

type ProjectData = {
  summary: string;
  role: string;
  stack: string;
  tasks: string[];
};

type CompanyData = { 
  company: string; 
  timeline: string;
  projects: ProjectData[];
};

export default class CareerSeeder implements Seeder {
  private data: CompanyData[] = [
    {
      "company": "ApriorIT",
      "timeline": "Aug 2021 - Oct 2026",
      "projects": [
        {
          "summary": "ERCC (Endpoint Risk & Compliance Control) Windows application",
          "role": "Architect, Team Lead, Senior C++ Developer, Senior NodeJS Developer, React Tech Consultant",
          "stack": "C++/Win32/gRPC/NodeJS, React/TanStack/Zustand",
          "tasks": [
            "Development of Windows application performing system analysis of different security threats",
            "Ensured compatibility with different OS versions and installations (client/server)",
            "Designed modular and extensible architecture",
            "Integrated with security products developed by partner company",
            "Developed and supported NodeJS gRPC testing/debugging server with production compatibility",
            "Provided architecture consulting, code reviews, quality checks, and solution audits for dashboard web application"
          ]
        },
        {
          "summary": "Browser Extension / Security solution for FIDO2 authentication",
          "role": "Team Lead, Senior C++ Developer, Senior React/TypeScript Developer, macOS Native Tech Consultant",
          "stack": "C++/Win32/FIDO2/WebAuthN/TypeScript/JavaScript/React",
          "tasks": [
            "Developed cross-platform native messaging host application for macOS and Windows",
            "Implemented Windows version from scratch",
            "Developed auxiliary Windows service",
            "Provided technical consulting for macOS implementation (Objective-C/UIKit)",
            "Developed Chrome, Firefox, and Edge extensions",
            "Developed JavaScript browser library in TypeScript",
            "Developed React authentication library",
            "Developed demo site similar to webauthn.io",
            "Implemented FIDO2 device-level actions requiring elevated privileges via Windows service"
          ]
        },
        {
          "summary": "Multi-token wallet app",
          "role": "Senior React Developer, Senior Blockchain Developer",
          "stack": "React/NextJS/Jotai/SWR/EthersJS/LiFi/Web3Onboard",
          "tasks": [
            "Developed cryptocurrency wallet supporting multiple tokens",
            "Implemented token-specific functionality as independent modules",
            "Used monorepo architecture with Turborepo",
            "Implemented OAuth-based custody via Tor.us",
            "Implemented affiliation program",
            "Integrated decentralized news feed via Ceramic Network",
            "Implemented AI-driven face recognition features"
          ]
        },
        {
          "summary": "Official website / webapp for crypto token",
          "role": "Team Lead, Architect, Tech Consultant",
          "stack": "RN for Web/NativeBase/React Navigation/EthersJS",
          "tasks": [
            "Led and managed project activities",
            "Ported integrations from the main wallet application"
          ]
        }
      ]
    },
    {
      "company": "Nordwhale",
      "timeline": "Mar 2020 - Aug 2021",
      "projects": [
        {
          "summary": "Official wallet app for crypto token",
          "role": "Team Lead, Architect, Senior Full-Stack (MERN) Developer, Blockchain Developer",
          "stack": "MERN/RN for Web/React Paper/React Navigation/Web3JS/Undux/Axios/Realm/ThreadDB",
          "tasks": [
            "Developed universal Web/iOS/Android application for token and protocol features",
            "Developed backend services supporting protocol functionality",
            "Implemented OAuth-based custody via Tor.us",
            "Implemented affiliation program",
            "Integrated decentralized news feed via Ceramic Network",
            "Implemented AI-based face recognition using FaceTec",
            "Implemented proof issuance via Veramo"
          ]
        }
      ]
    },
    {
      "company": "PortaONE",
      "timeline": "Dec 2020 - Feb 2021",
      "projects": [
        {
          "summary": "Software VoIP station dashboard",
          "role": "Team Lead, Architect, Senior Angular Developer",
          "stack": "Angular",
          "tasks": [
            "Developed VoIP station dashboard frontend",
            "Implemented offline logs viewer using SSR, StateTransfer, and LocalStorage"
          ]
        }
      ]
    },
    {
      "company": "SportLabs",
      "timeline": "Jul 2019 - Nov 2019",
      "projects": [
        {
          "summary": "Score aggregator application",
          "role": "Team Lead, Architect, Senior Full-Stack (MERN) Developer",
          "stack": "MERN/Redis/WebSocket",
          "tasks": [
            "Developed web application",
            "Developed backend services",
            "Integrated score aggregators and real-time event providers",
            "Developed custom SSR service and auxiliary microservices",
            "Implemented queue-based real-time event processing",
            "Performed performance optimization"
          ]
        }
      ]
    },
    {
      "company": "Mobilunity",
      "timeline": "Jan 2016 - Jun 2019",
      "projects": [
        {
          "summary": "Relocation platform worldwide",
          "role": "Team Lead, Architect, Senior Full-Stack (MEAN) Developer",
          "stack": "MEAN/WebSocket",
          "tasks": [
            "Developed advanced modular backend using AdonisJS",
            "Developed modular frontend",
            "Designed OOP/SOLID architecture",
            "Developed ORM-based data layer using MongoDB and Lucid ORM",
            "Implemented built-in support chat",
            "Integrated OAuth2 and booking platforms"
          ]
        },
        {
          "summary": "Internal notification service",
          "role": "Team Lead, Senior Full-Stack (MEAN) Developer",
          "stack": "MEAN/WebSocket",
          "tasks": [
            "Developed backend on Express/TypeScript framework",
            "Developed modular frontend",
            "Implemented data layer with MongoDB and Mongoose",
            "Developed WebSocket server"
          ]
        },
        {
          "summary": "Integrated support chat",
          "role": "Team Lead, Architect, Senior Full-Stack (MEAN) Developer",
          "stack": "MEAN/WebSocket",
          "tasks": [
            "Developed advanced backend using AdonisJS",
            "Developed frontend",
            "Designed OOP/SOLID architecture",
            "Implemented MongoDB and Lucid ORM data layer",
            "Developed WebSocket server",
            "Integrated Amazon S3 for chat uploads hosting"
          ]
        },
        {
          "summary": "Portable ID for in-company use",
          "role": "Team Lead, React Native Developer",
          "stack": "ReactNative/Expo/Fetch/REST",
          "tasks": [
            "Designed application architecture",
            "Integrated with existing corporate authentication backend",
            "Implemented fingerprint login",
            "Implemented AsyncLocalStorage",
            "Implemented QR code rendering"
          ]
        },
        {
          "summary": "Fitness/Health care/Lifestyle mobile app",
          "role": "Team Lead, React Native Developer",
          "stack": "ReactNative/Expo/Fetch/REST",
          "tasks": [
            "Designed application architecture",
            "Integrated with existing backend services"
          ]
        },
        {
          "summary": "Premium-class car rental service",
          "role": "Team Lead, Architect, Senior Frontend Developer",
          "stack": "Backbone/Marionette/Lodash, WordPress/REST API",
          "tasks": [
            "Designed web application architecture",
            "Implemented Backbone models and REST-based data layer",
            "Developed interactive UI, transitions, and animations"
          ]
        }
      ]
    },
    {
      "company": "Intelligent Software",
      "timeline": "Nov 2009 - Dec 2015",
      "projects": [
        {
          "summary": "Product marketplace",
          "role": "Middle NodeJS Developer",
          "stack": "MEAN (AngularJS v1)",
          "tasks": [
            "Developed multi-store eCommerce application",
            "Implemented frontend and backend functionality",
            "Integrated OAuth2 and CRM systems"
          ]
        },
        {
          "summary": "Marketing & business analytics SaaS application",
          "role": "Frontend Developer, eCommerce Developer",
          "stack": "Backbone/Lodash/REST/ASP.NET, PHP, Rails",
          "tasks": [
            "Developed dashboard UI",
            "Integrated Magento, WooCommerce, Refinery CMS, and other eCommerce systems"
          ]
        },
        {
          "summary": "E-mail marketing SaaS application",
          "role": "Frontend Developer",
          "stack": "SenchaJS/ASP.NET",
          "tasks": [
            "Developed dashboard UI"
          ]
        },
        {
          "summary": "High-load news website",
          "role": "Database Engineer, Full-Stack Developer",
          "stack": "MySQL/Gearman/Memcached/Rails/jQuery",
          "tasks": [
            "Designed modular architecture inspired by Magento",
            "Combined ORM and raw SQL for performance optimization",
            "Implemented advanced caching and server-side includes",
            "Developed statistics and analytics processing"
          ]
        }
      ]
    },
    {
      "company": "IBPro",
      "timeline": "Nov 2008 - Nov 2009",
      "projects": [
        {
          "summary": "Custom CMS platform",
          "role": "Database Engineer, Full-Stack Developer",
          "stack": "MySQL/Rails/SenchaJS/jQuery",
          "tasks": [
            "Built websites using proprietary CMS",
            "Developed custom project-specific solutions"
          ]
        }
      ]
    },
    {
      "company": "Vik Oil Group",
      "timeline": "Jun 2007 - Oct 2008",
      "projects": [
        {
          "summary": "Business Intelligence and OLAP",
          "role": "Database Engineer, Data Analyst",
          "stack": "SAP R/3, SAP BI/BW, DB2",
          "tasks": [
            "Worked with SAP Business Warehouse",
            "Developed stored procedures to extract ERP and CRM data",
            "Developed OLAP cubes",
            "Generated reports for business needs"
          ]
        }
      ]
    },
    {
      "company": "DomikNET",
      "timeline": "May 2005 - May 2007",
      "projects": [
        {
          "summary": "CRM and real-estate analytics platform",
          "role": "Database Engineer, C++ Developer, PL/SQL Developer",
          "stack": "Oracle/PLSQL/Borland C++ Builder",
          "tasks": [
            "Developed business logic in triggers and stored procedures",
            "Implemented statistics, analytics, and market indicator processing",
            "Developed data parsing and import pipelines",
            "Developed CRM application"
          ]
        }
      ]
    }
  ];

  private async seedCompany(dataSource: DataSource, company: CompanyData, id: number): Promise<void> {    
    const section_repo = dataSource.getRepository(Company);

    await section_repo.upsert({
      id,
      title: company.company,
      timeline: company.timeline
    }, ["id"]);

    const fk: QueryDeepPartialEntity<CompanyProject> = { company: { id }};

    const projectsObservables = company.projects.map((project, idx) => defer(async () =>
      this.seedProject(dataSource, project, 10 * id + idx, fk)
    ))
    
    await lastValueFrom(concat(...projectsObservables))  
  }

  private async seedProject(dataSource: DataSource, project: ProjectData, id: number, fk: QueryDeepPartialEntity<CompanyProject>): Promise<void> {    
    const section_repo = dataSource.getRepository(CompanyProject);

    await section_repo.upsert({
      id,
      summary: project.summary,
      role: project.role,
      stack: project.stack,
      ...fk
    }, ["id"]);

    const point_repo = dataSource.getRepository(ProjectTask);
    const task_fk: QueryDeepPartialEntity<ProjectTask> = { project: { id }};

    await point_repo.upsert(project.tasks.map((task, idx) => ({
      id: idx + 10 * id,
      content: task,
      ...task_fk
    })), ["id"]);
  }

  public async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
    const seedObservables = this.data.map((company, index) => defer(async () =>
      this.seedCompany(dataSource, company, index + 1)
    ))
    
    await lastValueFrom(concat(...seedObservables))    
  }
}