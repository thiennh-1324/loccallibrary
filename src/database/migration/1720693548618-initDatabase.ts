import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1720693548618 implements MigrationInterface {
    name = 'InitDatabase1720693548618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Author\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`familyName\` varchar(255) NOT NULL, \`dateOfBirth\` date NULL, \`dateOfDeath\` date NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`BookInstance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`imprint\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`dueDate\` date NULL, \`url\` varchar(255) NULL, \`bookId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`isbn\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, \`authorId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Genre\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`url\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book_genres_genre\` (\`bookId\` int NOT NULL, \`genreId\` int NOT NULL, INDEX \`IDX_31d658e0af554165f4598158c5\` (\`bookId\`), INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` (\`genreId\`), PRIMARY KEY (\`bookId\`, \`genreId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`BookInstance\` ADD CONSTRAINT \`FK_1eb2f43fee987ee83e845a0bb8d\` FOREIGN KEY (\`bookId\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Book\` ADD CONSTRAINT \`FK_ebb26bb446fa7a627512e8baac3\` FOREIGN KEY (\`authorId\`) REFERENCES \`Author\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_31d658e0af554165f4598158c55\` FOREIGN KEY (\`bookId\`) REFERENCES \`Book\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` ADD CONSTRAINT \`FK_83bd32782d44d9db3d68c3f58c1\` FOREIGN KEY (\`genreId\`) REFERENCES \`Genre\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_83bd32782d44d9db3d68c3f58c1\``);
        await queryRunner.query(`ALTER TABLE \`book_genres_genre\` DROP FOREIGN KEY \`FK_31d658e0af554165f4598158c55\``);
        await queryRunner.query(`ALTER TABLE \`Book\` DROP FOREIGN KEY \`FK_ebb26bb446fa7a627512e8baac3\``);
        await queryRunner.query(`ALTER TABLE \`BookInstance\` DROP FOREIGN KEY \`FK_1eb2f43fee987ee83e845a0bb8d\``);
        await queryRunner.query(`DROP INDEX \`IDX_83bd32782d44d9db3d68c3f58c\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP INDEX \`IDX_31d658e0af554165f4598158c5\` ON \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`book_genres_genre\``);
        await queryRunner.query(`DROP TABLE \`Genre\``);
        await queryRunner.query(`DROP TABLE \`Book\``);
        await queryRunner.query(`DROP TABLE \`BookInstance\``);
        await queryRunner.query(`DROP TABLE \`Author\``);
    }

}
