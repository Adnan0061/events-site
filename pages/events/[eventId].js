import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getAllEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/EventDetail/EventSummary";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventContent from "../../components/EventDetail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    <Fragment>
      <ErrorAlert>
        <p>no event found</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>;
  }
  return (
    <Fragment>
      <EventSummary title={event?.title} />
      <EventLogistics
        date={event?.date}
        address={event?.location}
        image={event?.image}
        imageAlt={event?.imageAlt}
      />
      <EventContent>
        <p>{event?.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId)
  
  return {
    props: {
      selectedEvent: event
    }
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map( event => ({params: {eventId: event.id}}))

  return {
    paths: paths,
    fallback: false
  }
} 
export default EventDetailPage;
