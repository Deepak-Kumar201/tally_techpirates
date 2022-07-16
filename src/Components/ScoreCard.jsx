import React from 'react'
import './Styles/ScoreCard.css';

export default function ScoreCard() {
  return (
    <div className='scorecard'>
        <div className='scorecard-left'>
            <div className='scorecard-name'>
                <h4>Username</h4>
            </div>
        </div>
        <div className='scorecard-right'>
            <div className='scorecard-score'>
                <h4>50</h4>
            </div>
        </div>
    </div>

  );
}
