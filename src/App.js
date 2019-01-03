import React from 'react'
import { Route } from 'react-router-dom'
import { getAll, update } from './BooksAPI'
import Main from '../src/pages/Main'
import Search from '../src/pages/Search'
import './App.css'

class BooksApp extends React.Component {
  state = { books: [] }

  componentDidMount() {
    getAll()
      .then(books => this.setState({ books }))
  }

  updateBook = (book, shelf) => {
    update(book, shelf).then(() => {
      const { books } = this.state
      const updatedBooks = books.map(foundedBook => {
        if(foundedBook.id === book.id) {
          foundedBook.shelf = shelf
        }
        return foundedBook
      });
      this.setState({ books: updatedBooks})
    })
  }

  render() {
    const { books } = this.state;
    return (
      <div>
        <Route exact path='/' render={()=>(
          <Main books={books} updateBook={this.updateBook} />
        )}/>
        <Route path='/search' render={()=>(
          <Search shelfBooks={books} updateBook={(book, shelf) => {
            this.updateBook(book, shelf)
          }} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
