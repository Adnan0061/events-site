import { useContext, useRef } from 'react';
import NotificationContext from '../../store/NotificationContext';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const userEmail = useRef()
  const notificationCtx = useContext(NotificationContext)
  
  
  function registrationHandler(event) {
    event.preventDefault();
    
    const enteredEmail = userEmail.current.value;
    
    // console.log(enteredEmail)

    notificationCtx.showNotification({
      title: 'Signing up ...',
      message: 'Registration for newsletter.',
      status: 'pending'
    })

    fetch('/api/newsletter', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: enteredEmail})
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
      
      return res.json().then(data => {throw new Error(data.message || 'Something went wrong')})
    })
    .then(data => {
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Registration Successful.',
        status: 'success'
      })
    })
    .catch(error => {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong.',
        status: 'error'
      })
    })
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
