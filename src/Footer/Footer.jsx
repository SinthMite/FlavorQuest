import './Footer.css'
import React,{useState} from 'react'


export default function Footer( ) {

    return(
        <>
        <h3>HOURS OF OPERATION</h3>
        <p>
            <span>Tuesday - Friday:</span>
            11:30AM - 3PM (Lunch) | 3-5PM (Bar) | 5-10PM (Dinner)
        </p>
        <p>
            <span>Saturday:</span>
            5PM - 10PM (Dinner & Bar)
        </p>
        <p>
            <span>Sunday:</span>
            11:00AM - 3PM (Brunch) | 3-5PM (Bar) | 5-10PM (Dinner)
        </p>
        <div>
            <button>Book a Table</button>
            <button>Book a Event</button>
        </div>
        </>
    )
}