import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoice } from '../../redux/slices/InvoiceSlice';
import './InvoiceDownload.css'
const InvoiceDownload = () => {
  const [invoiceId, setInvoiceId] = useState('1');
  const dispatch = useDispatch();
  const { invoiceUrl, loading, error } = useSelector((state) => state.invoices);

  const handleDownload = () => {
    dispatch(fetchInvoice(invoiceId));
  };

  return (
    <div className='invoice m-5 align-'>
      {/* <h2>Download Invoice</h2> */}
      {/* <input
        type="text"
        placeholder="Enter Invoice ID"
        value={invoiceId}
        onChange={(e) => setInvoiceId(e.target.value)}
      /> */}
      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Invoice'}
      </button>
      {error && <p>Error: {error}</p>}
      {invoiceUrl && (
        <a href={invoiceUrl} download="invoice.pdf">
          Click here to download your invoice
        </a>
      )}
    </div>
  );
};

export default InvoiceDownload;
