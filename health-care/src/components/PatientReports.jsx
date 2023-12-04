import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Modal, Row, Col } from 'react-bootstrap';
// import pdfjs from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';



const PatientReport = () => {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState({});
  const [pdfImage, setPdfImage] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {

        const userId = localStorage.getItem('userId');
        console.log(userId)
        const userRole = localStorage.getItem('userRole');
        console.log(userRole)
        if (userRole === 'patient'){
        const response = await axios.get(`http://localhost:3001/userReports/${userId}`);
        setReports(response.data);
        } else if(userRole === 'admin'){
            const response = await axios.get('http://localhost:3001/userReports');
            setReports(response.data);        
        }else{
            console.log('Unauthorized access to appointments');
        }
      console.log(reports)
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/reports/${id}`);
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleShow = async (report) => {
    setSelectedReport(report);
    setShowModal(true);

    try {
      const pdfData = await axios.get(`http://localhost:3001/userReports`, {
        responseType: 'arraybuffer',
      }).reportFile;
      console.log(pdfData)

      // Convert the first page of the PDF to an image
    //   const loadingTask = pdfjs.getDocument(new Uint8Array(pdfData.data));
    const loadingTask = getDocument(new Uint8Array(pdfData.data));

    console.log(loadingTask)
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      await renderTask.promise;

      // Convert the canvas content to a data URL
      const imageSrc = canvas.toDataURL('image/png');
      setPdfImage(imageSrc);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

const renderReports = () => {
    return reports.map((report) => (
      <Card
        key={report._id}
        style={{
          margin: '10px',
          padding: '15px',
          width: '300px',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
      >
        <Card.Body>
          <Row>
            <Col>
              <Card.Title>{report.reportName}</Card.Title>
              <Card.Subtitle>{new Date(report.uploadedAt).toLocaleString()}</Card.Subtitle>
            </Col>
            <Col xs="auto">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Button variant="danger" size="sm" onClick={() => handleDelete(report._id)}>
                  Delete
                </Button>
                <Button variant="primary" size="sm" onClick={() => handleShow(report)}>
                  Show
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Report Management</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {renderReports()}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Additional details or full report content can be displayed here.</p>
          <img src={pdfImage} alt="PDF First Page" style={{ width: '100%' }} />
          {/* Display additional details or report content */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientReport;


