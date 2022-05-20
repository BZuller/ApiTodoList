import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTasks1653057925293 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
      name: 'tasks',
      columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',

      },
      {
        name: 'description',
        type: 'varchar'
      },
      {
        name: 'created_at',
        type: 'timestamp with time zone',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp with time zone',
        default: 'now()',
      }
      ],
    }));

    const foreignKey = new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames:['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE'});
      await queryRunner.createForeignKey('tasks', foreignKey);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tasks')
  }
}
