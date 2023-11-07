import { registerDecorator, ValidationOptions } from 'class-validator';

const isFileSizeValid = (sizeLimit: number) => {
  return (value: any) => {
    if (value && value.size <= sizeLimit) {
      return true;
    }
    return false;
  };
};

export function IsFileValidSize(sizeLimit: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFileValidSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [sizeLimit],
      options: validationOptions,
      validator: {
        validate: isFileSizeValid(sizeLimit),
        defaultMessage: () => 'Размер файла превышает допустимый предел',
      },
    });
  };
}
