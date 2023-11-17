import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import mime from 'mime-types';

export function IsSinglePDF(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isSinglePDF',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: object, _args: ValidationArguments) {
          const file = value;

          if (Array.isArray(file)) {
            return false;
          }

          if (typeof file === 'string') {
            const mimeType = mime.lookup(file);
            return mimeType === 'application/pdf';
          }

          return false;
        },
      },
    });
  };
}
