import React from 'react';
import ReactDOM from 'react-dom';

import AddAccount from './components/AddAccount';
import ModifyAccount from './components/ModifyAccount';
import ShowAll from './components/ShowAll';
import MainMap from './components/MainMap';
import Intro from './components/Intro';
import NoPage from './components/NoPage';
import Admin from './components/Admin';
import VerifyProfile from './components/subcomponents/VerifyProfile';
import UserProfil from './components/subcomponents/UserProfil'
import Protected from './components/Protected'
  


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
 
<>

  <Router>
    <Routes>
      <Route path="/" element={<Intro />}>
      <Route path="home" element={<Intro />} />
    </Route>
      <Route path="profile" element={<ShowAll />} />
      <Route path="profile/:userId/:firstname-:lastname" element={<ShowAll />}/> 
      <Route path="profil-aendern" element={<ModifyAccount />} />
      <Route path="profil-erstellen" element={<AddAccount />} />
      <Route path="karte" element={<MainMap />} />
      <Route path="/protected" element={
        <Protected >
          <Admin />
        </Protected>
      } />
      <Route path="userProfil/:userId/:firstname-:lastname" element={<UserProfil />}/> 
      <Route path="email-bestaetigen/:token/:userId" element={<VerifyProfile />} />
      <Route path="*" element={<NoPage />} />
          
    </Routes>
  </Router>
  
  </>
    ,


  document.getElementById('root')
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
