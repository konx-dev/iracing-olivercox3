'use client';

import { useData } from '@/context/DataProvider';

export default function ExampleTwo() {
  const data = useData();

  // Handle empty, null, or undefined data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="flex flex-col gap-16">
        <section>
          <h3>No Data Available</h3>
          <p>No racing data is currently available. This could be due to:</p>
          <ul className="list-disc ml-6 mt-2">
            <li>API connection issues</li>
            <li>Authentication problems</li>
            <li>No racing sessions found for the selected period</li>
          </ul>
        </section>
      </div>
    );
  }

  // Safe data processing with additional validation
  const groupedCars = data.reduce(
    (acc, entry) => {
      // Validate entry has required properties
      if (!entry || typeof entry.car_id === 'undefined' || !entry.car_name) {
        console.warn('Invalid entry found:', entry);
        return acc;
      }

      if (!acc.groups[entry.car_id]) {
        acc.groups[entry.car_id] = [];

        // Build Unique Car key:value store
        acc.carIds.push({ car_id: entry.car_id, car_name: entry.car_name });
      }

      // Build Unique Category key:value store with validation
      if (
        entry.license_category_id !== undefined &&
        entry.license_category &&
        !acc.raceCategories.some((category) => category.id === entry.license_category_id)
      ) {
        acc.raceCategories.push({
          id: entry.license_category_id,
          name: entry.license_category
        });
      }

      acc.groups[entry.car_id].push(entry);
      return acc;
    },
    { groups: {}, carIds: [], raceCategories: [] }
  );

  return (
    <div className="flex flex-col gap-16">
      <section>
        <h3>Session list ({data.length} sessions)</h3>
        {data.length > 0 ? (
          <ul className="">
            {data.map((session, index) => (
              <li key={session.subsession_id || index}>
                {index + 1}. {session.car_name || 'Unknown Car'}
              </li>
            ))}
          </ul>
        ) : (
          <p>No sessions found.</p>
        )}
      </section>

      <section>
        <h3>Cars ({groupedCars.carIds.length} unique cars)</h3>
        {groupedCars.carIds.length > 0 ? (
          <ul>
            {groupedCars.carIds.map((car, index) => (
              <li key={car.car_id || index}>
                {car.car_name} ({car.car_id})
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars found.</p>
        )}
      </section>

      <section>
        <h3>Categories ({groupedCars.raceCategories.length} unique categories)</h3>
        {groupedCars.raceCategories.length > 0 ? (
          <ul>
            {groupedCars.raceCategories.map((category, index) => (
              <li key={category.id || index}>
                {category.name} (ID: {category.id})
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found.</p>
        )}
      </section>
    </div>
  );
}

// Extract ids to retrieve lap times
// const subsessionIds = sessions.map((session: { subsession_id: number }) => session.subsession_id);
