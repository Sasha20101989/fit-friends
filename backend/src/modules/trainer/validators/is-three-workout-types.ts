import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { WorkoutType } from '../../../types/workout-type.enum.js';

export function IsThreeWorkoutTypes(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isThreeWorkoutTypes',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: WorkoutType[], _args: ValidationArguments) {
          return value.length <= 3;
        },
      },
    });
  };
}
