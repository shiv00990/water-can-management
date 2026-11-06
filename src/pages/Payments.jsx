import { useState } from "react";

function Payments({
  companies,
  deliveries,
  payments,
  setPayments,
}) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [payment, setPayment] = useState({
    date: today,
    company: "",
    amount: "",
    note: "",
  });

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!payment.company) {
      alert("Please select a company.");
      return;
    }

    if (
      !payment.amount ||
      Number(payment.amount) <= 0
    ) {
      alert("Please enter a valid amount.");
      return;
    }

    const newPayment = {
      id: Date.now(),
      date: payment.date,
      company: payment.company,
      amount: Number(payment.amount),
      note: payment.note,
    };

    setPayments([
      ...payments,
      newPayment,
    ]);

    setPayment({
      date: today,
      company: "",
      amount: "",
      note: "",
    });
  };

  const getCompanySales = (companyName) => {
    return deliveries
      .filter(
        (delivery) =>
          delivery.company === companyName
      )
      .reduce(
        (total, delivery) =>
          total + delivery.totalAmount,
        0
      );
  };

  const getCompanyPayments = (companyName) => {
    return payments
      .filter(
        (payment) =>
          payment.company === companyName
      )
      .reduce(
        (total, payment) =>
          total + payment.amount,
        0
      );
  };

  const totalSales = deliveries.reduce(
    (total, delivery) =>
      total + delivery.totalAmount,
    0
  );

  const totalPaid = payments.reduce(
    (total, payment) =>
      total + payment.amount,
    0
  );

  const totalOutstanding =
    totalSales - totalPaid;

  return (
    <div className="page">

      {/* Header */}

      <div className="page-header">

        <p className="dashboard-label">
          FINANCE
        </p>

        <h1>
          Payments
        </h1>

        <p>
          Record payments and track
          outstanding balances.
        </p>

      </div>


      {/* Financial Summary */}

      <div className="payment-summary-grid">

        <div className="payment-summary-card">

          <span>
            TOTAL SALES
          </span>

          <strong>
            ₹{totalSales}
          </strong>

        </div>


        <div className="payment-summary-card">

          <span>
            TOTAL COLLECTED
          </span>

          <strong>
            ₹{totalPaid}
          </strong>

        </div>


        <div className="payment-summary-card outstanding">

          <span>
            OUTSTANDING
          </span>

          <strong>
            ₹{totalOutstanding}
          </strong>

        </div>

      </div>


      {/* Add Payment */}

      <div className="form-card">

        <h2>
          Record Payment
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">

              <label>
                Payment Date *
              </label>

              <input
                type="date"
                name="date"
                value={payment.date}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Company *
              </label>

              <select
                name="company"
                value={payment.company}
                onChange={handleChange}
              >

                <option value="">
                  Select Company
                </option>

                {companies.map(
                  (company) => (
                    <option
                      key={company.id}
                      value={company.name}
                    >
                      {company.name}
                    </option>
                  )
                )}

              </select>

            </div>


            <div className="form-group">

              <label>
                Amount Received *
              </label>

              <input
                type="number"
                min="1"
                name="amount"
                placeholder="Enter amount"
                value={payment.amount}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Note
              </label>

              <input
                type="text"
                name="note"
                placeholder="Optional note"
                value={payment.note}
                onChange={handleChange}
              />

            </div>

          </div>


          <button
            type="submit"
            className="primary-button"
          >
            + Record Payment
          </button>

        </form>

      </div>


      {/* Company Balances */}

      <div className="table-card">

        <div className="table-header">

          <div>

            <h2>
              Company Balances
            </h2>

            <span>
              Payment status by company
            </span>

          </div>

        </div>


        {companies.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              💰
            </div>

            <h3>
              No companies available
            </h3>

            <p>
              Add companies before
              recording payments.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Company
                </th>

                <th>
                  Total Sales
                </th>

                <th>
                  Paid
                </th>

                <th>
                  Outstanding
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {companies.map(
                (company) => {

                  const sales =
                    getCompanySales(
                      company.name
                    );

                  const paid =
                    getCompanyPayments(
                      company.name
                    );

                  const outstanding =
                    sales - paid;

                  return (

                    <tr
                      key={company.id}
                    >

                      <td>
                        <strong>
                          {company.name}
                        </strong>
                      </td>

                      <td>
                        ₹{sales}
                      </td>

                      <td>
                        ₹{paid}
                      </td>

                      <td>
                        <strong>
                          ₹
                          {Math.max(
                            0,
                            outstanding
                          )}
                        </strong>
                      </td>

                      <td>

                        {outstanding <= 0 ? (

                          <span className="status-paid">
                            PAID
                          </span>

                        ) : (

                          <span className="status-pending">
                            PENDING
                          </span>

                        )}

                      </td>

                    </tr>

                  );
                }
              )}

            </tbody>

          </table>

        )}

      </div>


      {/* Payment History */}

      <div className="table-card payment-history">

        <div className="table-header">

          <div>

            <h2>
              Payment History
            </h2>

            <span>
              {payments.length}
              {" "}
              payments
            </span>

          </div>

        </div>


        {payments.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              💳
            </div>

            <h3>
              No payments recorded
            </h3>

            <p>
              Recorded payments will
              appear here.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Date
                </th>

                <th>
                  Company
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Note
                </th>

              </tr>

            </thead>


            <tbody>

              {payments
                .slice()
                .reverse()
                .map(
                  (item) => (

                    <tr
                      key={item.id}
                    >

                      <td>
                        {new Date(
                          item.date
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </td>

                      <td>
                        <strong>
                          {item.company}
                        </strong>
                      </td>

                      <td>
                        <strong>
                          ₹{item.amount}
                        </strong>
                      </td>

                      <td>
                        {item.note ||
                          "-"}
                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Payments;