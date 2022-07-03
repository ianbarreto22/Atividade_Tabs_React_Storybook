import React, { createContext, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { TabPanel } from './components/TabPanel';
import { useTabPanel } from './hooks/tab-panel-hook';
import { TabPanelProps } from './components/TabPanel';
import { TabProps } from './components/Tab'
import { TabPanelForm } from './components/TabPanelForm';

let emptyTabPanel: TabPanelProps = {
  tabs: [
    {
      title: 'Tab',
      content: 'Content'
    },
  ]
}

const TabPanelContext = createContext(emptyTabPanel)

function TabPanelWrapper(){
  const tabPanel = useContext(TabPanelContext)
  return <TabPanel {...tabPanel}/>
}



function App() {
  const {tabPanel, createTabPanel} = useTabPanel()

  function updateTabPanel(tabs: TabPanelProps){
    createTabPanel(tabs)
  }


  return(
    <div className='linha'>
      <TabPanelContext.Provider value={tabPanel!}>
      <div className='coluna-50'>
        <TabPanelForm onSubmit={updateTabPanel}/>
      </div>
      <div className='coluna-50'>
        {tabPanel != undefined && <div className='container'>
          <h1>Conteúdo</h1>
          <TabPanelWrapper/>
          </div>}
      </div>
      </TabPanelContext.Provider>
    </div>
  )
}

export default App;
