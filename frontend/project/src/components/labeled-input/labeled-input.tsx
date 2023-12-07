type LabeledInputProps = {
  classType: string;
  type: string;
  label: string;
  inputName: string;
  text?: string;
  max?: string;
  reference: React.MutableRefObject<HTMLInputElement | null>;
  autoComplete?: string;
}

function LabeledInput({ classType, type, label, inputName, text, reference, max, autoComplete }: LabeledInputProps): JSX.Element {
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
            autoComplete="off"
            required
            {...(type === 'date' && { max: max })}
            {...(type === 'password' && { autoComplete: autoComplete })}
          />
          {text && <span className="custom-input__text">{text}</span>}
        </span>
      </label>
    </div>
  );
}

export default LabeledInput;
