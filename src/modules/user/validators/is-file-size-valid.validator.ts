import { registerDecorator, ValidationOptions } from 'class-validator';

interface FileWithSize {
  size: number;
}

const isFileSizeValid = (sizeLimit: number) => (value: FileWithSize) => value && value.size <= sizeLimit;

export function IsFileValidSize(sizeLimit: number, validationOptions?: ValidationOptions) {
  return function (object: FileWithSize, propertyName: string) {
    registerDecorator({
      name: 'isFileValidSize',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [sizeLimit],
      options: validationOptions,
      validator: {
        validate: (value: FileWithSize) => isFileSizeValid(sizeLimit)(value),
        defaultMessage: () => 'Размер файла превышает допустимый предел',
      },
    });
  };
}
