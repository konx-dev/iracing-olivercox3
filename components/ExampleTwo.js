'use client';

import { useData } from '@/context/DataProvider';

export default function ExampleTwo() {
  const data = useData();

  //console.log(data);

  const groupedCars = data.reduce(
    (acc, entry) => {
      if (!acc.groups[entry.car_id]) {
        acc.groups[entry.car_id] = [];

        // Build Unique Car key:value store
        acc.carIds.push({ car_id: entry.car_id, car_name: entry.car_name });
      }

      // Build Unique Category key:value store
      if (!acc.raceCategories.some((category) => category.id === entry.license_category_id)) {
        acc.raceCategories.push({ id: entry.license_category_id, name: entry.license_category });
      }

      acc.groups[entry.car_id].push(entry);
      return acc;
    },
    { groups: {}, carIds: [], raceCategories: [] }
  );

  console.log(groupedCars.groups); // Grouped cars by car_id
  console.log(groupedCars.carIds); // Unique car_id list
  console.log(groupedCars.raceCategories); // Unique car_id list

  return (
    <div className="flex flex-col gap-16">
      <section>
        <h3>Session list</h3>
        <ul className="">
          {data.map((session, index) => (
            <li key={session.subsession_id}>
              {index + 1}. {session.car_name}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Cars</h3>
        <ul>
          {groupedCars.carIds.map((car, index) => (
            <li key={index}>
              {car.car_name} ({car.car_id})
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Categories</h3>
      </section>
    </div>
  );
}

// extract ids to retrieve lap times
//const subsessionIds = sessions.map((session: { subsession_id: number }) => session.subsession_id);

//console.log(subsessionIds);
