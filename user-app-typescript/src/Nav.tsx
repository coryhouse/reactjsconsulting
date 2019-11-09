import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {
  InternationalizationContext,
  Language
} from './InternationalizationContext';

const Nav: React.FunctionComponent = () => {
  const activeStyle: React.CSSProperties = {
    color: '#614476',
    fontWeight: 'bold'
  };
  const { language, setLanguage } = useContext(InternationalizationContext);
  const oppositeLanguage: Language =
    language === 'English' ? 'Español' : 'English';
  return (
    <nav>
      <NavLink activeStyle={activeStyle} to="/" exact>
        Home
      </NavLink>{' '}
      |{' '}
      <NavLink activeStyle={activeStyle} to="/users">
        Users
      </NavLink>
      <button onClick={() => setLanguage(oppositeLanguage)}>
        Switch to {oppositeLanguage}
      </button>
      {language === 'English' ? 'Hiya User.' : 'Hola Amigo!'}
    </nav>
  );
};

export default Nav;
