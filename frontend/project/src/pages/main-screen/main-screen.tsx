import React from 'react';
import Header from '../../components/header/header';
import SpecialForYou from '../../components/special-for-you/special-for-you';
import SpecialOffers from '../../components/special-offers/special-offers';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import LookForCompany from '../../components/look-for-company/look-for-company';

function MainScreen(): JSX.Element {
  return(
    <React.Fragment>
      <Header/>
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYou/>
        <SpecialOffers/>
        <PopularTrainings/>
        <LookForCompany/>
      </main>
    </React.Fragment>
  );
}

export default MainScreen;
