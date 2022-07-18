import React from 'react'
import { Link } from 'react-router-dom'

export default function Formerror() {
    return (
        <div className="container">
			{
                (new URL(window.location.href)).searchParams.get("m")
            }
            <br/>
            <br/>
            <Link to="/">Go To Home</Link>
		</div>
        
    )
}
