import { TabPanelForm } from "../components/TabPanelForm";
import { TabPanelProps } from "../components/TabPanel";
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
    title: 'TabPanelForm/TabPanelForm',
    component: TabPanelForm
  } as ComponentMeta<typeof TabPanelForm>

function submit(){

}

  const Template: ComponentStory<typeof TabPanelForm> = () => <TabPanelForm onSubmit={submit}/>

  export const TP1 = Template.bind({})


