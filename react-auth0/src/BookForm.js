import React from 'react';
import './BookForm.css'

class BookForm extends React.Component {
  constructor() {
    super();
    this.state = {
      author: "",
      title: ""
    };
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  render() {
    return <div className="formContainer">
    <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <div className="row">
            <label className="col-50" htmlFor="author">Author</label><input type="text" name="author" value={this.state.author} onChange={(e)=> this.handleAuthorChange(e)}/>
        </div>
        <div className="row">
            <label className="col-50" htmlFor="title">Title</label><input type="text" name="title" value={this.state.title} onChange={(e)=> this.handleTitleChange(e)}/>
        </div>
        <div className="row">
            <input type="submit" value="Submit book"/>
        </div>
    </form>
    </div>;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const accessToken = this.props.auth.getAccessToken();

    fetch("/api/books", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
    })
    }).then((response) => {
      if (response.ok) {
        this.props.history.push("/");
      } else {
        alert(response.statusText);
      }
    });

    console.log("submitting " + JSON.stringify(this.state));
  }
}

export default BookForm;
