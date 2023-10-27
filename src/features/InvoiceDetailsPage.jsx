// invoiceDetails which is the parent to all invoice components
import { useState } from "react";
import InvoiceInfoHeader from "./InvoiceInfoHeader";
import TempInvoiceDetailsOutput from "./Temp/TempInvoiceDetailsOutput";
import InvoiceItemsTable from "./InvoiceItemsTable";
import InvoicePDF from "./InvoicePDF";

const InvoiceDetailsPage = () => {
  const [invoiceInfoHeader, setInvoiceInfoHeader] = useState({
    companyName: "",
    companyAddress: "",
    customerName: "",
    customerAddress: "",
    invoiceNumber: "",
    invoiceDate: "",
  });

  const handleInvoiceInfoHeaderChange = (name, value) => {
    setInvoiceInfoHeader({ ...invoiceInfoHeader, [name]: value });
  };

  //console.log("invoiceInfoHeader: ", invoiceInfoHeader);

  const [rowItemData, setRowItemData] = useState([]);

  const handleRowDataChange = (data) => {
    setRowItemData(data);
  };

  return (
    <>
      {/* InvoiceInfoHeader start */}
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <InvoiceInfoHeader
            invoiceInfoData={invoiceInfoHeader}
            onInvoiceInfoChange={(name, value) =>
              handleInvoiceInfoHeaderChange(name, value)
            }
          />
        </div>
      </div>
      {/* InvoiceInfoHeader end */}

      {/* InvoiceItemsTable start */}
      <div className="card w-full bg-base-200 shadow-xl my-10">
        <div className="flex-1 justify-center m-8">
          <InvoiceItemsTable onRowDataChange={handleRowDataChange} />
        </div>
      </div>

      {/* InvoiceItemsTable end */}

      {/* InvoicePDF start */}
      <InvoicePDF
        invoiceInfoHeaderData={invoiceInfoHeader}
        invoiceItemsTableData={rowItemData}
        />
      {/* InvoicePDF end */}

      {/* TempInvoiceDetailsOutput start */}
      <div className="card w-auto m-8 bg-neutral">
        <TempInvoiceDetailsOutput
          invoiceInfoHeaderData={invoiceInfoHeader}
          invoiceItemsTableData={rowItemData}
        />
      </div>
      {/* TempInvoiceDetailsOutput end */}
    </>
  );
};

export default InvoiceDetailsPage;
