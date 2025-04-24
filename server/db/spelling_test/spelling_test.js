const { pool, poolConnect } = require("../../app/services/tedious-pool.js");
const converter = require("json-2-csv");
const fs = require("fs");
const {
  db_tables_included,
  db_tables_excluded
} = require("../../../cspell.json");

const dir = "./db/spelling_test";

const exportDBToCSV = async (tables_included, tables_excluded) => {
  const include_where =
    tables_included.length > 0
      ? "AND a.name in (" +
        tables_included.map(name => `'${name}'`).join(", ") +
        ")"
      : "";

  const exclude_where =
    tables_excluded.length > 0
      ? "AND a.name NOT in (" +
        tables_excluded.map(name => `'${name}'`).join(", ") +
        ")"
      : "";

  await poolConnect;
  const request = pool.request();

  const schema_result = await request.query(`
    SELECT
        x.table_name
        ,(
            SELECT STRING_AGG('['+y.name+']', ',') WITHIN GROUP (ORDER BY y.name) AS column_names
            FROM sys.columns AS y
            WHERE x.OBJECT_ID = y.OBJECT_ID
            AND TYPE_NAME(system_type_id) IN (
                'varchar',
                'nvarchar'
            )
        ) AS column_names
    FROM (
        SELECT
            a.name AS table_name
            ,a.OBJECT_ID
        FROM sys.tables AS a
        WHERE 1=1
        ${include_where}
        ${exclude_where}
        
    ) AS x 
    `);

  schema_result.recordset.forEach(async row => {
    const { table_name, column_names } = row;

    const table_result = await request.query(
      `SELECT ${column_names} FROM ${table_name}`
    );

    let csv = converter.json2csv(table_result.recordset);

    fs.writeFile(
      `${dir}/db_table_csv/${table_name}.csv`,
      csv,
      "utf8",
      function (err) {
        if (err) {
          console.log(
            "Some error occured - file either not saved or corrupted file saved."
          );
        } else {
          console.log(`${table_name} saved.`);
        }
      }
    );
  });
};

exportDBToCSV(db_tables_included, db_tables_excluded);
