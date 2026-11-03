import {rules, schema} from "@ioc:Adonis/Core/Validator";

export default class Validation {

  public static number() {
    return schema.create({
      number: schema.string({}, [rules.regex(/(09[01239][0-9]{8}$)/)]),
    })
  }

  public static mail() {
    return schema.create({
      mail: schema.string({}, [rules.email()]),
    })
  }

  public static product() {
    return schema.create({
      category_id: schema.number([rules.gt(0)]),
      name: schema.string({escape: true, trim: true}, [rules.minLength(10)]),
      normalized: schema.string({escape: true, trim: true}, [rules.minLength(10)]),
      description: schema.string.optional({escape: true, trim: true}, [rules.minLength(10)]),
      type: schema.string({escape: true, trim: true}, [rules.minLength(2)]),
      code: schema.string.optional({escape: true, trim: true}, [rules.minLength(1)]),
      codes: schema.string.optional({escape: false, trim: true}, [rules.minLength(1)]),
      models: schema.array().members(schema.object().members({
        name: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
        price: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
        percent: schema.number([rules.range(0, 99)]),
        count: schema.number([rules.gt(0)]),
        id: schema.number.optional([rules.gt(1)]),
      })),
      price: schema.string({escape: true, trim: true}, [rules.minLength(1)]),
      filters: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
      features: schema.array().members(schema.string({escape: true, trim: true}, [rules.minLength(3)]),),
      headers: schema.array().members(
        schema.object().members({
          name: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
          values: schema.array().members(schema.object().members(
              {
                key: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
                value: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
              }
            )
          )
        })
      )
    })
  }

  public static category() {
    return schema.create({
      name: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
      price: schema.string.optional({escape: true, trim: true}, [rules.minLength(3)]),
      parent_id: schema.number([rules.gt(0)]),
      filters: schema.array().members(schema.object().anyMembers())
    })
  }

  public static type() {
    return schema.create({
        name: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
        price: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
        percent: schema.number([rules.range(0, 99)]),
        count: schema.number([rules.gt(0)])
      }
    )
  }

  public static bags() {
    return schema.create({
        bags: schema.array().members(schema.object().members({
          name: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
          model: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
          type: schema.string({escape: true, trim: true}, [rules.minLength(2)]),
          photo: schema.string({escape: false, trim: true}, [rules.minLength(3)]),
          price: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
          percent: schema.number([rules.range(0, 99)]),
          max: schema.number([rules.gt(0)]),
          height: schema.number.optional([rules.gt(0)]),
          width: schema.number.optional([rules.gt(0)]),
          count: schema.number([rules.gt(0)]),
          pid: schema.number([rules.gt(0)])
        }))
      }
    )
  }


  public static information() {
    return schema.create({
      first_name: schema.string({escape: true, trim: true}, [rules.minLength(2)]),
      last_name: schema.string({escape: true, trim: true}, [rules.minLength(2)]),
      province: schema.string({escape: true, trim: true}, [rules.minLength(2)]),
      city: schema.string({escape: true, trim: true}, [rules.minLength(2)]),
      address: schema.string({escape: true, trim: true}, [rules.minLength(10)]),
      irid: schema.string({escape: true, trim: true}, [rules.digits(10)]),
      plate: schema.number([rules.gt(0)]),
      post: schema.string({escape: true, trim: true}, [rules.digits(10)]),
      floor: schema.number.optional([rules.gt(0)]),
    })
  }

  public static comment() {
    return schema.create({
      title: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
      text: schema.string({escape: true, trim: true}, [rules.minLength(10)]),
      score: schema.number([rules.range(1, 5)]),
    })
  }

  public static blog() {
    return schema.create({
      title: schema.string({escape: true, trim: true}, [rules.minLength(3)]),
      short: schema.string({escape: true, trim: true}, [rules.minLength(10)]),
      content: schema.string({escape: false, trim: true}, [rules.minLength(10)]),
    })
  }

}
