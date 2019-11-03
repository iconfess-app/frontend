import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { Redirect } from 'react-router-dom';

class CardMyConfession extends Component {

  redirect = () => {
    return <Redirect to="/myconfessions" />
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
    const { date, description, category, time, likesCounter, onDelete, } = this.props;
    return (
      <div className="card" style={cardStyle}>
        <div className="card-header">
          <span className="avatar">{date}</span>
          <p className="time" style={inline}>{time}</p>
        </div>
        <div>
          <p>{description}</p>
          <p>{category}</p>
          <p>{likesCounter}</p>
          <Popup trigger={<button>Delete</button>} position="right center">
            <div>
              Are you sure you want to delete?
            <button onClick={onDelete}>Yes</button>
              <button onClick={this.redirect}>No</button>
            </div>
          </Popup>
        </div>
      </div>
    );
  }
}

export default CardMyConfession;


    // import React from 'react';
    // import Popup from 'reactjs-popup';
    // import confessionService from '../../services/confessionService';
// import {Route} from 'react-router-dom';
        // import ModalMyConfession from './ModalMyConfession';

// const CardConfession = props => {
//   const cardStyle = {
//     border: '1px solid black',
//     marginBottom: '16px',
//     borderRadius: '25px',
//     padding: '16px',
//   };
//   const inline = {
//     display: 'inline-block',
//     marginRight: '16px',
//   };
//   const { date, description, category, time, likesCounter, id } = props;

//   return (
//     <div className="card" style={cardStyle}>
//       <div className="card-header">
//         <span className="avatar">{date}</span>
//         <p className="time" style={inline}>
//           {time}
//         </p>
//       </div>
//       <div className="description">
//         <p>{description} </p>
//         <p>{likesCounter} </p>
//         <p>{category}</p>
//         <button>Delete</button>
//         {/* <NavLink to={`/${id}`} activeClassName="selectedConfession">
//           {description}
//         </NavLink> */}
//         </div>
//       <Route
//         exact
//         path="/:id"
//         // component={ModalMyConfession}
//         render={myconfession => (
//           <ModalMyConfession
//             {...myconfession}
//             description={description}
//             likesCounter={likesCounter}
//             category={category}
//             confessionId={id}
//           />
//         )}
//       ></Route>
//       <div className="card-footer">
//         <p style={inline}>{category}</p>
//         <p style={inline}>{likesCounter} likes</p>
//         <p style={inline}>
//           <a href="/">Delete</a> */
//         /* </p>
//       </div>
//     </div>
//   );
// };

// export default CardConfession;
