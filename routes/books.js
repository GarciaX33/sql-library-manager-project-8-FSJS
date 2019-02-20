const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/** get, finds all books**/
router.get('/', function(request, response, next) {
  Book.findAll({order: [['title', 'ASC']]}).then(function(books) {
    response.render('index', {books: books})
  }).catch(function(err) {
    response.send(500)
  })
})
/** get, Shows the create new book form**/
router.get('/new', function (request, response, next) {
  response.render('new-book', {
     book: Book.build()
   })
})
/** post, create new book**/
router.post('/', function(request, response, next) {
  Book.create(request.body).then(function(book) {
      response.redirect('/books');
  }).catch(function(err) {
    if(err.name === 'SequelizeValidationError') {
      response.render('new-book', {
        book: Book.build(request.body),
        errors: err.errors
      })
    } else {
        throw err
    }
  }).catch(function(err) {
      response.send(500)
  })
})
/** post, Update the book **/
router.post('/:id', function(request, response, next) {
  Book.findById(request.params.id).then(function(book) {
    if(book) {
      return book.update(request.body)
    } else {
      response.send(404)
    }
  }).then(function(book) {
      response.redirect('/books')
  }).catch(function(err) {
    if(err.name === 'SequelizeValidationError') {
      var book = Book.build(request.body)
      book.id = request.params.id
      response.render('update-book', {
        book: book,
        errors: err.errors
      })
    } else {
        throw err
    }
  }).catch(function(err) {
    response.send(500)
  })
})
/** get, displays book info **/
router.get('/:id', function(request, response, next) {
  Book.findById(request.params.id).then(function(book) {
    if(book) {
      response.render('update-book', {
        book: book,
        title: book.title
      })
    } else {
      response.send(404)
    }
  }).catch(function(err) {
    response.send(500)
  })
})
/** post, Deletes book. Careful, this can’t be undone **/
router.post('/:id/delete', (request, response) => {
    Book.findById(request.params.id)
      .then(Book => {
          if(Book){
              return Book.destroy();
          } else{
              response.render('error');
          }
      })
      .then(() => response.redirect('/'))
      .catch(err => console.log(err))
});

module.exports = router;
