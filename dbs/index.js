require('dotenv').config(); // Nạp biến môi trường từ file .env
const MongoClient = require('mongodb').MongoClient;

const PROD_URI = process.env.PROD_DB_URI;

var dbs = { production: {} };

function connect(url) {
  return MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(client => client.db());
}

exports.initdb = async function () {
  try {
    let database = await connect(PROD_URI);
    dbs.production = database;
    console.log("✅ Kết nối MongoDB thành công.");
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err);
    process.exit(1); // Thoát nếu lỗi
  }
};

exports.dbs = dbs;
