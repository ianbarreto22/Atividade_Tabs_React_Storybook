import { FormEvent, useState } from "react";
import { Tab, TabProps } from "./Tab";
import { maxLength, isInt, required, inRange } from "../utils/validation"
import { TabPanelProps } from "./TabPanel";

import './TabPanelForm.css'

interface TabPanelFormProps {
    onSubmit: (tabPanel: TabPanelProps) => void
}

export function TabPanelForm({onSubmit}: TabPanelFormProps){

    const [touched, setTouched] = useState<{[name: string]: boolean}>({})
    const [errors, setErrors] = useState<{[name: string]: string}>({})

    const [numTabs, setNumTabs] = useState<number>(0)
    const [tabs, setTabs] = useState<TabProps[]>([])

    function touch(name: string, value: boolean = true){
        setTouched(prevTouched => ({...prevTouched, [name]: value}))
    }

    function setError(name: string, error: string){
        setErrors(prevErrors => ({...prevErrors, [name]:error}))
    }

    function changeNumTabs(value: string){
        const range = inRange(1, 8)

        const validateFunc = (value: string) => required(value) || isInt(value) || range(value)

        if(check(value, validateFunc, 'numTabs')){

            const num = parseInt(value, 10)
            setNumTabs(num)

            if(num <= tabs.length){
                for(let i = num; i < tabs.length; i++){
                    touch(`tab_title_${i}`, false)
                    touch(`tab_content_${i}`, false)
                    setError(`tab_title_${i}`, '')
                    setError(`tab_content_${i}`, '')
                }
                setTabs(tabs.slice(0,num))
            }
            else{
                const tail: TabProps[] = []
                for(let i = 1; i <= num - tabs.length; i++){
                    const t: TabProps = {title: `Tab ${i + tabs.length}`, content: `Conteúdo ${i +tabs.length}`}
                    tail.push(t)
                }
                setTabs([...tabs, ...tail])
            }
        }
    }

    function changeTabTitle(index: number, value: string){
        const newTabs = [...tabs]
        newTabs[index].title = value
        setTabs(newTabs)
        touch(`tab_title_${index}`) 
    }

    function changeTabContent(index: number, value: string){
        const newTabs = [...tabs]
        newTabs[index].content = value
        setTabs(newTabs)
        touch(`tab_content_${index}`) 
    }

    function check(value: string, validateFunc: Function, name: string){
        const error = validateFunc(value)
        setError(name, error)
        return error === null
    }

    function submit(e: FormEvent){
        e.preventDefault()


        const tabsTitleOk = tabs.map((tab, i) => check(tab.title, required, `tab_title_${i}`)).every(t => t)
        const tabsTitleCharOk = tabs.map((tab, i) => check(tab.title, maxLength(12), `tab_title_${i}`)).every(t => t)
        const tabsContentOk = tabs.map((tab, i) => check(tab.content, required, `tab_content_${i}`)).every(t => t)

        if(tabsTitleOk && tabsContentOk && tabsTitleCharOk){
            onSubmit({tabs})
        }
    }

    const numTabsElm = (
        <div className="linha">
            <label className="col-25">Num. Tabs</label>
            <input type="number" className="col-35"
                value={numTabs}
                onChange={e => changeNumTabs(e.target.value)}
            />
            <div className="error col-25">{errors[`numTabs`]}</div>
        </div>
    )

    const tabsList = tabs.map((tab, i) => (
        <div key={`tab_${i}`}>
            <p>Tab {i+1}</p>
            <div className="linha">
                <label className="col-25">Título</label>
                <input type="text" value={tabs[i].title} className="col-35"
                 onChange={e => changeTabTitle(i, e.target.value)}
                 onBlur={e => touched[`tab_title_${i}`] && check(e.target.value, required, `tab_title_${i}`)}/>
                <div className="error col-25">{errors[`tab_title_${i}`]}</div>
            </div>
            <div className="linha">
                <label className="col-25">Conteúdo</label>
                <input type="text" value={tabs[i].content} className="col-35"
                 onChange={e => changeTabContent(i, e.target.value)}
                 onBlur={e => touched[`tab_content_${i}`] && check(e.target.value, required, `tab_content_${i}`)}/>
                <div className="error col-25">{errors[`tab_content_${i}`]}</div>
            </div>
        </div>
    ))

    const buttons = (
        <div className="linha b-box">
            <input type="submit" value="Salvar" className="button" disabled={numTabs === 0 ? true : false}/>
        </div>
    )

    return(
        <form onSubmit={submit}>
            <h1 className="title"> Tabs </h1>
        
            {numTabsElm}
            {tabsList}

            {buttons}

        </form>
    )
}