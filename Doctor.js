import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctor.css'; 

function DoctorPage() {
  const [patientId, setPatientId] = useState('');
  const [healthValues, setHealthValues] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (patientId) {
      setLoading(true);
      axios.get(`http://localhost:3000/api/patients/${patientId}`)
        .then((response) => {
          setHealthValues(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching patient data:', error.response.data.message);
          setHealthValues(null);
          setLoading(false);
        });
    }
  }, [patientId]);

  const handlePrescriptionSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { ...healthValues, Description: prescription };
      // Update only the Description field
      await axios.post(`http://localhost:3000/api/patients/${patientId}`, { Description: prescription });
      console.log('Prescription saved successfully');
    } catch (error) {
      console.error('Error saving prescription:', error.response.data.message);
    }
  };
  

  return (
    <div className="doctor-page-container">
      <h1>Doctor's Page</h1>
      <form>
        <label>
          Enter Patient ID:
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
          />
        </label>
      </form>

      {loading && <p>Loading health values...</p>}

      {healthValues && (
        <div className="health-values-container">
          
          <h2>Patient Health Values</h2>
          <p>Name:{healthValues.name}</p>
          <p>Phone No:{healthValues.Mobile}</p>
          <p>Email:{healthValues.email}</p>
          <p>Temperature: {healthValues.temperature}</p>
          <p>Heart Rate: {healthValues.HeartRate}</p>
          <p>SpO2: {healthValues.spo2}</p>
          <p>Blood Pressure: {healthValues.BloodPressure}</p>

          <form onSubmit={handlePrescriptionSubmit}>
            <label>
              Enter Prescription:
              <textarea
                value={prescription}
                onChange={(e) => setPrescription(e.target.value)}
              />
            </label>
            <button type="submit">Submit Prescription</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DoctorPage;
