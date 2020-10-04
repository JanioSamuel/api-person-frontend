import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <>
      <div className="container">
        <h1>401</h1>
        <h1>Unauthorized</h1>
        <Link to="/">
          <h4>Go to home page</h4>
        </Link>
      </div>
    </>
  )
}