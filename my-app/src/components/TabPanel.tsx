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

    const [currentContent, setCurrentContent] = useState('Clique em uma tab.')

    function setContent(content: string){
        if(content == currentContent){
            setCurrentContent("Clique em uma tab.")
        }
        else{
            console.log(content)
            setCurrentContent(content)
        }
    }

   const tab_list = tabs.map(tab => <Tab key={tab.title} title={tab.title} content={tab.content} onSelection={setContent} selected={currentContent}/>)
   return <div className='panel'>
       {tab_list}

       <div className='box'>
           <p>{currentContent}</p>
       </div>
   </div>
}