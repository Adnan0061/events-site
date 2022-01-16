import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/EventList";
import EventsSearch from "../../components/EventsSearch";
import ResultsTitle from "../../components/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../helpers/api-util";



function FilteredEventPage(props) {
  const [loadedEvents, setLoadedEvents] = useState([])
  const router = useRouter();
  
  const filterdata = router.query.slug;

  const { data, error } = useSWR('https://alt-events---nextjs-default-rtdb.firebaseio.com/events.json')

  useEffect(()=>{
    if(data){
      const events = [];
  
      for (const key in data) {
          events.push({
              id: key,
              ...data[key]
          })
      }
      setLoadedEvents(events)
    }
  },[data])
  if (!loadedEvents) {
    return <p className="center">Loading</p>;
  }
  const filterYear = filterdata[0];
  const filterMonth = filterdata[1];

  const numYear = +filterYear;
  const numMonth = +filterMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numMonth > 12 ||
    numMonth < 1
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please Adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for this filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const findEventHandler = (year, month) => {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  };

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <EventsSearch onSearch={findEventHandler} />
      <EventList items={filteredEvents} />
      <ResultsTitle date={date} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const {params} = context

//   const filterdata = params.slug

//   const filterYear = filterdata[0];
//   const filterMonth = filterdata[1];

//   const numYear = +filterYear;
//   const numMonth = +filterMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth > 12 ||
//     numMonth < 1 ||
//     error
//   ) {
//     return (
//       {
//         props: {hasError: true}
//       }
//     );
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventPage;
