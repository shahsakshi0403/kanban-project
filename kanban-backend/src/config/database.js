import { Sequelize } from "sequelize";

// Load environment variables from .env file if available
import * as dotenv from "dotenv";
dotenv.config();

const database = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
  port: parseInt(port, 10),
  define: {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  },
});

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDB();

// Export the sequelize instance
export { sequelize };
