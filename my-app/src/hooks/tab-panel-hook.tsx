import { useState } from "react";
import { TabPanelProps } from "../components/TabPanel";

export function useTabPanel(){
    const [tabPanel, setTabPanel] = useState<TabPanelProps>()

    const createTabPanel = (tabPanel: TabPanelProps) => {
        setTabPanel(tabPanel)
    }

    return {tabPanel, createTabPanel}
}