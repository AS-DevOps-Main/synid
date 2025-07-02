/**
 * Decode a generated ID back into its structured components.
 * @param {string} id - The full ID string.
 * @returns {Object} An object containing prefix, type, timestamp, shard, random
 */

function decodeId(id) {
    let result = {};
    const ords = {
        0: "prefix",
        1: "type",
        2: "timestamp",
        3: "shard"
    };
    let x = 0;

    const parts = id.split('-');

    if (parts.length < 2) {
        throw new Error("Invalid ID format.");
    }

    const forward = parts[parts.length - 1];

    if (!/^[01]{4}$/.test(forward)) {
        throw new Error("Malformed forward flag.");
    }

    const randomPart = parts[parts.length - 2];
    result.random = randomPart;

    forward.split('').forEach((ord, idx) => {
        if (ord === "1" && ords[idx] !== "timestamp") {
            result[ords[idx]] = parts[x];
            x += 1;
        } else if (ord === "1" && ords[idx] === "timestamp") {
            result[ords[idx]] = parseCompactTimestamp(parts[x]);
            x += 1;
        }
        
    });

    return result;
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

export default decodeId;