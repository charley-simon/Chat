const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

const schema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"}
  },
  required: ["foo"],
  additionalProperties: false
}

const validate = ajv.compile(schema)

const data = {
  foo: 1,
  bar: "abc"
}

console.log("validating schema: begin")

const strData = JSON.stringify(data);
const dataCopy = JSON.parse(strData);
console.log("Serialized: " + strData)

const valid = validate(data)
if (!valid) console.log(validate.errors)
console.log("validating schema: end")
