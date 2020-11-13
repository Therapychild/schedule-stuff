import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {JobListItem} from "./JobListItem";
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {ApolloError, makeVar, QueryResult, useQuery} from "@apollo/client";
import {SCHEDULE_GET_USERS} from "../util/clientSchema";
import {TMode} from "../types/mode";

// import "../styles/list.css";

export interface Props {
  viewMode: TMode;
}

export function WindowedListBox(props: Props) {
  const [count, setCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [activeId, setActiveId] = useState();
  // const assignToActive = makeVar();

  const {loading: usersLoading, error: usersError, data: usersData}: QueryResult = useQuery(SCHEDULE_GET_USERS, {
    onCompleted: (data) => {
      setCount(data.scheduleGetUsers.length);
    },
    onError: (error: ApolloError) => {
      console.log("ERROR on userData", error);
    },
  });

  const onSetActive = (id: any) => {
    setActiveId(id);
  }

  const onAssign = (id: string | number) => {
    // assignToActive(id);
  }

  function renderRow(props: ListChildComponentProps) {
    const {index, style} = props;
    let id = index;
    return (
      <ListItem button={true} onClick={() => {
        onSetActive(id)
      }} style={style} key={index}>
        <JobListItem id={"id"} primaryText={"Text"} buttonText={"Assign"}
                     execute={onAssign}/>
      </ListItem>
    );
  }

  return (
    <div>
      <FixedSizeList
        height={300}
        itemCount={count}
        itemSize={35}
        width={300}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
}






