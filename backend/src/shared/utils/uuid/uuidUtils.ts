import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';

const generateUUIDv4 = () => uuidv4();
const generateUUIDv7 = () => uuidv7();

export { generateUUIDv4, generateUUIDv7 };
