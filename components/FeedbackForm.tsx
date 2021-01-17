import React from 'react'

export default function FeedbackForm() {
    return (
        <form name="feedback" method="post" data-netlify="true">
            <input type="hidden" name="form-name" value="feedback"/>
            <p>
                <label htmlFor="name">Your name</label>
                <br/>
                <input type="text" name="name" id="name"/>
            </p>
            <p>
                <label htmlFor="message">Feeback</label>
                <br/>
                <textarea name="message" id="message"></textarea>
            </p>
            <p>
                <input type="submit" value="Submit feeback"/>
            </p>
        </form>
    )
}
