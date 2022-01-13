import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/EventDetail/EventSummary";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventContent from "../../components/EventDetail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";

function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const event = getEventById(eventId);

  if (!event) {
    <Fragment>
      <ErrorAlert>
        <p>no event found</p>
      </ErrorAlert>
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

export default EventDetailPage;
