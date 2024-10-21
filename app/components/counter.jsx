export default function Counter({ type, valueDone, valueSet }) {
  return (
    <>
      {type == "done" && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-yellow-500">{valueDone}</p>
          <h2>Hotové úkoly</h2>
        </div>
      )}
      {type == "amount" && (
        <div className="flex flex-col items-center justify-center">
          <p className="text-blue-500">{valueSet}</p>
          <h2>Zadané úkoly</h2>
        </div>
      )}
    </>
  );
}
