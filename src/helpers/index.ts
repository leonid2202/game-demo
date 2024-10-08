export const pick = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];

export const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
