import { MigrationInterface, QueryRunner } from "typeorm";

export class Initialize1794711786072 implements MigrationInterface {
    name = 'Initialize1794711786072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" integer NOT NULL, "title" character varying NOT NULL, "timeline" character varying NOT NULL, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company_project" ("id" integer NOT NULL, "summary" character varying NOT NULL, "role" character varying NOT NULL, "stack" character varying NOT NULL, "companyId" integer, CONSTRAINT "PK_6bdea50bb3e6e852a83eba8b95e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_task" ("id" integer NOT NULL, "content" character varying NOT NULL, "projectId" integer, CONSTRAINT "PK_f8275249858f42bc01e47cb979d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section" ("id" integer NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "section_point" ("id" integer NOT NULL, "content" character varying NOT NULL, "sectionId" integer, CONSTRAINT "PK_d6bb81d93a56d0c6eb0952d3c35" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "info" ("id" integer NOT NULL, "fullName" character varying NOT NULL, "title" character varying NOT NULL, "location" character varying NOT NULL, "extra" character varying NOT NULL, CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "info_contact" ("id" integer NOT NULL, "type" "public"."info_contact_type_enum" NOT NULL DEFAULT '', "account" character varying NOT NULL, "url" character varying NOT NULL, "internalId" character varying NOT NULL, "infoId" integer, CONSTRAINT "PK_ef486820c646a6f61374736845a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "seo" ("id" integer NOT NULL, "path" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "keywords" character varying NOT NULL, CONSTRAINT "PK_1f4d901235e446a56be49bde191" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company_project" ADD CONSTRAINT "FK_753e8502fb59290f199080571e8" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_task" ADD CONSTRAINT "FK_a81f1f3ca71d469236a55e2bcaa" FOREIGN KEY ("projectId") REFERENCES "company_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "section_point" ADD CONSTRAINT "FK_d22dc1308009dabf6642f042135" FOREIGN KEY ("sectionId") REFERENCES "section"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "info_contact" ADD CONSTRAINT "FK_e0a759524762ca89d3a04fddef7" FOREIGN KEY ("infoId") REFERENCES "info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "info_contact" DROP CONSTRAINT "FK_e0a759524762ca89d3a04fddef7"`);
        await queryRunner.query(`ALTER TABLE "section_point" DROP CONSTRAINT "FK_d22dc1308009dabf6642f042135"`);
        await queryRunner.query(`ALTER TABLE "project_task" DROP CONSTRAINT "FK_a81f1f3ca71d469236a55e2bcaa"`);
        await queryRunner.query(`ALTER TABLE "company_project" DROP CONSTRAINT "FK_753e8502fb59290f199080571e8"`);
        await queryRunner.query(`DROP TABLE "seo"`);
        await queryRunner.query(`DROP TABLE "info_contact"`);
        await queryRunner.query(`DROP TABLE "info"`);
        await queryRunner.query(`DROP TABLE "section_point"`);
        await queryRunner.query(`DROP TABLE "section"`);
        await queryRunner.query(`DROP TABLE "project_task"`);
        await queryRunner.query(`DROP TABLE "company_project"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
