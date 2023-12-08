import SpecialForYou from '../../components/special-for-you/special-for-you';
import SpecialOffers from '../../components/special-offers/special-offers';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import LookForCompany from '../../components/look-for-company/look-for-company';
import Layout from '../../components/layout/layout';

function MainScreen(): JSX.Element {
  return(
    <Layout>
      <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
      <SpecialForYou/>
      <SpecialOffers/>
      <PopularTrainings/>
      <LookForCompany/>
    </Layout>
  );
}

export default MainScreen;
