import React, { Component } from 'react';
import * as $ from "axios";
import './App.css';
// import ModalPage from './components/modal';
import Kudos from './components/kudos';
import Title from './components/title';
import { Card, CardBody, CardTitle, CardText, Col } from 'mdbreact';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';
import './components/kudos.css'

class App extends Component {
  state = {
    kudos: [],
    modal: false,
      users: [],
      to: '',
      from: '',
      title: '',
      body: ''
  }

  getUsers = () => {
    $.get('/api/users').then(results => {
      
      this.setState({ users: results.data });
    });
  };

  componentDidMount() {
    this.getUsers()
    this.getKudos();
  }

  getKudos = () => {
    $.get('/api/kudos').then(results => {
      this.setState({ kudos: results.data });
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('click')

    const kudo = {
      title: this.state.title,
      body: this.state.body,
      to: this.state.to,
      from: this.state.from        
    }

    $.post('/api/kudos', kudo ).then(results => {
      this.getKudos()
      this.setState({modal: false})
    })
  }
  

  handleChangeTo = (event) => {
    this.setState({to: event.target.value});
    
  }

  handleChangeFrom = (event) => {
    this.setState({from: event.target.value});
    
  }

  handleChangeTitle = (event) => {
    this.setState({title: event.target.value});
    
  }

  handleChangeBody = (event) => {
    this.setState({body: event.target.value});
    
  }

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
};

  getKudos = () => {
    $.get('/api/kudos').then(results => {
      this.setState({ kudos: results.data });
    });
  };

  // componentDidMount() {
  //   this.getKudos();
    
  // }




  render() {
    return (
      <div className="App">
        <h1 >Tiny Improvements</h1>
        
        <Container>
        <Button onClick={this.toggle}>Give Kudos</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            <h5 className="modal-title" id="exampleModalLabel">Select To & From. Then enter kudo.</h5>
          </ModalHeader>
          <ModalBody>

        <select className="browser-default custom-select toSelect" name="to" onChange={this.handleChangeTo}>
          <option>To</option>
          {this.state.users.map((data => (
          <option value={data._id} key={data._id}>{data.name}</option>
          )))}
          
        </select>

        <select className="browser-default custom-select fromSelect" name="from" onChange={this.handleChangeFrom}>
          <option>From</option>
          {this.state.users.map((data => (
          <option value={data._id} key={data._id}>{data.name}</option>
          )))}
          
        </select>
          
          
            <form >
                <input type="text" name="title" className="kudoTitle" placeholder="Title" onChange={this.handleChangeTitle} /><br />
                <input type="text" name="body" className="kudoBody" placeholder="Enter Text" onChange={this.handleChangeBody} />
            </form><br />
            
            <button color="primary" type="submit" onClick={this.handleSubmit}>Send Kudo</button>
            
          </ModalBody>
          <ModalFooter>
          
            <Button color="secondary" onClick={this.toggle}>Close</Button>{' '}
            
          </ModalFooter>
        </Modal>
      </Container>
        

        <div className="display">
        {this.state.kudos.map((data => (
          <Col>
          <Card style={{ width: "22rem" }} className="card">
            
            <CardBody>
              <CardTitle>
                <Title 
                key={data._id}
                id={data._id}
                to={data.to.name}
                from={data.from.name}
                />
              </CardTitle>
              <CardText>
              <Kudos 
            key={data._id}
            id={data._id}
            
            title={data.title}
            body={data.body}

          />
              </CardText>
              
            </CardBody>
          </Card>
        </Col>
          
        )))}
        </div>
    
      </div>
    );
  }
}

export default App;