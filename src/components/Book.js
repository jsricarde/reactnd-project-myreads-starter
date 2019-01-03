import React, { Component } from 'react'
import PropTypes from 'prop-types'
export default class Book extends Component {
  state = { shelf: 'move'}

  componentDidMount(){
    const { book } = this.props;
    this.setState({shelf: book.shelf});
  }

  handleOnChangeSelect = (event) => {
    const { book, updateBook } = this.props;
    const shelf = event.target.value;
    this.setState({ shelf })
    if (shelf !== book.shelf) {
      updateBook(book, shelf);
    }
  }

  render() {
    const { title, authors, imageLinks } = this.props.book;
    const backgroundImage = (imageLinks && 'thumbnail' in imageLinks) ? `url(${imageLinks.thumbnail})` : 'url()';
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 188,
              backgroundImage,
              backgroundColor: '#cccccc'
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.handleOnChangeSelect} value={this.state.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors && authors.join()}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string, authors: PropTypes.array, imageLinks: PropTypes.object, shelf: PropTypes.string
  }),
  updateBook: PropTypes.func.isRequired
};
