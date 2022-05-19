import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TabPanel } from './components/TabPanel';

function App() {
  

  return <TabPanel tabs={[
    {
      title: "Tab X",
      content: "Conteúdo X"
    },
    {
      title: "Tab Y",
      content: "Conteúdo Y"
    }
  ]}></TabPanel>
}

export default App;
