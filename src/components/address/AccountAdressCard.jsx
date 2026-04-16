import { Link } from "react-router-dom";

const AccountAddressCard = ({ address, onEdit, onDelete }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between">
      {/* ADDRESS DETAILS */}
      <div className="space-y-2">
        <p className="font-semibold text-gray-800">
          {address?.house_name}, {address?.place}
        </p>

        <p className="text-sm text-gray-600">
          {address?.district}, {address?.state} - {address?.zipcode}
        </p>

        <div>
          <p className="text-sm font-medium text-gray-700">Phone</p>
          <p className="text-sm text-gray-600">{address?.mobile}</p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4 mt-4 text-sm font-medium">
        <button
          onClick={() => onEdit(address)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(address)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AccountAddressCard;
