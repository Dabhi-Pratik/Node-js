import StudentModel from "../model/StudentModel.js";
import HttpError from "../midware/Httperror.js";


// ADD STUDENT
const add = async (req, res, next) => {
  try {
    const student = new StudentModel(req.body);
    await student.save();

    res.status(201).json({
      message: "Student added successfully",
      student,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET ALL STUDENTS
const allStudent = async (req, res, next) => {
  try {
    const students = await StudentModel.find();

    res.status(200).json(students);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// GET BY ID
const studentById = async (req, res, next) => {
  try {
    const student = await StudentModel.findById(req.params.id);

    if (!student) {
      return next(new HttpError("Student not found", 404));
    }

    res.status(200).json(student);
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// DELETE
const deleteStudent = async (req, res, next) => {
  try {
    const student = await StudentModel.findByIdAndDelete(req.params.id);

    if (!student) {
      return next(new HttpError("Student not found", 404));
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// UPDATE (simple)
const updateStudent = async (req, res, next) => {
  try {
    const updateStudentData = await StudentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updateStudentData) {
      return next(new HttpError("failed to update student data", 404));
    }

    res.status(200).json({
      message: "student data updated successfully",
      updateStudentData,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};


// EXPORT
export default {
  add,
  allStudent,
  studentById,
  deleteStudent,
  updateStudent,
};