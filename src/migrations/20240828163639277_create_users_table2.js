import connection from '../config/dbconfig.js';

export const up = async () => {
  try {
    // SQL query to add a new column 'emotion' to the Users table
    const query = `ALTER TABLE Users ADD COLUMN emotion VARCHAR(255);`;
    
    // Execute the query
    await connection.execute(query);
  } catch (err) {
    console.error('Error during UP migration:', err);
  }
};

export const down = async () => {
  try {
    // SQL query to remove the 'emotion' column from the Users table
    const query = `ALTER TABLE Users DROP COLUMN emotion;`;

    // Execute the query
    await connection.execute(query);
  } catch (err) {
    console.error('Error during DOWN migration:', err);
  }
};
