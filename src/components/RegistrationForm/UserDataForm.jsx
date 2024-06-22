import React, { useState } from 'react';
import './UserDataForm.css';
import '../Fixtures/Participants.css'

function UserDataForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [count, setCount] = useState(1); // Initial count value
  const [data, setData] = useState([]); // Array to store form data

  const handleSubmit = (event) => {
    event.preventDefault();

    const fullName = `${firstName} ${lastName}`; // Concatenate first name and last name
    const userData = {
    id: count,
    name: fullName,
    age,
    };

    // Update the count
    setCount(count + 1);

    // Add the userData to the data array
    setData([...data, userData]);

    // Clear form after submission
    setFirstName('');
    setLastName('');
    setAge(0);

    // alert('Data submitted successfully!');
  };

  const handleDownload = () => {
    // Create a blob with the JSON data
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'userData.json';

    // Trigger a click event on the link to prompt the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
    <div className='form_container'>
      <div className='h1_cover'>
        <div className='glass_cover'></div>
        <h1>Player <br/>Registration</h1>  
        <img className='cover_img' src="./images/add_participants.jpg" alt="cover" />
      </div>
      
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          required
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))} // Parse to integer
        />
        <br />
        <button className='btnSubmit' type="submit">Submit</button>
        
      </form>

      </div>
      <div className='m_container'>
      
        <div className='p_container'>  
        {count > 8 && <button className='btnDownload' onClick={handleDownload}>Download Data</button>}  
        
          <h3>Registered Players</h3>
            <span className='h3_line'></span>
            <div className='p_items'>
              <ul>
                {data.map((participant) => (
                  <li className='list_p' key={participant.id}>{participant.id}. {participant.name}</li>
                ))}
              </ul>
          </div>    
        </div>
        </div>

    </div>

  );
}

export default UserDataForm;
