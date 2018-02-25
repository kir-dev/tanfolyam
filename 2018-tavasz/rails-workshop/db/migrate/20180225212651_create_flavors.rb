class CreateFlavors < ActiveRecord::Migration[5.1]
  def up
    execute <<-SQL
      CREATE SEQUENCE job_id_seq;

      CREATE TABLE flavors(
      id integer PRIMARY KEY DEFAULT nextval('job_id_seq'),
      name varchar(255),
      brand varchar(255));

      UPDATE items SET flavor = NULL WHERE flavor IS NOT NULL;
      ALTER TABLE items ALTER COLUMN flavor TYPE integer USING (flavor::integer);
    SQL
  end

  def down
    execute <<-SQL
      DROP TABLE flavors;

      DROP SEQUENCE job_id_seq;

      UPDATE items SET flavor = NULL WHERE flavor IS NOT NULL;
      ALTER TABLE items ALTER COLUMN flavor TYPE varchar(255) USING (flavor::varchar(255));
    SQL
  end
end
