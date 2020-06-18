import React from 'react';
import Resource from "duckies/dist/resource/Resource";

export interface OwnProps {
  data: Resource;
}

export interface StateProps {
  expandable: boolean;
}

type Props = OwnProps & StateProps;

export class AssignableCard extends React.Component<Props, {}> {
  static defaultProps = {
    className: ""
  };

  toggleExpand = () => {
    // set expanded to !expanded
  }

  // Assign active user
    // Get active user
  assignUser = () => {
    alert("You just assigned me!")
  }

  header(): React.ReactNode {
    return <button className="assign" onClick={this.assignUser}>Assign</button>;
  }

  body(): React.ReactNode {
    return <div className="card-body"/>
  }

  footer(): React.ReactNode {
    return <div className="card-footer"/>
  }

  render() {
    const { data } = this.props;
    return (
      <div data={data}/>
    );
  }
}
