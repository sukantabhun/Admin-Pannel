import React from 'react';
import {useNavigate} from 'react-router-dom'
import './index.css'
const EmployeeEntry = ({ employee, count, onDelete }) => {
 const navigate = useNavigate()

  const onClickDelete = async () => {
    console.log(employee)
    onDelete(employee._id);
  }

  const onClickEdit = () => {
    navigate(`/edit-employee/${employee._id}`);
  };

  const imgSrc = employee.imgUpload
    ? `data:image/jpeg;base64,${employee.imgUpload}`
    : null;

  function extractDate(isoString) {
      return isoString.split('T')[0];
    }
    
  return (
    <tr>
      <td>{count}</td>
      <td><img src={imgSrc} alt={employee.name} className='image-style-logo'/></td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.mobileNo}</td>
      <td>{employee.designation}</td>
      <td>{employee.gender}</td>
      <td>{employee.course}</td>
      <td>{extractDate(employee.createData)}</td>
      <td className='btn-container'>
        <button type='button' onClick={onClickEdit} className='action-button-edit'>Edit</button>
        <button type='button' onClick={onClickDelete}  className='action-button-delete'>Delete</button>
      </td>
    </tr>
  );
};

export default EmployeeEntry;
