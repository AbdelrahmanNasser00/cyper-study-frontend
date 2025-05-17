import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function PaymentTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Course</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>2023-10-15</TableCell>
          <TableCell>Complete Web Development Bootcamp</TableCell>
          <TableCell className="text-center">$19.99</TableCell>
          <TableCell className="text-center">
            <span className="bg-green-300 p-1 rounded-full">completed</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PaymentTable;
