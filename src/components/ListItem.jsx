import React from 'react';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGroup: {},
      activeTimeEntry: {}
    }

    this.getActiveGroup = this.getActiveGroup.bind(this);
    this.getActiveTimeEntry = this.getActiveTimeEntry.bind(this);
    this.setActiveGroup = this.setActiveGroup.bind(this);
  }

  static defaultProps = {
    children: null
  }



  getActiveGroup() {

  }

  getActiveTimeEntry() {

  }

  setActiveGroup() {

  }



  render() {
    const { children, setActiveGroup } = this.props;
    const { activeGroup, activeTimeEntry } = this.state;

    return(
      <div onClick={setActiveGroup}>
      </div>
    );
  }
}
