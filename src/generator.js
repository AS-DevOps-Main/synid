// src/generator.js
import crypto from 'crypto';

/**
 * generate a unique ID with configurable options.
 * @param {Object} options - Configuration options.
 * @param {string} [options.prefix] - Optional prefix for the ID.
 * @param {string} [options.shard] - The ID shard.
 * @param {boolean} [options.includeShard=true] - Whether to include shard (default: true).
 * @param {string} [options.type="usr"] - The ID type (e.g. usr, img, etc) default: "usr".
 * @param {number} [options.length=8] - Length of the random part of the ID.
 * @param {string} [options.encoding='hex'] - Encoding type: 'hex', 'base64', 'base62', etc.
 * @returns {string} The generated ID string.
 */

function generateId(options = {}) {
    const {
        prefix = "",
        includeShard = true,
        shard,
        type = "usr",
        length = 8,
        encoding = "hex"
    } = options;

    if (includeShard && (!shard || shard.length === 0)) {
        throw new Error("The shard must not be empty when includeShard is set to true.");
    }

    if (!type || type.length === 0) {
        throw new Error("The type must not be empty.");
    }

    // generate the Timestamp string
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    
    // Generates random bytes securely
    const randomBytes = crypto.randomBytes(length);

    // Encode random bytes according to specified encoding
    let randomPart;
    switch (encoding) {
        case 'base64':
            randomPart = randomBytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').slice(0, length);
            break;
        case 'base62':
            randomPart = randomBytes.toString('hex').slice(0, length);
            break;
        case 'hex':
        default:
            randomPart = randomBytes.toString('hex').slice(0, length);
    }

    // Compose final ID parts
    const prefixPart = prefix ? `${prefix.trim()}-` : '';
    const shardPart = includeShard ? `${shard}-` : '';
    const id = `${prefixPart}${timestamp}-${shardPart}${type}-${randomPart}`;
    return id;
}

export default generateId;