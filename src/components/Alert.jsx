export default function Alert({alert = "Mensaje por defecto"}) {
  return (
    <div
      className="mb-4 rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
      role="alert"
    >
      {alert}
    </div>
  );
}
