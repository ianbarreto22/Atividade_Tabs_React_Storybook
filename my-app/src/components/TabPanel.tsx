import React, { useState } from 'react';
import {Tab} from './Tab'
import './TabPanel.css'

export interface TabPanelProps {
    tabs: {
        title: string,
        content: string
    }[]
}

export function TabPanel({tabs}: TabPanelProps) {

    const [currentTab, setCurrentTab] = useState(0)

    function setTab(index: number){
        setCurrentTab(index)
    }

   const tab_list = tabs.map((tab, i)=> <Tab key={i} title={tab.title} index={i} content={tab.content} onSelection={setTab} selected={currentTab}/>)
   return (<div className='panel'>
       {tab_list}

       {tabs.length >=1 && <div className='box'>
           <p>{tabs[currentTab].content}</p>
       </div>}
   </div>)
}