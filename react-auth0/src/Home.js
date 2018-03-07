import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css'

class Home extends React.Component {
  constructor() {
      super();
      this.state = {bookList: []};
  }

  componentDidMount() {
    const accessToken = this.props.auth.getAccessToken();
    
    fetch("/api/books", {headers: new Headers({
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
    })})
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          if (response.status === 403) {
            alert("You are not authorized!")
          }          
        })
        .then(books => this.setState({bookList: books || []}))
        .catch(error => console.log(error))
  }

  render() {
    let bookList = this.state.bookList.map((book) => <li><i>{book.author}</i> - <h3>{book.title}</h3></li>);
    let addBookButton = this.props.auth.hasScopes(["write:books"])? <Link to="/bookForm">Add a book</Link> : null;

    return  <div>
              {addBookButton}
              <ul>
                {bookList}
              </ul>
            </div>;
  }

}

export default Home;

