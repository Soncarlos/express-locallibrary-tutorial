const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const allStatus = [
  "Available",
  "Maintenance",
  "Loaned",
  "Reserved",
  "Not Available",
];
// Display list of all BookInstances.
exports.bookinstance_list = asyncHandler(async (req, res, next) => {
  const allBookInstances = await BookInstance.find().populate("book").exec();
  res.render("bookinstance_list", {
    title: "Book Instance List",
    bookinstance_list: allBookInstances,
  });
});

// Display detail page for a specific BookInstance.

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
  const bookinstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();

  if (bookinstance === null) {
    const err = new Error("Copy not Found");
    err.status = 404;
    return next(err);
  }
  res.render("book_instance_detail", {
    title: " Copy Details",
    bookinstance: bookinstance,
  });
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = asyncHandler(async (req, res, next) => {
  const allBooks = await Book.find({}, "title").exec();
  res.render("bookinstance_form", {
    title: "Create BookInstance",
    book_list: allBooks,
    statuses: allStatus,
  });
});

// Handle BookInstance create on POST.
exports.bookinstance_create_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", " Invalid Date")
    .optional({ checkFalsy: false })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookInstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, "title").exec();

      res.render("bookinstance_form", {
        title: "Create BookInstance",
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        bookinstance: bookInstance,
        statuses: allStatus,
        errors: errors.array(),
      });
      return;
    } else {
      await bookInstance.save();
      res.redirect(bookInstance.url);
    }
  }),
];

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = asyncHandler(async (req, res, next) => {
  const bookInstance = await BookInstance.findById(req.params.id)
    .populate("book")
    .exec();
  res.render("bookinstance_delete", {
    title: "Delete Book Instance",
    bookinstance: bookInstance,
  });
});

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = asyncHandler(async (req, res, next) => {
  await BookInstance.findByIdAndRemove(req.body.bookinstanceid);
  res.redirect("/catalog/bookinstances");
});

// Display BookInstance update form on GET.
exports.bookinstance_update_get = asyncHandler(async (req, res, next) => {
  const [bookInstance, allBooks] = await Promise.all([
    BookInstance.findById(req.params.id).exec(),
    Book.find({}, "title").exec(),
  ]);

  res.render("bookinstance_form", {
    title: "Update Instance - Book",
    book_list: allBooks,
    selected_book: bookInstance.book._id,
    bookinstance: bookInstance,
    statuses: allStatus,
  });
});

// Handle bookinstance update on POST.
exports.bookinstance_update_post = [
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", " Invalid Date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      const allBooks = await Book.find({}, "title").exec();

      res.render("bookinstance_form", {
        title: "Update Instance - Book",
        book_list: allBooks,
        selected_book: bookinstance.book._id,
        bookinstance: bookinstance,
        statuses: allStatus,
        errors: errors.array(),
      });
      return;
    } else {
      theinstance = await BookInstance.findByIdAndUpdate(
        req.params.id,
        bookinstance,
        {}
      );
      res.redirect(theinstance.url);
    }
  }),
];
