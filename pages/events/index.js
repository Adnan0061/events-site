import React, { Fragment } from "react";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/EventList";
import EventsSearch from "../../components/EventsSearch";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventsPage(props) {
  const events = props.events;
  const router = useRouter();

  const findEventHandler = (year, month) => {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  };
  return (
    <Fragment>
      <Head>
        <title>All Event page - Alt Events</title>
        <meta name="description" content="This is the page where all events are found" />
      </Head>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;
