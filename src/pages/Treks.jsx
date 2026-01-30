export default function Treks() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Treks</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Name</th>
            <th className="p-2">Difficulty</th>
            <th className="p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Rajgad Trek</td>
            <td className="p-2 text-center">Medium</td>
            <td className="p-2 text-center">₹1200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
