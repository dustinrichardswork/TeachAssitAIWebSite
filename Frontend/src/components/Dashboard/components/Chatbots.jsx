import Productivity from './Productivity';
import Header from './Header';
import Categories from './Categories';


const Chatbots = () => {

  return (
    <div>

      <Header
        heading={"Chatbots"}
        desc={"Which teachers assistance would you like?"}
      />
      <Categories />
      <Productivity />

    </div>
  );
};

export default Chatbots;