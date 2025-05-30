export default function ApiStatusBadge({ isAvailable = false }: { isAvailable: boolean }) {
  return <div>-- {isAvailable ? 'green' : 'red'} --</div>;
}
