const converter = require("json-2-csv");
const fs = require("fs");

const { issues } = require("./cspell_output.json");

const dir = "./server/db/spelling_test";

// Flatten nested keys during CSV conversion
const csvRows = issues.map(item => ({
  word: item.text,
  row: item.row,
  db_table: item.uri.replace(".csv", "").split("/").pop(),
  line: item.line.text.trim("\n")
}));

const csv = converter.json2csv(csvRows);

fs.writeFile(`${dir}/cspell_output.csv`, csv, "utf8", function (err) {
  if (err) {
    console.log(
      "Some error occured - file either not saved or corrupted file saved."
    );
  } else {
    console.log(`${dir}/cspell_output.csv`);
  }
});
