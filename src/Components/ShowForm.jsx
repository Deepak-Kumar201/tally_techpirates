import React from 'react';
import './Styles/ShowForm.css';

export default function ShowForm() {
    return (
    <div className='showForm-full'>
        <div className='showForm'>
            <div className='showForm-id'>
                <p className='showForm-Id-name'>Form Id: </p>
                <p><a href="" className='showForm-Id-link'>https://docs.google.com/forms/d/14QfsZF621_-QTrrWBuv6ge2VXaMM30B0liHQudd5vUo/edit#response=ACYDBNj25pNlInSgEWCYVKC6w07DGdVatN608zQGvJx5iyc0sh4BJrir00oIMBa-lA9wJus</a></p>
            </div>
            <div className='showForm-form'>
                <h2 className='showForm-form-head'>Here Is Your Form</h2>
            </div>
        </div>
    </div>
    );
}
