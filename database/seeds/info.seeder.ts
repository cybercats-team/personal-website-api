import { HttpClient } from '@nestjs/http-client'
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource, type QueryDeepPartialEntity } from 'typeorm';
import { ContactType, Info, InfoContact } from '../../src/info/info.entity.js';

type Profile = {
    hash: string;
    first_name: string;
    last_name: string;
    display_name: string;
    profile_url: string;
    location: string;    
    job_title: string;    

    verified_accounts: {
        service_type: string;
        service_label: string;
        url: string; 
    }[];    

    links: {
        label: string;
        url: string;
    }[];    

    contact_info: {
        cell_phone: string;
        email: string;
        calendar: string;
    }    
}

export default class InfoSeeder implements Seeder {
    private readonly profileId  = process.env.GRAVATAR_PROFILE ?? ''
    private readonly profileUrl = `/profiles/${encodeURIComponent(this.profileId)}`

    private gravatar = new HttpClient({
        baseUrl: process.env.GRAVATAR_URL,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${process.env.GRAVATAR_API_KEY}`
        }
    })

    private static groupAndFlatten<Item>(items: Item[], property: keyof Item): Record<string, Item> {
        const grouped = Object.groupBy(items, item => item[property] as string);
        const entries = Object.entries(grouped);

        return Object.fromEntries(entries.map(([group, items]) => [group, items![0]]));
    }
    
    public async run(dataSource: DataSource, _: SeederFactoryManager): Promise<any> {
        const { gravatar, profileUrl, profileId } = this
        const { groupAndFlatten } = InfoSeeder
        
        const info_repo = dataSource.getRepository(Info);
        const { data: profile } = await gravatar.get<Profile>(profileUrl)

        await info_repo.upsert({
            id:       1,
            fullName: profile.display_name,
            title:    profile.job_title,
            location: profile.location,
            extra:    "English level: Upper-intermediate (B2)"
        }, ['id']);

        const contact_repo = dataSource.getRepository(InfoContact)
        const { contact_info, links, verified_accounts } = profile

        const grouped_links = groupAndFlatten(links, "label")
        const grouped_accounts = groupAndFlatten(verified_accounts, "service_type")
        
        const linkedin_id = grouped_accounts['linkedin'].url
            .replace('https://www.linkedin.com/', '')

        const upwork_id = grouped_links['Upwork'].url
            .replace('https://www.upwork.com/freelancers/', '')
            .replace('?viewMode=1', '')

        const github_id = grouped_accounts['github'].url
            .replace('https://github.com/', '')

        const fkey: QueryDeepPartialEntity<InfoContact> = { info: { id: 1 }}

        await contact_repo.upsert([{
            id:         1,
            type:       ContactType.kEmail,
            account:    contact_info.email,
            url:        `mailto:${contact_info.email}`,
            internalId: contact_info.email,
            ...fkey
        },{
            id:         2,
            type:       ContactType.kPhone,
            account:    contact_info.cell_phone,
            url:        `tel:${contact_info.cell_phone}`,
            internalId: contact_info.cell_phone,
            ...fkey
        },{
            id:         3,
            type:       ContactType.kLinkedIn,
            account:    linkedin_id,
            url:        grouped_accounts['linkedin'].url,
            internalId: linkedin_id.replace('in/', ''),
            ...fkey
        },{
            id:         4,
            type:       ContactType.kUpWork,
            account:    upwork_id,
            url:        grouped_links['Upwork'].url,
            internalId: upwork_id,
            ...fkey
        },{
            id:         5,
            type:       ContactType.kGitHub,
            account:    github_id,
            url:        grouped_accounts['github'].url,
            internalId: github_id,
            ...fkey
        },{
            id:         6,
            type:       ContactType.kTelegram,
            account:    '@oleksii_serdiukov_86',
            url:        'https://t.me/oleksii_serdiukov_86',
            internalId: 'oleksii_serdiukov_86',
            ...fkey
        },{
            id:         7,
            type:       ContactType.kGravatar,
            account:    profileId,
            url:        profile.profile_url,
            internalId: profile.hash,
            ...fkey
        },{
            id:         8,
            type:       ContactType.kGoogleMeet,
            account:    profileId,
            url:        contact_info.calendar,
            internalId: profileId,
            ...fkey
        }], ['id'])
    }
}