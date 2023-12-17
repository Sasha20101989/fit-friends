type LabeledInputProps = {
  classType: string;
  type: string;
  label: string;
  inputName: string;
  text?: string;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: string | number;
  reference: React.MutableRefObject<HTMLInputElement | null>;
  autoComplete?: string;
}

function LabeledInput({ classType, type, label, inputName, text, reference, min, max, minLength, maxLength, autoComplete }: LabeledInputProps): JSX.Element {
  return (
    <div className={classType}>
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
          <input
            type={type}
            name={inputName}
            id={inputName}
            ref={reference}
            autoComplete={autoComplete || 'off'}
            required
            maxLength={type === 'text' || type === 'password' ? maxLength : undefined }
            minLength={type === 'text' || type === 'password' ? minLength : undefined }
            {...(type === 'number' && { min, max })}
            {...(type === 'date' && { max })}
            {...(type === 'password' && { autoComplete })}
          />
          {text && <span className="custom-input__text">{text}</span>}
        </span>
      </label>
    </div>
  );
}

export default LabeledInput;
