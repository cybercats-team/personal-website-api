import { concat, defer, lastValueFrom } from 'rxjs';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, type QueryDeepPartialEntity } from 'typeorm';
import { Section, SectionPoint } from '../../src/section/section.entity.js';

type SectionData = { section: string; points: string[] }

export default class SectionSeeder implements Seeder {
  private data: SectionData[] = [{
    section: "EXPERTISE",
    points: [
      "21 years of experience as a software engineer",
      "16 years as full-stack developer at Web",
      "11 years as team lead/architect",
      "9 years as mobile developer (hybrid/RN/native)",
      "5 years as data analyst/database engineer/CRM developer",
      "3.5 years as blockchain developer (Ethereum)",
      "4 years of commercial C/C++ expertise",
      "3 years of embedded/hardware development"
    ]
  }, {
    section: "TECH STACKS",
    points: [
      "Full-stack: MEAN / MERN => since 2015",
      "Frontend: Angular => since 2015",
      "Frontend: React + ReactRouter/NextJS/Tanstack + Redux/Zustand/Jotai + Axios/Fetch/SWR => since 2016",
      "Backend: NodeJS + MongoDB/MySQL/PgSQL + ExpressJS/AdonisJS => since 2015",
      "Mobile: ReactNative + ReactNavigation + Undux/Jotai + Axios/Fetch => since 2017",
      "Blockchain: React + EthersJS + Tor.US/WalletConnect + LiFi + Textile/Ceramic/IPFS => since 2020",
      "System: Win32 + C++/C + gRPC => 2005-2007, 2024-2026",
      "Hardware: Arduino/pure AtMega + C/C++ => 2018-2022"
    ]
  }, {
    section: "TECH SKILLS",
    points: [
      "Languages: C/C++, JavaScript/TypeScript, Java, Swift, Bash/PowerShell/Python scripting",
      "Methodology: OOP, FP, DRY/KISS, GOF patterns, MVC, MVP, BDD, TDD",
      "Architecture: SOLID",
      "SQL DBMS: MySQL, PgSQL, Oracle",
      "noSQL DBMS: MongoDB, Redis, IndexedDB (Dexie/ThreadDB)",
      "Queues: AMPQ, Redis",
      "AI solutions: FaceTec, Claude, Copilot, Gemini",
      "Auth & security: OAuth2, FIDO2, WebAuthN, Tor.US",
      "Cloud & integrations: Google/Firebase, Amazon (S3, SES), Twilio, eCommerce APIs",
      "UI frameworks: MFC, UIKit, TailwindCSS, MaterialUI, NativeBase, ReactPaper, ReactNative for Web",
      "Extended features: WebAssembly, ReactNative NativeModules, NodeJS NativeModules",
      "Testing: Jest, GTest, Cypress",
      "DevOPS, CI/CD: Heroku, Netlify, Vercel, Github Actions"
    ]
  }, {
    section: "ARCHITECTURE",
    points: [
      "Best practices suggested by certain framework/library/technology stack",
      "For OOP-based frameworks: SOLID at design, GoF patterns at implementation",
      "Stick to Thinking in React/Rules of Hooks/Advanced Hooks for React projects",
      "Best codestyle practices (using linters for JavaScript/TypeScript), SonarCube for C++",
      "Modular/extensible architecture",
      "Highload optimization (UI / server side)",
      "Refactoring, restructuring, rewriting obsolete code",
      "Business objectives analysis & optimal solutions research",
      "Custom solutions (libs/modules customization for certain project/task, developing libraries from scratch, cutting edge solutions like NativeModules)"
    ]
  }, {
    section: "LEADERSHIP",
    points: [
      "Small teams (up to 5-6 people) management experience",
      "Typical team setup (vary for different projects): 2-3 frontend devs, 1-2 backend devs, qa, devops, project/domain-specific roles (like protocol developer on crypto project)",
      "Up to 3 projects in rotation (at same time)",
      "Communication, aligning responsibilities with different teams (e.g. QA, design, protocol, DevOps)",
      "Describing & delegating tasks over the team",
      "Code review & suggestions",
      "Writing technical documentation",
      "Assistance: hints & advices, pair programming, code/usage samples",
      "Mentorship: lectures & standups, presenting new approaches/new technologies, team training",
      "Optimization: picking up the right tasks for a certain team member (according to their motivation/interest/experience)",
      "Team growth is my main goal as a leader"
    ]
  }, {
    section: "I OFFER",
    points: [
      "Team lead/architect/senior developer at Your project (full-time, remote) - from $4K monthly",
      "Tech consultant/senior developer at Your project (half-time, remote) - from $2K monthly",
      "Tech consultant/senior developer at Your project (hourly, remote) - from $35 / hour",
      "Tech consultations, code review, code audit (hourly, remote) - from $35 / hour",
      "Team mentorship, education, standups (hourly, remote) - from $35 / hour"
    ]
  }]

  private async seedSection(dataSource: DataSource, section: SectionData, index: number): Promise<void> {    
    const section_repo = dataSource.getRepository(Section);

    await section_repo.upsert({
      id:    index + 1,
      title: section.section
    }, ["id"]);

    const point_repo = dataSource.getRepository(SectionPoint);
    const fk: QueryDeepPartialEntity<SectionPoint> = { section: { id: index + 1 }};

    await point_repo.upsert(section.points.map((point, idx) => ({
      id: idx + 20 * (index + 1),
      content: point,
      ...fk
    })), ["id"]);
  }

  public async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
    const seedObservables = this.data.map((section, index) => defer(async () =>
      this.seedSection(dataSource, section, index)
    ))
    
    await lastValueFrom(concat(...seedObservables))    
  }
}