import React from "react";

export interface OwnProps {
  label: string
}

type Props = OwnProps;

export class UserListItem extends React.Component<Props, {}> {
  static listItemTemplate(group: any) {
    const item = new this(group);
    return item.render();
  }

  render(): React.ReactNode {
    const { label } = this.props;
    return (
      <div className="p-clearfix">
        <span style={{fontSize:'1em',float:'right',margin:'1em .5em 0 0'}}>{label}</span>
      </div>
    );
  }
}
