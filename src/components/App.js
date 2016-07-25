import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      router: this.context.router
    });

    return (
      <div>
        {children}
      </div>
    );
  }
}
