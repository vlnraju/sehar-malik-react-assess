import 'isomorphic-fetch';

const getDroneData = async () => {
  const response = await fetch(
    'https://react-assessment-api.herokuapp.com/api/drone'
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const { data } = await response.json();
  return { data };
};

export default getDroneData;
