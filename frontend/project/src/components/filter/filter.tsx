import { ChangeEvent, useState } from 'react';
import { WorkoutType } from '../../types/workout-type.enum';
import { Location } from '../../types/location.enum';

type FilterProps = {
  title: string;
  filterName: string;
  values: Location[] | WorkoutType[];
  onFilterChange: (filterName: string, values: (Location | WorkoutType)[]) => void;
}

function Filter({ title, filterName, values, onFilterChange }: FilterProps): JSX.Element {
  const maxItemsToShow = 5;

  const [showAll, setShowAll] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<(Location | WorkoutType)[]>([]);

  const itemsToDisplay = showAll ? values : values.slice(0, maxItemsToShow);

  const handleShowAllClick = () => {
    setShowAll(true);
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as Location | WorkoutType;

    setSelectedFilters((prevFilters) => {
      const updatedFilters = prevFilters.includes(value)
        ? prevFilters.filter((filter) => filter !== value)
        : [...prevFilters, value];

      onFilterChange(filterName, updatedFilters);

      return updatedFilters;
    });
  };

  return (
    <div className={`user-catalog-form__block user-catalog-form__block--${filterName}`} data-testid={filterName}>
      <h4 className="user-catalog-form__block-title">{title}</h4>
      <ul className="user-catalog-form__check-list">
        {itemsToDisplay.map((item) => (
          <li key={item} className="user-catalog-form__check-list-item">
            <div className="custom-toggle custom-toggle--checkbox">
              <label>
                <input
                  type="checkbox"
                  value={item}
                  name={filterName}
                  checked={selectedFilters.includes(item)}
                  onChange={handleCheckboxChange}
                />
                <span className="custom-toggle__icon">
                  <svg width="9" height="6" aria-hidden="true">
                    <use xlinkHref="#arrow-check"></use>
                  </svg>
                </span>
                <span className="custom-toggle__label">{item}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      {!showAll && values.length > maxItemsToShow && (
        <button
          className="btn-show-more user-catalog-form__btn-show"
          type="button"
          onClick={handleShowAllClick}
        >
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="#arrow-down"></use>
          </svg>
        </button>
      )}
    </div>
  );
}

export default Filter;
