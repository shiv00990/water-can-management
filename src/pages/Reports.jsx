function Reports({
  companies,
  deliveries,
  payments,
  openingStock,
}) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  /* Today's deliveries */

  const todayDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.date === today
    );

  /* Today's payments */

  const todayPayments =
    payments.filter(
      (payment) =>
        payment.date === today
    );


  /* ION */

  const ionSupplied =
    todayDeliveries.reduce(
      (total, delivery) =>
        total + delivery.ionQty,
      0
    );


  /* Bisleri */

  const bisleriSupplied =
    todayDeliveries.reduce(
      (total, delivery) =>
        total + delivery.bisleriQty,
      0
    );


  /* Total cans */

  const totalCans =
    ionSupplied +
    bisleriSupplied;


  /* Revenue */

  const totalSales =
    todayDeliveries.reduce(
      (total, delivery) =>
        total + delivery.totalAmount,
      0
    );


  /* Payments */

  const collected =
    todayPayments.reduce(
      (total, payment) =>
        total + payment.amount,
      0
    );


  /* Remaining stock */

  const remainingIon =
    openingStock.ion -
    ionSupplied;


  const remainingBisleri =
    openingStock.bisleri -
    bisleriSupplied;


  const outstanding =
    totalSales -
    collected;


  return (
    <div className="page">

      {/* Header */}

      <div className="page-header">

        <p className="dashboard-label">
          BUSINESS ANALYTICS
        </p>

        <h1>
          Reports
        </h1>

        <p>
          Daily business and company
          performance overview.
        </p>

      </div>


      {/* Daily Report */}

      <div className="table-card">

        <div className="table-header">

          <div>

            <h2>
              Today's Report
            </h2>

            <span>
              {new Date(
                today
              ).toLocaleDateString(
                "en-IN"
              )}
            </span>

          </div>

        </div>


        <div className="report-grid">

          <div className="report-card">

            <span>
              OPENING ION
            </span>

            <strong>
              {openingStock.ion}
            </strong>

            <small>
              cans
            </small>

          </div>


          <div className="report-card">

            <span>
              ION SUPPLIED
            </span>

            <strong>
              {ionSupplied}
            </strong>

            <small>
              cans
            </small>

          </div>


          <div className="report-card">

            <span>
              ION REMAINING
            </span>

            <strong>
              {remainingIon}
            </strong>

            <small>
              cans
            </small>

          </div>


          <div className="report-card">

            <span>
              OPENING BISLERI
            </span>

            <strong>
              {openingStock.bisleri}
            </strong>

            <small>
              cans
            </small>

          </div>


          <div className="report-card">

            <span>
              BISLERI SUPPLIED
            </span>

            <strong>
              {bisleriSupplied}
            </strong>

            <small>
              cans
            </small>

          </div>


          <div className="report-card">

            <span>
              BISLERI REMAINING
            </span>

            <strong>
              {remainingBisleri}
            </strong>

            <small>
              cans
            </small>

          </div>


          <div className="report-card">

            <span>
              TOTAL CANS
            </span>

            <strong>
              {totalCans}
            </strong>

            <small>
              supplied today
            </small>

          </div>


          <div className="report-card">

            <span>
              TOTAL SALES
            </span>

            <strong>
              ₹{totalSales}
            </strong>

            <small>
              today's sales
            </small>

          </div>


          <div className="report-card">

            <span>
              COLLECTED
            </span>

            <strong>
              ₹{collected}
            </strong>

            <small>
              received today
            </small>

          </div>


          <div className="report-card">

            <span>
              OUTSTANDING
            </span>

            <strong>
              ₹{outstanding}
            </strong>

            <small>
              pending today
            </small>

          </div>

        </div>

      </div>


      {/* Company Report */}

      <div className="table-card report-company-table">

        <div className="table-header">

          <div>

            <h2>
              Company-wise Report
            </h2>

            <span>
              Overall account summary
            </span>

          </div>

        </div>


        {companies.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📊
            </div>

            <h3>
              No companies available
            </h3>

            <p>
              Add companies to generate
              reports.
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
                  ION
                </th>

                <th>
                  Bisleri
                </th>

                <th>
                  Total Cans
                </th>

                <th>
                  Sales
                </th>

                <th>
                  Paid
                </th>

                <th>
                  Outstanding
                </th>

              </tr>

            </thead>


            <tbody>

              {companies.map(
                (company) => {

                  const companyDeliveries =
                    deliveries.filter(
                      (delivery) =>
                        delivery.company ===
                        company.name
                    );


                  const companyPayments =
                    payments.filter(
                      (payment) =>
                        payment.company ===
                        company.name
                    );


                  const ion =
                    companyDeliveries.reduce(
                      (total, delivery) =>
                        total +
                        delivery.ionQty,
                      0
                    );


                  const bisleri =
                    companyDeliveries.reduce(
                      (total, delivery) =>
                        total +
                        delivery.bisleriQty,
                      0
                    );


                  const sales =
                    companyDeliveries.reduce(
                      (total, delivery) =>
                        total +
                        delivery.totalAmount,
                      0
                    );


                  const paid =
                    companyPayments.reduce(
                      (total, payment) =>
                        total +
                        payment.amount,
                      0
                    );


                  const balance =
                    Math.max(
                      0,
                      sales - paid
                    );


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
                        {ion}
                      </td>

                      <td>
                        {bisleri}
                      </td>

                      <td>
                        {ion + bisleri}
                      </td>

                      <td>
                        ₹{sales}
                      </td>

                      <td>
                        ₹{paid}
                      </td>

                      <td>

                        <strong>
                          ₹{balance}
                        </strong>

                      </td>

                    </tr>

                  );
                }
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Reports;