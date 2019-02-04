import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from 'react-apollo';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const TodosQuery = gql`
{
  todos {
    id
    text
    complete
  }
}
`;

class App extends Component {
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { 
      data: { loading, todos }
    } = this.props;
    if (loading) {
      return null;
    }
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ margin: 'auto', width: 400 }}>
          <Paper elevation={1}>
          {todos.map(todo => <div key={`${todo.id}-todo-item`}>{todo.text}</div>)}
          <List>
        {[0, 1, 2, 3].map(value => (
          <ListItem key={value} role={undefined} dense button onClick={this.handleToggle(value)}>
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
          </Paper>
        </div>
      </div>
    );  
  }
}

export default graphql(TodosQuery)(App);


class CheckboxList extends React.Component {
  state = {
    checked: [0],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

