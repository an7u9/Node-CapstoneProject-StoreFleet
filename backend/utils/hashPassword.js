import bcrypt from 'bcryptjs';

// Function to hash a password
const hashPassword = async (password) => {
  const saltRounds = 10; // You can adjust the salt rounds as needed
  const hashedpassword = await bcrypt.hash(password, saltRounds);
  return hashedpassword;
};

const comparePassword = async (enteredPassword, storedHash) => {
    const match = await bcrypt.compare(enteredPassword, storedHash);
    return match;
};

export {hashPassword,comparePassword}