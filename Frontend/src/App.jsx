// vs immet snippets cc or sfc, imrc, imr
// import 'bootstrap/dist/css/bootstrap.css';

import './App.css';



import Accounts from './components/subcomponents/Accounts';
import Navi from "./components/subcomponents/Navi"



function App() {


  let image_sources= new Array(16).fill("https://picsum.photos/id/137/200");



  // ----------------------------------------
  return (

   <div>

    <Navi />
    <Accounts image_sources={image_sources} />
 
  </div>
  );
}

export default App;
