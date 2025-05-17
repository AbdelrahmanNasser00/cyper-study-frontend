import PaymentTable from "./PaymentTable";

function PaymentTab() {
  return (
    <div className="border-2 border-gray-100 rounded-lg p-5">
      <div className="mb-5">
        <h3 className="text-2xl font-bold">Payment History</h3>
        <p className="text-gray-500">History of your course purchases</p>
      </div>
      <div>
        <PaymentTable></PaymentTable>
      </div>
    </div>
  );
}

export default PaymentTab;
