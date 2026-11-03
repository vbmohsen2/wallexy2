declare module '@ioc:Adonis/Core/Validator' {
  interface Rules {
    size(size?: number): Rule
    gt(size?: number): Rule
    digits(size?: number): Rule
  }
}