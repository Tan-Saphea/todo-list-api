const Todo = require("../models/todo.model");

// add task
exports.create = async (req, res, next) => {
  try {
    //doc
    const doc = await Todo.create(req.body);
    res.status(201).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};

// find all task
exports.findAll = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.completed) {
      filter.completed = req.query.completed === "true";
    }

    const todos = await Todo.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: todos.length,
      result: todos,
    });
  } catch (error) {
    next(error);
  }
};

// findOne task
exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Todo.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!!",
      });
    }
    res.status(200).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};

// update task
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Todo.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!!",
      });
    }
    res.status(201).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};

//delete task
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await Todo.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Todo not found!!",
      });
    }
    res.status(200).json({
      success: true,
      result: "Delete Successfully",
    });
  } catch (error) {
    next(error);
  }
};
