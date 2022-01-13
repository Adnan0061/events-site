import Link from 'next/link'
import React from 'react'
import classes from './EventItem.module.css'
import Button from './ui/Button'

function EventItem({ title, image, date, location, id}) {
    console.log(date)
    const humanReadableDate = new Date(date).toLocaleDateString('en-us', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

    const formattedAddress = location.replace(', ', '\n')
    const exploreLink = `/events/${id}`
    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div  className={classes.summary}>
                    <h2>{title}</h2>
                    <div  className={classes.date}>
                        <time>{humanReadableDate}</time>
                    </div>
                    <div className={classes.address}>
                        <address>{formattedAddress}</address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={exploreLink}>Explore Link</Button> 
                </div>
            </div>

        </li>
    )
}

export default EventItem
