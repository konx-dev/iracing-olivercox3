//import { lapData } from '@/api/results/lapData';

import ExampleTwo from '@/components/ExampleTwo';

export default function Home() {
  // extract ids to retrieve lap times
  //const subsessionIds = sessions.map((session: { subsession_id: number }) => session.subsession_id);

  //console.log(subsessionIds);

  return (
    <section className="container mx-auto">
      <ExampleTwo />
    </section>
  );
}
