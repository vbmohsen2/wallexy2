export default class Message {
  public static getMessage(): Object {
    return {
      "*": (field, rule, _regex, _option) => {
        switch (rule) {
          case "string":
            return this.vString(field);
          case "email":
            return this.vEmail();
          case "number":
            return this.vNumber(field);
          case "required":
            return this.vRequired(field);
          case "minLength":
            return this.vMinLength(field, _option);
          case "maxLength":
            return this.vMaxLength(field, _option);
          case "regex":
            return this.vRegex(field);
          case "file.extname":
            return this.vFileName(field, _option);
          case "file.size":
            return this.vFileSize(field, _option);
          case "unique":
            return this.vUnique(field);
          case "size":
            return this.vSize(field, _option);
          case "gt":
            return this.vGt(field, _option);
          case "digits":
            return this.vDigits(field, _option);
          case "object":
            return this.vObject(field);
          case "array":
            return this.vArray(field);
        }
      },
    };
  }

  protected static vString(field: string): string {
    return this.getTranslate(field) + " باید از حروف تشکیل شده باشد";
  }

  protected static vEmail(): string {
    return "ایمیل صحیح نیست";
  }

  protected static vNumber(field: string): string {
    return this.getTranslate(field) + " باید عدد باشد";
  }

  protected static vRequired(field: string): string {
    return this.getTranslate(field) + " ضروری است";
  }

  protected static vMinLength(field: string, payload: any): string {
    return (
      this.getTranslate(field) +
      " نباید کمتر از " +
      this.getPersianNumber(payload.minLength) +
      " کاراکتر باشد"
    );
  }

  protected static vMaxLength(field: string, payload: any): string {
    return (
      this.getTranslate(field) +
      " نباید بیشتر از " +
      this.getPersianNumber(payload.maxLength) +
      " کاراکتر باشد"
    );
  }

  protected static vRegex(field: string): string {
    return this.getTranslate(field) + " صحیح نیست";
  }

  protected static vFileName(field: string, payload: any): string {
    return (
      "فرمت " +
      this.getTranslate(field) +
      " باید به صورت فایل های " +
      payload.extnames.join(" , ") +
      " باشد"
    );
  }

  protected static vUnique(field: string): string {
    return "این " + this.getTranslate(field) + " قبلا انتخاب شده است ";
  }

  protected static vSize(field: string, payload: any): string {
    return (
      this.getTranslate(field) +
      " باید " +
      this.getPersianNumber(payload.size) +
      " کاراکتر باشد "
    );
  }

  protected static vDigits(field: string, payload: any): string {
    return (
      this.getTranslate(field) +
      " باید یک عدد " +
      this.getPersianNumber(payload.size) +
      " رقمی باشد "
    );
  }

  protected static vGt(field: string, payload: any): string {
    return (
      this.getTranslate(field) +
      " باید بزرگتر از " +
      this.getPersianNumber(payload.size) +
      " باشد "
    );
  }

  protected static vArray(field: string): string {
    return this.getTranslate(field) + " باید به صورت آرایه باشد";
  }

  protected static vObject(field: string): string {
    return this.getTranslate(field) + " به صورت شی باشد";
  }

  protected static vFileSize(field: string, payload: any): string {
    const type: string =
      payload.size.substr(payload.size.length - 2, payload.size.length) === "kb"
        ? "کیلوبایت"
        : "مگابایت";
    const size: string = payload.size.substr(0, payload.size.length - 2);
    return (
      "اندازه " +
      this.getTranslate(field) +
      " نباید بیشتر از " +
      this.getPersianNumber(size) +
      " " +
      type +
      " باشد"
    );
  }

  protected static translate = {
    name: "نام",
    first_name: "نام",
    last_name: "نام خانوادگی",
    number: "شماره همراه",
    filters: "فیلترها",
    card: "شماره کارت بانکی",
    irid: "کد ملی",
    plate: "پلاک",
    address: "آدرس",
    state: "استان",
    city: "شهر",
    floor: "طبقه",
    post: "کد پستی",
    headers: "مشخصات",
    values: "اطلاعات",
    key: "نام مشخصه",
    value: "مقدار مشخصه",
    types: "مدل ها",
    features: "ویژگی ها",
    model: "مدل",
    models: "مدل ها",
    type: "نوع",
    percent: "تخفیف",
    count: "تعداد",
    score: "امتیاز",
    change: "تغییرات",
    title: "عنوان",
    text: "متن",
    width: "عرض",
    height: "طول",
    content: "محتوا",
    short: "توضیحات",
    description: "توضیحات",
    code: "کد محصول",
    max: "حداکثر",
    codes: "مرتبط ها",
    created_at: "زمان ایجاد",
    updated_at: "زمان ویرایش",
  };

  protected static getTranslate(field: string): string {
    const list = field.split(".");
    if (list.length === 1) return this.translate[field];
    else if (list.length === 2) {
      return "نوع داده ها در " + this.translate[list[0]];
    } else if (list.length === 3) {
      return this.translate[list[2]] + " در " + this.translate[list[0]];
    } else if (list.length === 4) {
      return "نوع داده ها در " + this.translate[list[2]];
    } else if (list.length === 5) {
      return this.translate[list[4]] + " در " + this.translate[list[2]];
    } else {
      return "Somthing is Wrong";
    }
  }

  protected static getPersianNumber(n: string | number): string {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
  }
}
