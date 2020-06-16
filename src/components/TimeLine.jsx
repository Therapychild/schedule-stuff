import React, {Component} from "react";
import moment from "moment";

import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from "react-calendar-timeline/lib";
import { Sidebar } from "primereact/sidebar";
import Button from "antd/es/button";
import { ListBox } from "primereact/listbox";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

export default class TimelineView extends Component {
  static defaultProps = {
    className: ""
  };

  constructor(props) {
    super(props);

    const { jobs, items } = generateFakeData();
    const visibleTimeStart = moment()
      .startOf("day")
      .toDate();
    const visibleTimeEnd = moment()
      .startOf("day")
      .add(3, "day")
      .toDate();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      jobs,
      items,
      visibleTimeStart,
      visibleTimeEnd,
      employeeList,
      selectedEmployee: null,
    };
  }

  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    const { items, jobs } = this.state;
    const group = jobs[newGroupOrder];

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: dragTime,
            end: dragTime + (item.end - item.start),
            group: group.id
          })
          : item
      )
    });

    console.log("Moved", itemId, dragTime, newGroupOrder);
  };

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state;

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: edge === "left" ? time : item.start,
            end: edge === "left" ? item.end : time
          })
          : item
      )
    });

    console.log("Resized", itemId, time, edge);
  };

  handleClick() {
    this.setState(prevState => {
      return { visible: !prevState.visible };
    });
  }

  render() {
    const { items, visibleTimeStart, visibleTimeEnd, visible, employeeList, selectedEmployee, jobs } = this.state;
    console.log(jobs);
    const { className } = this.props;
    const classes = className ? `${className} timeline-view` : "timeline-view";

    return (
      // eslint-disable-next-line react/jsx-no-undef
      <div className={classes}>
        <Sidebar
          visible={visible}
          onHide={() => this.setState({visible:false})}
          showCloseIcon={false}
        >
          <h3 className="first">Employees</h3>
          <ListBox value={selectedEmployee} filter={true} options={employeeList} onChange={(e) => this.setState({selectedEmployee: e.value})} optionLabel="name"/>
        </Sidebar>

        <Timeline
          groups={jobs}
          items={items}
          keys={keys}
          fullUpdate
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={.75}
          canMove={true}
          canResize={"both"}
          defaultTimeStart={visibleTimeStart}
          defaultTimeEnd={visibleTimeEnd}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
        >
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => {
                return <div {...getRootProps()}>
                  <Button icon="pi pi-arrow-right" onClick={this.handleClick}/>
                </div>;
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </div>
    );
  }
}
