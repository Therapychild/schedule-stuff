import React from "react";
import Card, { ExposedCardProps } from "components/dist/data_view/Card";
import {ConnectedTimeLineItem} from "./connected/TimeLineItem";

type Props = ExposedCardProps;

export class TimeLineItemCard extends React.Component<Props, {}> {

  header(): React.ReactNode {
    const { data } = this.props;

    return (
      <ConnectedTimeLineItem timeEntry={data} />
    );
  }

  body(): React.ReactNode {
    const { data } = this.props;

    return (
      <>
        <div className="name">
          <span>Name: </span>
          {data.get("user.displayName")}
        </div>
        <div className="times">
          <span>`Start: {data.get("start")}`</span>
          <span>`End: {data.get("end")}`</span>
        </div>
      </>
    );
  }

  footer(): React.ReactNode {
    return null
  }

  render(): React.ReactNode {
    const { data } = this.props;

    return (
      <Card
        id={data.get("id")}
        header={this.header()}
        body={this.body()}
        footer={this.footer()}
        data={data}
      />
    );
  }
}
