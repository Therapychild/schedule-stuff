import React from 'react';
import { InnerCardProps } from "components/dist/data_view/Card";

export interface DispatchProps {
  toggleExpand: (expanded: boolean) => void;
}

export interface StateProps {
  expandable: boolean
}

type Props = InnerCardProps & StateProps & DispatchProps;

export class CollapsibleCard extends React.Component<Props, {}> {
  render(): React.ReactNode {
    const { className, header, body, footer, expandable} = this.props;
    const classes = className
      ? `${className} card collapsible`
      : `card collapsible`;

    let display = {};

    if (!expandable) {
      display = <div className="card-header">
        {header}
        <button className="more-info">info</button>
      </div>
    } else {
      display = <React.Fragment>
        <div className="card-header">
          {header}
          <button className="more-info">info</button>
        </div>
        <div className="card-content">
          <div className="card-body">{body}</div>
          {footer ? <div className="card-footer">{footer}</div> : null}
        </div>
      </React.Fragment>
    }

    return (
      <div className={classes}>
        {display}
      </div>
    );
  }
}
