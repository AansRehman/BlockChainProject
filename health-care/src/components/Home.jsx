import React from 'react';

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-5">Welcome to Our Healthcare System</h1>

      {/* Features Section */}
      <section className="mt-5">
        <h2 className="text-center mb-4">Key Features</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 bg-primary text-white">
              <div className="card-body">
                <h5 className="card-title">Patient Records</h5>
                <p className="card-text">Manage and store patient records securely.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 bg-success text-white">
              <div className="card-body">
                <h5 className="card-title">Appointments</h5>
                <p className="card-text">Schedule and manage appointments easily.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 bg-info text-white">
              <div className="card-body">
                <h5 className="card-title">Reports Upload</h5>
                <p className="card-text">Doctors can upload patient reports securely.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-5">
        <h2 className="text-center mb-4">About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero et ex tincidunt, id vestibulum arcu aliquam.</p>
      </section>
    </div>
  );
};

export default Home;
