import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

interface RootState {
  isOn: boolean
}

const mapState = (state: RootState) => ({isOn: state.isOn,})
const mapDispatch = {toggleOn: () => ({ type: 'TOGGLE_IS_ON' }),}
const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>
interface Props extends PropsFromRedux {}
  
  const MyComponent = (props: Props) => (
    <div>
      <button onClick={props.toggleOn}>
        Toggle is {props.isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  )
  
  export default connector(MyComponent)