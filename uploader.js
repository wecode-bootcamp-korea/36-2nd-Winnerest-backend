const dotenv = require("dotenv");
dotenv.config();
const { DataSource, UsingJoinColumnIsNotAllowedError } = require("typeorm");
const fs = require("fs");
const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
});
const initializingDataSource = async () => {
  await appDataSource.initialize()
}
const csv = fs.readFileSync("./products.csv", "utf-8");
const rows = csv.split("\n");
rows.shift();
// rows.split(",");
const dataArr = rows.map((val) => {
  let arr = val.split(",");
  return arr;
});
const sql = 'INSERT INTO products (id,name,price,thumbnail_image_url,stock,category_id) VALUES ?';
const bulkInsert = async() => { 
  await initializingDataSource()
  await appDataSource.query(sql, [dataArr])
};
bulkInsert();


