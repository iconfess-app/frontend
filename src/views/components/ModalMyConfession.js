/* eslint-disable no-console */
import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import confessionService from '../../services/confessionService';

class ModalMyConfession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isDeleted: false,
      deleteConfession: '',
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  openModal() {
    this.setState({ open: true });
  }

  closeModal() {
    this.setState({ open: false });
  }

  handleDelete(event) {
    event.preventDefault();
    try {
      const deletedConfession = confessionService.deleteConfession(this.props.confessionId);
      console.log(deletedConfession);
      this.setState({
        open: true,
        isDeleted: true,
        deletedConfession,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const cardStyle = {
      border: '1px solid black',
      marginBottom: '16px',
      borderRadius: '25px',
      padding: '16px',
    };
    const inline = {
      display: 'inline-block',
      marginRight: '16px',
    };
    const { modal } = this.state;
    const { description, date, time, likesCounter, category, confessionId } = this.props;
    console.log(this.props);
    return (
      <Popup trigger={<button className="button"> {description} </button>} modal>
        {close => (
          <div className="card modal" style={cardStyle}>
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="card-header">
              <span className="avatar">{date}</span>
              <p className="time" style={inline}>
                {time}
              </p>
            </div>
            <div className="description">
              <p>{description}</p>
            </div>
            <div className="card-footer">
              <p style={inline}>{category}</p>
              <p style={inline}>{likesCounter} likes</p>
              <p style={inline}>
                <button onClick={this.handleDelete}>Delete</button>
              </p>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

export default ModalMyConfession;
