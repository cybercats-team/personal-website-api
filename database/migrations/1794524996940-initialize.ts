import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1794524996940 implements MigrationInterface {
    name = 'Initialize1794524996940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "timeline" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "company_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "summary" varchar NOT NULL, "role" varchar NOT NULL, "stack" varchar NOT NULL, "companyId" integer)`);
        await queryRunner.query(`CREATE TABLE "project_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "projectId" integer)`);
        await queryRunner.query(`CREATE TABLE "section" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "section_point" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "sectionId" integer)`);
        await queryRunner.query(`CREATE TABLE "info" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "fullName" varchar NOT NULL, "title" varchar NOT NULL, "location" varchar NOT NULL, "extra" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "info_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('','email','phone','linkedin','upwork','github','telegram','viber','gravatar','calendly') ) NOT NULL DEFAULT (''), "account" varchar NOT NULL, "url" varchar NOT NULL, "internalId" varchar NOT NULL, "infoId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_company_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "summary" varchar NOT NULL, "role" varchar NOT NULL, "stack" varchar NOT NULL, "companyId" integer, CONSTRAINT "FK_753e8502fb59290f199080571e8" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_company_project"("id", "summary", "role", "stack", "companyId") SELECT "id", "summary", "role", "stack", "companyId" FROM "company_project"`);
        await queryRunner.query(`DROP TABLE "company_project"`);
        await queryRunner.query(`ALTER TABLE "temporary_company_project" RENAME TO "company_project"`);
        await queryRunner.query(`CREATE TABLE "temporary_project_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "projectId" integer, CONSTRAINT "FK_a81f1f3ca71d469236a55e2bcaa" FOREIGN KEY ("projectId") REFERENCES "company_project" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_project_task"("id", "content", "projectId") SELECT "id", "content", "projectId" FROM "project_task"`);
        await queryRunner.query(`DROP TABLE "project_task"`);
        await queryRunner.query(`ALTER TABLE "temporary_project_task" RENAME TO "project_task"`);
        await queryRunner.query(`CREATE TABLE "temporary_section_point" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "sectionId" integer, CONSTRAINT "FK_d22dc1308009dabf6642f042135" FOREIGN KEY ("sectionId") REFERENCES "section" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_section_point"("id", "content", "sectionId") SELECT "id", "content", "sectionId" FROM "section_point"`);
        await queryRunner.query(`DROP TABLE "section_point"`);
        await queryRunner.query(`ALTER TABLE "temporary_section_point" RENAME TO "section_point"`);
        await queryRunner.query(`CREATE TABLE "temporary_info_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('','email','phone','linkedin','upwork','github','telegram','viber','gravatar','calendly') ) NOT NULL DEFAULT (''), "account" varchar NOT NULL, "url" varchar NOT NULL, "internalId" varchar NOT NULL, "infoId" integer, CONSTRAINT "FK_e0a759524762ca89d3a04fddef7" FOREIGN KEY ("infoId") REFERENCES "info" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_info_contact"("id", "type", "account", "url", "internalId", "infoId") SELECT "id", "type", "account", "url", "internalId", "infoId" FROM "info_contact"`);
        await queryRunner.query(`DROP TABLE "info_contact"`);
        await queryRunner.query(`ALTER TABLE "temporary_info_contact" RENAME TO "info_contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "info_contact" RENAME TO "temporary_info_contact"`);
        await queryRunner.query(`CREATE TABLE "info_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('','email','phone','linkedin','upwork','github','telegram','viber','gravatar','calendly') ) NOT NULL DEFAULT (''), "account" varchar NOT NULL, "url" varchar NOT NULL, "internalId" varchar NOT NULL, "infoId" integer)`);
        await queryRunner.query(`INSERT INTO "info_contact"("id", "type", "account", "url", "internalId", "infoId") SELECT "id", "type", "account", "url", "internalId", "infoId" FROM "temporary_info_contact"`);
        await queryRunner.query(`DROP TABLE "temporary_info_contact"`);
        await queryRunner.query(`ALTER TABLE "section_point" RENAME TO "temporary_section_point"`);
        await queryRunner.query(`CREATE TABLE "section_point" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "sectionId" integer)`);
        await queryRunner.query(`INSERT INTO "section_point"("id", "content", "sectionId") SELECT "id", "content", "sectionId" FROM "temporary_section_point"`);
        await queryRunner.query(`DROP TABLE "temporary_section_point"`);
        await queryRunner.query(`ALTER TABLE "project_task" RENAME TO "temporary_project_task"`);
        await queryRunner.query(`CREATE TABLE "project_task" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "projectId" integer)`);
        await queryRunner.query(`INSERT INTO "project_task"("id", "content", "projectId") SELECT "id", "content", "projectId" FROM "temporary_project_task"`);
        await queryRunner.query(`DROP TABLE "temporary_project_task"`);
        await queryRunner.query(`ALTER TABLE "company_project" RENAME TO "temporary_company_project"`);
        await queryRunner.query(`CREATE TABLE "company_project" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "summary" varchar NOT NULL, "role" varchar NOT NULL, "stack" varchar NOT NULL, "companyId" integer)`);
        await queryRunner.query(`INSERT INTO "company_project"("id", "summary", "role", "stack", "companyId") SELECT "id", "summary", "role", "stack", "companyId" FROM "temporary_company_project"`);
        await queryRunner.query(`DROP TABLE "temporary_company_project"`);
        await queryRunner.query(`DROP TABLE "info_contact"`);
        await queryRunner.query(`DROP TABLE "info"`);
        await queryRunner.query(`DROP TABLE "section_point"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "project_task"`);
        await queryRunner.query(`DROP TABLE "company_project"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
