import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const PatientComponent = () => {
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [newPatient, setNewPatient] = useState({
      name: '',
      email: '',
      gender: '',
      password: '',
      confirmPassword: '',
      age:'',
      // Add other fields here
  });

  useEffect(() => {
      fetchPatients();
  }, [patients]);

  const fetchPatients = () => {
      axios.get('http://localhost:3001/patients')
          .then((response) => {
              setPatients(response.data);
          })
          .catch((error) => {
              console.error('Error fetching patients:', error);
          });
  };

  const handleClose = () => {
      setShowModal(false);
      setSelectedPatient(null);
      setNewPatient({
          name: '',
          email: '',
          gender: '',
          password: '',
          confirmPassword: '',
          age:''
          // Reset other fields here
      });
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setNewPatient({
          ...newPatient,
          [name]: value,
      });
  };

  const handleUpdate = () => {
      console.log(selectedPatient._id); // Correctly access the ID as `_id`

      if (!selectedPatient || !selectedPatient._id) {
          console.error('Selected patient or ID is undefined.');
          return;
      }

      axios
          .put(`http://localhost:3001/patients/${selectedPatient._id}`, newPatient)
          .then((response) => {
              fetchPatients(); // Fetch updated patient list from the server
              handleClose();
          })
          .catch((error) => {
              console.error('Error updating patient:', error);
          });
  };

  const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/patients/${id}`)
          .then(() => {
              fetchPatients(); // Fetch updated patient list from the server
          })
          .catch((error) => {
              console.error('Error deleting patient:', error);
          });
  };

  const handleShow = (patient) => {
      setSelectedPatient(patient); // Set the selected patient
      setNewPatient({
          name: patient.name,
          gender: patient.gender,
          email: patient.email,
          password: patient.password,
          confirmPassword: patient.confirmPassword,
          age: patient.age
          // Set other patient fields
      });
      setShowModal(true); // Show the modal
  };
  const renderPatients = () => {
    return patients.map((patient) => (
      <Card key={patient._id} style={{ margin: '10px', padding: '15px', width: '300px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title> Name: {patient.name}</Card.Title>
              <Card.Text>Age: {patient.age}</Card.Text>

              <Card.Text> Gender: {patient.gender}</Card.Text>
            </Col>
            <Col xs="auto">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button variant="primary" size="sm" style={{ marginBottom: '5px' }} onClick={() => handleShow(patient)}>Update</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(patient._id)}>Delete</Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Patient Management</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderPatients()}
      </div>
             
          
             <Modal show={showModal} onHide={handleClose}>
             
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPatient ? 'Update Patient' : 'Add Patient'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newPatient.name}
                                // value={}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Gender</Form.Label>
                            <Form.Control
                                type="text"
                                name="gender"
                                value={newPatient.gender}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={newPatient.email}
                                // value={}
                                onChange={handleChange}
                            />
                        </Form.Group>
                       
                        <Form.Group>
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                name="age"
                                value={newPatient.age}
                                // value={}
                                onChange={handleChange}
                            />
                        </Form.Group>


                        {/* Add other input fields for patient details */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {selectedPatient ? (
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    ) : (
                        <Button variant="primary" >
                            Add
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PatientComponent;
