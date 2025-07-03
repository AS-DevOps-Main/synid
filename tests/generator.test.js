import { generateId } from "@codetronix/synid";

const id = generateId({
    shard: "usa",
    prefix: "API",
    length: 20,
    type: "img"
});

console.log(id);