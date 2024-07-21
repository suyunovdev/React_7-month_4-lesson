// import React, { useState } from 'react';
// import { useStudentState, useStudentDispatch } from './StudentContext';
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const StudentApp = () => {
//   const students = useStudentState();
//   const dispatch = useStudentDispatch();
//   const navigate = useNavigate();
//   const [editId, setEditId] = useState(null);
//   const [editFirstName, setEditFirstName] = useState('');
//   const [editLastName, setEditLastName] = useState('');
//   const [editGroup, setEditGroup] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterGroup, setFilterGroup] = useState('');

//   const handleEdit = (id, firstName, lastName, group) => {
//     setEditId(id);
//     setEditFirstName(firstName);
//     setEditLastName(lastName);
//     setEditGroup(group);
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setEditId(null);
//     setEditFirstName('');
//     setEditLastName('');
//     setEditGroup('');
//     setIsEditing(false);
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     const updatedStudent = {
//       id: isEditing ? editId : Date.now(),
//       firstname: editFirstName,
//       lastname: editLastName,
//       group: editGroup,
//     };

//     if (isEditing) {
//       dispatch({ type: 'UPDATE_STUDENT', payload: updatedStudent });
//       toast.success('Student muvaffaqiyatli yuklandi');
//     } else {
//       dispatch({ type: 'ADD_STUDENT', payload: updatedStudent });
//       toast.success('Student muvaffaqiyatli qushildi');
//     }

//     setEditId(null);
//     setEditFirstName('');
//     setEditLastName('');
//     setEditGroup('');
//     setShowModal(false);
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setEditFirstName('');
//     setEditLastName('');
//     setEditGroup('');
//     setShowModal(false);
//   };

//   const handleDelete = (id) => {
//     dispatch({ type: 'DELETE_STUDENT', payload: id });
//     toast.success(`Student muvaffaqiyatli yo'q qilindi`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('authToken'); 
//     navigate('/login'); 
//   };

//   const filteredStudents = students.filter(
//     student =>
//       (student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.group.toLowerCase().includes(searchTerm.toLowerCase())) &&
//       (filterGroup === '' || student.group === filterGroup)
//   );

//   return (
//     <div className="App">
//       <h1 className="text-center">Student List</h1>
//       <Button variant="danger" onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</Button>
//       <div className='biggest'>
//         <div className="search-bar">
//           <Form.Control
//             className='searches'
//             type="text"
//             placeholder="Search by first name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="filter-group">
//           <Form.Control
//             as="select"
//             value={filterGroup}
//             onChange={(e) => setFilterGroup(e.target.value)}
//           >
//             <option value="">All Groups</option>
//             {Array.from(new Set(students.map(student => student.group))).map(group => (
//               <option key={group} value={group}>{group}</option>
//             ))}
//           </Form.Control>
//         </div>
//         <Button variant="success" onClick={handleAdd} style={{ marginBottom: '20px' }}>Add Student</Button>
//       </div>
//       <table className="tabless table table-striped table-bordered table-hover table-responsive-sm">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Group</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(filteredStudents) && filteredStudents.length > 0 ? (
//             filteredStudents.map(student => (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.firstname}</td>
//                 <td>{student.lastname}</td>
//                 <td>{student.group}</td>
//                 <td className='buttonss'>
//                   <Button className='glow-on-hover' variant="primary" onClick={() => handleEdit(student.id, student.firstname, student.lastname, student.group)}>✍️</Button>
//                   <Button className='glow-on-hover' variant="danger" onClick={() => handleDelete(student.id)}>🗑️</Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5">No students available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <Modal show={showModal} onHide={handleCancel}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? 'Edit Student' : 'Add Student'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="formFirstName">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={editFirstName}
//               onChange={(e) => setEditFirstName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formLastName">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control
//               type="text"
//               value={editLastName}
//               onChange={(e) => setEditLastName(e.target.value)}
//             />
//           </Form.Group>
//           <Form.Group controlId="formGroup">
//             <Form.Label>Group</Form.Label>
//             <Form.Control
//               type="text"
//               value={editGroup}
//               onChange={(e) => setEditGroup(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel}>
//             ⛔
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             ✅
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <ToastContainer />
//     </div>
//   );
// };

// export default StudentApp;
