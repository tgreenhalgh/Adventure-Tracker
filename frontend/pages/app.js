import { MapContainer } from '../components/MapContainer';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import { Query } from 'react-apollo';

const TRIP_QUERY = gql`
  query getTrip($tripId: ID!) {
    trip(where: { id: $tripId }) {
      id
      startDate
      endDate
      title
      markers {
        id
        position {
          lat
          lng
        }
        status
        etaTime
        checkpointName
        checkedInTime
        etaTime
      } # end of markers
    }
  }
`;

const App = props => {
  const tripId = props.router.query.id;
  // console.log(tripId);
  if (props.router.query.id) {
    return (
      <Query query={TRIP_QUERY} variables={{ tripId }}>
        {({ data, loading, error }) => {
          // console.log(data);
          if (loading) {
            return <p>{loading}</p>;
          }
          if (error) {
            return <p>{error}</p>;
          }
          return <MapContainer data={data} />;
        }}
      </Query>
    );
  } else {
    return <MapContainer />;
  }
};

export default withRouter(App);
