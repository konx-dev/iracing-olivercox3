// Components
import ApiStatusBadge from '@/components/atom/ApiStatusBadge';

export default function Header({ apiAvailability = false }: { apiAvailability: boolean }) {
  console.log(apiAvailability);

  return (
    <header>
      <section className="container mx-auto flex flex-row justify-between">
        <div>-- iRacing stats - Oliver Cox3 (application name & logo) --</div>
        <ApiStatusBadge isAvailable={apiAvailability} />
      </section>
    </header>
  );
}
