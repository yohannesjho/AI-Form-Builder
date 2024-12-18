'use client';

import React, { useState } from 'react';

// Function to fetch the form structure from the backend
async function fetchFormStructure(description) {
  const response = await fetch('/api/form-builder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate form.');
  }
  const data = await response.json();


  return data.text; // Access the parsed form structure
}

export default function FormBuilder() {
  const [formDescription, setFormDescription] = useState('');
  const [formStructure, setFormStructure] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle the submission of form description
  const handleSubmitDescription = async () => {
    setLoading(true);
    setError(null);
    try {
      const form = await fetchFormStructure(formDescription);
      setFormStructure(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render individual form fields dynamically
  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <label key={field.label} className="block mb-4">
            {field.label}:
            <input
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="border rounded-lg p-2 w-full mt-1"
            />
          </label>
        );
      case 'textarea':
        return (
          <label key={field.label} className="block mb-4">
            {field.label}:
            <textarea
              placeholder={field.placeholder}
              required={field.required}
              className="border rounded-lg p-2 w-full mt-1"
            ></textarea>
          </label>
        );
      case 'radio':
        return (
          <fieldset key={field.label} className="block mb-4">
            <legend className="font-semibold">{field.label}:</legend>
            {field.options.map((option) => (
              <label key={option.value} className="block">
                <input type="radio" name={field.label} value={option.value} />
                {option.label}
              </label>
            ))}
          </fieldset>
        );
      case 'checkbox':
        return (
          <fieldset key={field.label} className="block mb-4">
            <legend className="font-semibold">{field.label}:</legend>
            {field.options ? (
              field.options.map((option) => (
                <label key={option.value} className="block">
                  <input type="checkbox" name={field.label} value={option.value} />
                  {option.label}
                </label>
              ))
            ) : (
              <> <input type="checkbox" name={field.label} className='inline' /></>
            )}
          </fieldset>
        );
      case 'submit':
        return (
          <button
            key={field.label}
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-4 py-2 mt-2 rounded-lg"
          >
            {field.label}
          </button>
        );
      default:
        return null;
    }
  };

   // Function to handle printing
   const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Dynamic Form Builder</h1>
      <div className="mb-6">
        <textarea
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          placeholder="Describe the form you want..."
          className="border rounded-lg  p-2 w-full"
        ></textarea>
        <button
          onClick={handleSubmitDescription}
          className="bg-green-500 hover:bg-green-600 duration-300 text-white px-4 py-2 mt-2 rounded"
        >
          Generate Form
        </button>
      </div>

      {loading && <p className="text-white-500 ">Generating form...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {formStructure && (
        <div>
          <form className="border p-4 mt-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">{formStructure.formName}</h2>
            {formStructure.fields.map(renderField)}
          </form>
          <button
            onClick={()=>handlePrint()}
            className="bg-blue-500 hover:bg-blue-600 duration-300 text-white px-4 py-2 mt-4 rounded-lg"
          >
            Print Form
          </button>
        </div>
      )}
    </div>
  );
}