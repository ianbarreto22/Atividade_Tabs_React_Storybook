import './Tab.css'

export interface TabProps {
  title: string
  content: string
  index?: number
  onSelection?: (value: number) => void
  selected?: number
}

export function Tab(props: TabProps) {

  return (
    <button onClick={() => props.onSelection && props.onSelection(props.index!)}
    className={props.index === props.selected ? 'selected' : ''}> 
        {props.title}
    </button>
  )
}