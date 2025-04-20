const { pool, poolConnect } = require("../../app/services/tedious-pool.js");
const converter = require("json-2-csv");
const fs = require("fs");
const mssql = require("mssql");
const { db_tables_included } = require("../../../cspell.json");

const exportDBToCSV = async tables_included => {
  await poolConnect;
  const request = new mssql.Request(pool);
  let tables_where_clause;
  if (tables_included.length > 0) {
    tables_where_clause =
      "WHERE a.name in (" +
      tables_included.map(name => `"${name}"`).join(", ") +
      ")";
  } else {
    tables_where_clause = "";
  }

  const schema_result = await request.query(`
  SELECT
    x.table_name
    ,(
      SELECT STRING_AGG("["+y.name+"]", ",") WITHIN GROUP (ORDER BY y.name) AS column_names
      FROM sys.columns AS y
      WHERE x.OBJECT_ID = y.OBJECT_ID
      AND TYPE_NAME(system_type_id) IN (
        "varchar",
        "nvarchar"
      )
    ) AS column_names
  FROM (
    SELECT
      "["+a.name+"]" AS table_name
      ,a.OBJECT_ID
    FROM sys.tables AS a
    
    ${tables_where_clause}
    
  ) AS x 
  `);

  schema_result.recordset.forEach(async row => {
    const { table_name, column_names } = row;

    const table_result = await request.query(
      `SELECT ${column_names} FROM ${table_name}`
    );

    let csv = converter.json2csv(table_result.recordset);

    fs.writeFile(
      `./server/db/spelling_test/output_csv/${table_name}.csv`,
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

exportDBToCSV(db_tables_included);
