import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSectionSlug1795149728212 implements MigrationInterface {
    name = 'AddSectionSlug1795149728212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" ADD "slug" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "section" DROP COLUMN "slug"`);
    }

}
