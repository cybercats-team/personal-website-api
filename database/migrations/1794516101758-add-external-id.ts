import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExternalId1794516101758 implements MigrationInterface {
    name = 'AddExternalId1794516101758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_info_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('','email','phone','linkedin','upwork','github','telegram','viber','gravatar') ) NOT NULL DEFAULT (''), "account" varchar NOT NULL, "url" varchar NOT NULL, "infoId" integer, "internalId" varchar NOT NULL, CONSTRAINT "FK_e0a759524762ca89d3a04fddef7" FOREIGN KEY ("infoId") REFERENCES "info" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_info_contact"("id", "type", "account", "url", "infoId") SELECT "id", "type", "account", "url", "infoId" FROM "info_contact"`);
        await queryRunner.query(`DROP TABLE "info_contact"`);
        await queryRunner.query(`ALTER TABLE "temporary_info_contact" RENAME TO "info_contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "info_contact" RENAME TO "temporary_info_contact"`);
        await queryRunner.query(`CREATE TABLE "info_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar CHECK( "type" IN ('','email','phone','linkedin','upwork','github','telegram','viber','gravatar') ) NOT NULL DEFAULT (''), "account" varchar NOT NULL, "url" varchar NOT NULL, "infoId" integer, CONSTRAINT "FK_e0a759524762ca89d3a04fddef7" FOREIGN KEY ("infoId") REFERENCES "info" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "info_contact"("id", "type", "account", "url", "infoId") SELECT "id", "type", "account", "url", "infoId" FROM "temporary_info_contact"`);
        await queryRunner.query(`DROP TABLE "temporary_info_contact"`);
    }

}
