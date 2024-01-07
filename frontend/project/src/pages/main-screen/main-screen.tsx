import SpecialForYou from '../../components/special-for-you/special-for-you';
import SpecialOffers from '../../components/special-offers/special-offers';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import LookForCompany from '../../components/look-for-company/look-for-company';
import Layout from '../../components/layout/layout';
import { useAppSelector } from '../../hooks/index';
import { useState } from 'react';
import { getPopularTrainings, getSpecialForUserTrainings, getSpecialTrainings, getUsers } from '../../store/main-data/main-data.selectors';
import { Training } from '../../types/training.type';
import { TrainingCategory } from '../../types/training-category';
import { MAX_LOOK_FOR_COMPANY_COUNT, MAX_POPULAR_TRAININGS_COUNT, MAX_SPECIAL_TRAININGS_COUNT } from '../../const';
import { usePreviousNextButtons } from '../../hooks/use-previous-next-buttons/use-previous-next-buttons';
import { useFetchTrainingsEffect } from '../../hooks/use-fetch-trainings-effect/use-fetch-trainings-effect';
import { useFetchUsersEffect } from '../../hooks/use-fetch-users-effect/use-fetch-users-effect';

function MainScreen(): JSX.Element {
  const specialTrainings: Training[] = useAppSelector(getSpecialTrainings);
  const specialForUserTrainings: Training[] = useAppSelector(getSpecialForUserTrainings);
  const popularTrainings: Training[] = useAppSelector(getPopularTrainings);
  const lookForCompanyUsers = useAppSelector(getUsers);

  const [selectedSpecialPage] = useState<number>(1);
  const [activeSpecialSlide, setActiveSpecialSlide] = useState(0);
  const [selectedSpecialForUserPage, setSpecialForUserPage] = useState<number>(1);
  const [selectedPopularPage, setPopularPage] = useState<number>(1);
  const [selectedLookForCompanyPage, setLookForCompanyPage] = useState<number>(1);

  const isPreviousSpecialForUserButtonDisabled = selectedSpecialForUserPage === 1;
  const isNextSpecialForUserButtonDisabled = MAX_SPECIAL_TRAININGS_COUNT !== specialForUserTrainings.length;

  const isPreviousPopularButtonDisabled = selectedPopularPage === 1;
  const isNextPopularButtonDisabled = MAX_POPULAR_TRAININGS_COUNT !== popularTrainings.length;

  const isPreviousLookForCompanyButtonDisabled = selectedLookForCompanyPage === 1;
  const isNextLookForCompanyButtonDisabled = MAX_LOOK_FOR_COMPANY_COUNT !== lookForCompanyUsers.length;

  const handleSpecialDotClick = (index: number) => {
    setActiveSpecialSlide(index);
  };

  const {
    handlePreviousClick: handleSpecialForUserPreviousClick,
    handleNextClick: handleSpecialForUserNextClick,
  } = usePreviousNextButtons(selectedSpecialForUserPage, setSpecialForUserPage);

  const {
    handlePreviousClick: handlePopularPreviousClick,
    handleNextClick: handlePopularNextClick,
  } = usePreviousNextButtons(selectedPopularPage, setPopularPage);

  const {
    handlePreviousClick: handleLookForCompanyPreviousClick,
    handleNextClick: handleLookForCompanyNextClick,
  } = usePreviousNextButtons(selectedLookForCompanyPage, setLookForCompanyPage);

  useFetchTrainingsEffect(
    TrainingCategory.SPECIAL,
    selectedSpecialPage,
    MAX_SPECIAL_TRAININGS_COUNT,
    true,
  );

  useFetchTrainingsEffect(
    TrainingCategory.FOR_USER,
    selectedSpecialForUserPage,
    MAX_SPECIAL_TRAININGS_COUNT,
  );

  useFetchTrainingsEffect(
    TrainingCategory.POPULAR,
    selectedPopularPage,
    MAX_POPULAR_TRAININGS_COUNT
  );

  useFetchUsersEffect(true, selectedLookForCompanyPage, MAX_LOOK_FOR_COMPANY_COUNT);

  return(
    <Layout>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <SpecialForYou
        specialForUserTrainings={specialForUserTrainings}
        isPreviousButtonDisabled={isPreviousSpecialForUserButtonDisabled}
        isNextButtonDisabled={isNextSpecialForUserButtonDisabled}
        onPreviousClick={handleSpecialForUserPreviousClick}
        onNextClick={handleSpecialForUserNextClick}
      />
      <SpecialOffers
        specialTrainings={specialTrainings}
        activeSlide={activeSpecialSlide}
        onDotClick={handleSpecialDotClick}
      />
      <PopularTrainings
        popularTrainings={popularTrainings}
        isPreviousButtonDisabled={isPreviousPopularButtonDisabled}
        isNextButtonDisabled={isNextPopularButtonDisabled}
        onPreviousClick={handlePopularPreviousClick}
        onNextClick={handlePopularNextClick}
      />
      <LookForCompany
        lookForCompanyUsers={lookForCompanyUsers}
        isPreviousButtonDisabled={isPreviousLookForCompanyButtonDisabled}
        isNextButtonDisabled={isNextLookForCompanyButtonDisabled}
        onPreviousClick={handleLookForCompanyPreviousClick}
        onNextClick={handleLookForCompanyNextClick}
      />
    </Layout>
  );
}

export default MainScreen;
