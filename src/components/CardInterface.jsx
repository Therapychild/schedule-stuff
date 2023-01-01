import React from 'react';

export default class myComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      humor: 'happy'
    }

    // Bind methods here
  }

  // Methods go here

  render() {
    const { /* deconstructed props go here */} = this.props;

    return(
      <div>
      </div>
    );
  }
}
