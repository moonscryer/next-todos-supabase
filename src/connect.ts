import mysql, { Connection, ConnectionOptions } from "mysql2/promise";

const connOptions: ConnectionOptions = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "todos",
  port: 8889,
  connectionLimit: 10,
};

let connection: Connection | undefined = undefined;

async function exit() {
  try {
    connection?.end();
    console.log("disconnected from database");
    connection = undefined;
  } catch (e) {
    throw e;
  }
  process.exit(0);
}

export async function connect(): Promise<Connection> {
  try {
    if (connection) return connection;
    connection = await mysql.createConnection(connOptions);
    process.on("SIGINT", () => exit());
    return connection;
  } catch (e) {
    throw e;
  }
}
