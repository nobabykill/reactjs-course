import React, { Component } from 'react';
import Persons from '../components/persons/Persons';
import Cockpit from '../components/cockpit/cockpit';
import classes from './App.module.css';
import withClass from '../hoc/withClass';
import Aux from '../hoc/aux';
import AuthContext from '../context/auth-context';

const listPersons = [
  { id: 1, name: "Ha", age: 22 },
  { id: 2, name: "Khue", age: 23 },
  { id: 3, name: "Linh", age: 24 },
];

class App extends Component {
  state = {
    persons: [...listPersons],
    showPersons: true,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => id === person.id);
    const persons = [...this.state.persons];

    const newPerson = { ...persons[personIndex] };
    newPerson.name = event.target.value ? event.target.value : String.fromCharCode(160);
    persons[personIndex] = newPerson;

    this.setState((prevState) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  }

  clickDeleteHandler = (id) => {
    const personIndex = this.state.persons.findIndex(person => id === person.id);
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);

    this.setState({ persons: persons });
  }

  toggleHideCardHandler = () => {
    const isShow = this.state.showPersons;
    this.setState({ showPersons: !isShow });
  }

  resetHandler = () => {
    this.setState({
      persons: [...listPersons],
      showPersons: true,
      changeCounter: 0,
    });
  }

  toggleShowCockpit = () => {
    const isShow = this.state.showCockpit;
    this.setState({ showCockpit: !isShow });
  }

  loginHandler = () => {
    const isAuthen = this.state.authenticated;
    this.setState({ authenticated: !isAuthen });
  }

  render() {
    let persons = null;
    let cockpit = null;

    if (this.state.showPersons === true) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            changedName={this.nameChangedHandler}
            clickDelete={this.clickDeleteHandler}
          />
        </div>
      );
    }

    if (this.state.showCockpit === true) {
      cockpit = (
        <Cockpit
          showPersons={this.state.showPersons}
          appTitle={this.props.appTitle}
          toggleHideCardHandler={this.toggleHideCardHandler}
          resetHandler={this.resetHandler}
        />
      );
    }

    return (
      // can use built-in React.Fragment, work same way
      <Aux>
        <button onClick={this.toggleShowCockpit}>show cockpit</button>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler,
        }}>
          {cockpit}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);
