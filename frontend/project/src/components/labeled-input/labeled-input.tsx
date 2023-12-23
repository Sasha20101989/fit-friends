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
  autoComplete?: string;
  onChange: (value: string) => void;
}

function LabeledInput({ classType, type, label, inputName, text, min, max, minLength, maxLength, autoComplete, onChange }: LabeledInputProps): JSX.Element {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(evt.target.value);
    }
  };

  return (
    <div className={classType}>
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
          <input
            type={type}
            name={inputName}
            id={inputName}
            autoComplete={autoComplete || 'off'}
            required
            maxLength={type === 'text' || type === 'password' ? maxLength : undefined }
            minLength={type === 'text' || type === 'password' ? minLength : undefined }
            onChange={handleChange}
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
