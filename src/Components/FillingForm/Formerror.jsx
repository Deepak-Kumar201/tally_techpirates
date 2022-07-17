import React from 'react'

export default function Formerror() {
    return (
        <div className="container">
			{
                (new URL(window.location.href)).searchParams.get("m")
            }
		</div>
        
    )
}
