import crypto from 'crypto';

/**
 * Generate a unique ID with structured format and flexible options.
 * @param {Object} options
 * @param {string} [options.prefix] - Optional prefix (e.g. "API", "USR")
 * @param {string} [options.shard] - Node/shard identifier
 * @param {boolean} [options.includeShard=true] - Include shard part
 * @param {boolean} [options.includeTimestamp=true] - Include UTC timestamp
 * @param {string} [options.type="usr"] - Type or category of ID
 * @param {number} [options.length=8] - Random byte length
 * @param {string} [options.encoding='hex'] - 'hex' | 'base64' | 'base62'
 * @returns {string}
 */

function generateId(options = {}) {
    const {
        prefix = "",
        shard = "",
        includeShard = true,
        includeTimestamp = true,
        type = "usr",
        length = 8,
        encoding = "hex"
    } = options;

    if (includeShard && !shard) {
        throw new Error("The shard must not be empty when includeShard is true.");
    }

    if (!type || typeof type !== 'string') {
        throw new Error("The type must be a non-empty string.");
    }

    // Timestamp (optional)
    const timestamp = includeTimestamp
        ? new Date().toISOString().slice(0, 19).replace(/[-T:]/g, '')
        : null;


    // Randomness
    const randomBytes = crypto.randomBytes(length);
    let randomPart;
    switch (encoding) {
        case 'base64':
            randomPart = randomBytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').slice(0, length);
            break;
        case 'base62':
            randomPart = toBase62(randomBytes).slice(0, length);
            break;
        case 'hex':
        default:
            randomPart = randomBytes.toString('hex').slice(0, length);
    }

    // Compose
    const parts = [
        prefix.trim(),
        type,
        includeTimestamp ? timestamp : null,
        includeShard ? shard : null,
        randomPart
    ].filter(Boolean);

    const components = {
        prefix: prefix ? true : false,
        type: type ? true : false,
        timestamp: includeTimestamp,
        shard: includeShard
    }


    return parts.join('-');
}

// base62 encoder
const base62chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
function toBase62(buffer) {
    let num = BigInt('0x' + buffer.toString('hex'));
    let result = '';
    while (num > 0) {
        result = base62chars[num % 62n] + result;
        num /= 62n;
    }
    return result || '0';
}

export default generateId;
