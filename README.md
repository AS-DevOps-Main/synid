# 🔐 synid — Smart, Structured & Secure ID Generator

`synid` is a powerful Node.js package that generates **smart**, **unique**, and **verifiable IDs**, going far beyond traditional formats like `uuidv4`.

Designed for **distributed systems**, **audit trails**, **security-sensitive apps**, and **human-readable debugging**, `synid` offers highly configurable ID generation using timestamp, shard, context type, and cryptographic randomness—with optional checksums for integrity.

---

## 📦 Installation

```bash
npm install synid
```

---

## 🚀 Quick Start

```js
import { generateId } from 'synid';

// Basic usage
const id = generateId({ includeShard: false });
console.log(id); 
// ➜ '20250701120315-usr-194d83f3'

// With options
const customId = generateId({
  prefix: 'PRE',
  shard: '01AF',
  length: 10,
  encoding: 'hex',
  includeChecksum: true
});
console.log(customId);
// ➜ 'PRE-20250701120504-01AF-usr-1da6c5e6cd-D2C1'
```

---

## ⚙️ API Reference

### `generateId(options)`

| Option             | Type      | Default | Description                                                     |
| ------------------ | --------- | ------- | --------------------------------------------------------------- |
| `prefix`           | `string`  | `''`    | Optional entity prefix                 |
| `type`              | `string` | `usr` | The ID type, like: `usr`, `img`, `doc`, `sys` etc |
| `shard`          | `string`  | `''`    | Optional node/shard/machine ID to ensure distributed uniqueness |
| `length`           | `number`  | `8`     | Length of the random portion (base depends on encoding)         |
| `includeShard` | `boolean` | `true`  | Include the Shard           |
| `encoding`         | `string`  | `'hex'` | Encoding of random data: `'hex'`, `'base64'`, `'base62'`, etc.  |
| `includeChecksum`  | `boolean` | `false` | Whether to append a CRC16 or HMAC-based checksum for validation |

---

### `validateId(id)`

Verifies if the ID is well-formed and checksum (if any) is valid.

```js
const isValid = validateId('20250701224512-01AF-usr-X9pF7v3k-D2C1');
```

---

### `decodeId(id)`

Returns the structured parts of the ID as an object.

```js
const details = decodeId('20250701224512-01AF-usr-X9pF7v3k-D2C1');
```
Output:

```markdown
{
  timestamp: '2025-07-01T22:45:12Z',
  shard: '01AF',
  type: 'usr',
  random: 'X9pF7v3k',
  checksum: 'D2C1'
}
```

---

## 📌 Features

* ✅ **Time-sortable** IDs (good for logs and DB ordering)
* ✅ **Shard-safe** for distributed systems
* ✅ **Optional type prefixes** for clarity (`usr`, `img`, `ord`)
* ✅ **Random bytes** from secure crypto source
* ✅ **Encoding options**: base62, base64url, hex
* ✅ **Checksum support** for tamper detection
* ✅ **Lightweight** and framework-agnostic

---

## 📚 Use Cases

* Unique identifiers in distributed systems
* Logging, events, audit trails (timestamp-sorted)
* API tokens with embedded validation
* Human-friendly yet cryptographically strong IDs
* Multi-tenant or shard-aware environments

---

## 🛡 Security

* Uses Node.js native `crypto.randomBytes()` for high-entropy randomness.
* Optional HMAC checksum based on a secret key (configurable in future releases).

---

## 🧩 Future Roadmap

* [ ] Built-in support for Base62 encoder
* [ ] Custom ID namespace registration
* [ ] CLI tool for ID generation & validation
* [ ] ESM and CommonJS dual export
* [ ] Web version with reduced polyfills

---

## 🧪 Contributing

Contributions are welcome!

```bash
git clone https://github.com/yourusername/synid.git
cd synid
npm install
```

Submit issues or pull requests on the [GitHub repository](https://github.com/yourusername/synid).

---

## 📝 License

MIT License © 2025 Ayoub Salhi

---

