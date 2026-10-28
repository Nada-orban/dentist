// Old address: the patients list now lives at /dashboard/patient.
export default function PatientsRedirect() {
  return null;
}

export async function getServerSideProps() {
  return { redirect: { destination: "/dashboard/patient", permanent: false } };
}
