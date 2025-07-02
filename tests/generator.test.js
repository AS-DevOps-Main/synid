import { generateId } from '../src/generator.js';
import { decodeId } from '../src/encoder.js';

const id = generateId({
    prefix: "api",
    shard: "eu1",
    type: "usr",
    length: 15,
    encoding: "base62",
    includeTimestamp: false
});

console.log(`ID: ${id}`);

const details = decodeId(id);
console.log(`ID details: ${JSON.stringify(details, null, 4)}`);
