import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Patient.css';

function PatientInfo() {
    const [showDetails, setShowDetails] = useState(true);
    const [userData, setUserData] = useState(null);
    const location = useLocation();
    const state = location.state;

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    useEffect(() => {
        if (showDetails) {
            fetch(`http://localhost:3000/api/patients/${state.patientId}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setUserData(data);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });

        }
    }, []);
 
    const getTemperatureCondition = (temp) => {
        if (temp > 99&&temp < 101) {
            return 'Mild fever';
        }
        else if(temp > 105)
        {
            return 'Critical,Consult Doctor.';
        }
        return 'Normal';
    };

    const getSpO2Condition = (spo2) => {
        if (spo2 < 90) {
            return 'Low SpO2 levels detected.';
        }
        
        return 'Normal';
    };
    const getHeartrateCondition = (HeartRate) => {
        if (HeartRate < 60) {
            return 'Low Bpm(Beats Per Minute) levels detected.';
        }
        else if(HeartRate >100)
        {
            return 'High Bpm(Beats Per Minute) levels detected.';
        }
        return 'Normal';
    };
    const getBloodPressureCondition = (BloodPressure) => {
        if (BloodPressure < 90) {
            return 'Low Bp levels detected.';
        }
        else if(BloodPressure < 130)
        {
            return 'High Bp levels detected.';
        }
        return 'Bp levels are within normal range.';
    };
      
    return (
        <div className="container">
            <div className="header">
                <div className="top">
                    <h2 style={{ color: 'white' }}>Hello {userData ? userData.name : 'Guest'}...!</h2>
                </div>
                <div className="top-left" onClick={toggleDetails}></div>
            </div>
            {showDetails && (
                <div className="personal-details" style={{ color: 'white' }}>
                    <h2>Personal Details</h2>
                    {userData ? (
                        <div style={{ color: 'white' }}>
                            <p><b>Name: {userData.name}</b></p>
                            <p><b>ID: {userData.patientId}</b></p>
                            <p><b>Mobile Number: {userData.Mobile}</b></p>
                            <p><b>Email: {userData.email}</b></p>
                            {/* Include other user details here */}
                        </div>
                    ) : (
                        <p>Loading user details...</p>
                    )}

                </div>
            )}

            <div className="row health-data">
                <div className="col-md-3">
                    <div className="data-item temperature">
                        <h2>Temperature</h2>
                        <p>{userData ? userData.temperature : 22}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="data-item heart-rate">
                        <h2>Heart Rate</h2>
                        <p>{userData ? userData.HeartRate : 'Loading...'}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="data-item spo2">
                        <h2>SpO2</h2>
                        <p>{userData ? userData.spo2 : 'Loading...'}</p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="data-item pulse">
                        <h2>Blood Pressure(BP)</h2>
                        <p>{userData ? userData.BloodPressure : 'Loading...'}</p>
                    </div>
                </div>
            </div>

            <div className="row health-details">
                <div className="col-md-6">
                    <div className="health-condition">
                        <h2>Health Condition</h2>
                        <p>Temperature: {userData ?getTemperatureCondition(userData.temperature) : 'Loading...'}</p>
                        <p>SPO2 value: {userData ?getSpO2Condition(userData.spo2) : 'Loading...'}</p>
                        <p>Heart Rate: {userData ?getHeartrateCondition(userData.HeartRate) : 'Loading...'}</p>
                        <p>Blood Pressure: {userData ?getBloodPressureCondition(userData.BloodPressure) : 'Loading...'}</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="doctor-prescription">
                        <h2>Prescription</h2>
                        <p>
                            {userData
                                ? `Hi ${userData.name}, ${userData.Description}`
                                : 'Loading...'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PatientInfo;
