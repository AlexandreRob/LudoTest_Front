import { fetchData } from './api';
import { fetchSingle } from './api';

const MyComponent = () => {
  const handleFetchData = async () => {
    try {
      const data = await fetchData('JeuViewset');
      console.log(data);
    } catch (error) {
      
    }
  };
  const getsingle = async () => {
    try {
      const data = await fetchSingle('JeuViewset',"1");
      console.log(data);
    } catch (error) {

    }
  };
  handleFetchData()
  getsingle()
};

export default MyComponent;
