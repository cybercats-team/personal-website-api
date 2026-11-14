import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Seo } from '../../src/seo/seo.entity.js';

export default class SeoSeeder implements Seeder {
    private data = {
        path:        "/",
        title:       "Senior Full-Stack Developer & Software Architect | React, Node.js, Angular, C++ | Oleksii Serdiukov",
        description: "Senior Software Developer, Team Lead, and Software Architect with 21+ years of experience building scalable web, mobile, desktop, and blockchain solutions. Expert in React, Node.js, Angular, React Native, TypeScript, C++, system architecture, and technical leadership.",
        keywords:    "Oleksii Serdiukov, Senior Software Developer, Software Architect, Technical Architect, Team Lead, Engineering Manager, Full Stack Developer, Senior Full Stack Developer, React Developer, ReactJS Developer, Next.js Developer, Angular Developer, Node.js Developer, TypeScript Developer, JavaScript Developer, React Native Developer, Mobile App Developer, Web Application Developer, MERN Developer, MEAN Developer, Backend Developer, Frontend Developer, C++ Developer, Win32 Developer, gRPC Developer, Blockchain Developer, Ethereum Developer, Web3 Developer, Software Consultant, Technical Consultant, System Design, Application Architecture, MongoDB, PostgreSQL, MySQL, Express.js, AdonisJS, Redux, Zustand, WebAuthn, FIDO2, Team Leadership, Remote Software Engineer, Remote Technical Lead"
    }

    public async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
        await dataSource.getRepository(Seo).upsert({
            id:   1,            
            ...this.data
        }, ['id']);        
    }
}