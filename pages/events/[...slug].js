import { useRouter } from "next/router";
import React, { Fragment } from "react";
import EventList from "../../components/EventList";
import EventsSearch from "../../components/EventsSearch";
import ResultsTitle from "../../components/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getFilteredEvents } from "../../dummy-data";

function FilteredEventPage() {
  const router = useRouter();
  const filterdata = router.query.slug;

  if (!filterdata) {
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
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for this filter</p>
        </ErrorAlert>
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

export default FilteredEventPage;
