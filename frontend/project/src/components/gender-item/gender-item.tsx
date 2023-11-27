import useRegisterForm from '../../hooks/use-register-form/use-register-form';
import { Gender } from '../../types/gender.enum';

type GenderItemProps = {
  gender: Gender;
}

function GenderItem({ gender }: GenderItemProps): JSX.Element {
  const { selectedSex, handleSexChange } = useRegisterForm();

  return (
    <div className="custom-toggle-radio__block">
      <label>
        <input
          type="radio"
          name="gender"
          value={gender}
          checked={selectedSex === gender}
          onChange={handleSexChange}
        />
        <span className="custom-toggle-radio__icon"></span>
        <span className="custom-toggle-radio__label">{gender}</span>
      </label>
    </div>
  );
}

export default GenderItem;
