import crypto from 'crypto';

/**
 * Decode and destruct the ID and return its components values
 * @param {Object} options 
 * @param {}
 */

function decodeId(id) {
    const parts = id.split('-');

    const ordChar = {
        "prefix": 0,
        "type": 1,
        "timestamp": 2,
        "shard": 3,
        "random": 4
    };

    if (parts.length < 2) {
        throw new Error("Invalid ID format.");
    }

    const ord = parts[parts.length];
}

function parseCompactTimestamp(ts) {
  const [y, mo, d, h, mi, s] = [
    ts.slice(0, 4),
    ts.slice(4, 6),
    ts.slice(6, 8),
    ts.slice(8, 10),
    ts.slice(10, 12),
    ts.slice(12, 14)
  ];
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}Z`);
}
