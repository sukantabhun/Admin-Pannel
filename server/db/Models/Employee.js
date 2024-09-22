import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: [String], required: true },
  imgUpload: { type: String },
  employeeId: { type: Number, unique: true },
  createData: {type: Date},
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
