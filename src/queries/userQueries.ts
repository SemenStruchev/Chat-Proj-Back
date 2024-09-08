// Query for registering a new user
export const insertUserQuery = `
  INSERT INTO Users (username, email, password, firstName, lastName)
  VALUES (?, ?, ?, ?, ?)
`;

// Query for finding a user by email
export const findUserByEmailQuery = `
  SELECT * FROM Users WHERE email = ?
`;

// Query for inserting or updating tokens
export const insertOrUpdateTokenQuery = `
  INSERT INTO Tokens (userId, accessToken, refreshToken, expiresAt)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    accessToken = VALUES(accessToken),
    refreshToken = VALUES(refreshToken),
    expiresAt = VALUES(expiresAt)
`;

// Query for updating User
export const updateUserQuery = `
    UPDATE Users
    SET firstName = COALESCE(?, firstName),
        lastName = COALESCE(?, lastName)
     WHERE id = ?
`;
