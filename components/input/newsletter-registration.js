import { useRef } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const userEmail = useRef()
  
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    const enteredEmail = userEmail.current.value;
    // optional: validate input
    // send valid data to API
    console.log(enteredEmail)
    fetch('/api/newsletter', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: enteredEmail})
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={userEmail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
