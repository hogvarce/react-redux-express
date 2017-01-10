import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as noteAction from './actions/noteAction'
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: ""
        };
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.actions.addNote(this.state).then(() => {
            this.setState({
                title: "",
                text: ""
            });
        });
    }

    onChangeInput(field, e) {
        this.setState({
            [field]: e.target.value
        });
    }

    onHandleRemove(id) {
        this.props.actions.removeNote(id);
    }

    render() {
        let {notes} = this.props || [];
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <div className="container">
                <Form inline onSubmit={this.onSubmit.bind(this)}>
                    <FormGroup controlId="formInlineName">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl value={this.state.title} type="text" placeholder="Jane Doe"
                                     onChange={this.onChangeInput.bind(this, "title")}/>
                    </FormGroup>
                    <FormGroup controlId="formInlineEmail">
                        <ControlLabel>Text</ControlLabel>
                        <FormControl value={this.state.text} type="text" placeholder="text..."
                                     onChange={this.onChangeInput.bind(this, "text")}/>
                    </FormGroup>
                    <Button type="submit">
                        Send invitation
                    </Button>
                </Form>
                    <div className="row">
                        {notes.map(note => {
                            return <div className="col-sm-4" key={note._id} onClick={this.onHandleRemove.bind(this, note._id)}>
                                <div>{note.title}</div>
                                <div>{note.text}</div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        notes: state.noteReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(noteAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
