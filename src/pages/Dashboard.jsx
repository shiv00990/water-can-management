function Dashboard({
  openingStock,
  deliveries,
}) {
  const totalIonSupplied = deliveries.reduce(
    (total, delivery) => total + delivery.ionQty,
    0
  );

  const totalBisleriSupplied = deliveries.reduce(
    (total, delivery) => total + delivery.bisleriQty,
    0
  );

  const remainingIon =
    openingStock.ion - totalIonSupplied;

  const remainingBisleri =
    openingStock.bisleri - totalBisleriSupplied;

  const totalRevenue = deliveries.reduce(
    (total, delivery) => total + delivery.totalAmount,
    0
  );

  const totalCansSupplied =
    totalIonSupplied + totalBisleriSupplied;

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <p className="dashboard-label">
            WATER CAN MANAGEMENT SYSTEM
          </p>

          <h1>
            Dashboard
          </h1>

          <p className="dashboard-subtitle">
            Here's today's business overview.
          </p>
        </div>

        <div className="today-date">
          📅 {today}
        </div>

      </div>

      {/* Summary Cards */}

      <div className="summary-cards">

        <div className="summary-card">

          <div className="summary-card-top">
            <span className="summary-icon">
              💧
            </span>

            <span className="summary-label">
              ION STOCK
            </span>
          </div>

          <p className="card-number">
            {remainingIon}
          </p>

          <span className="summary-description">
            cans remaining
          </span>

        </div>


        <div className="summary-card">

          <div className="summary-card-top">
            <span className="summary-icon">
              💧
            </span>

            <span className="summary-label">
              BISLERI STOCK
            </span>
          </div>

          <p className="card-number">
            {remainingBisleri}
          </p>

          <span className="summary-description">
            cans remaining
          </span>

        </div>


        <div className="summary-card">

          <div className="summary-card-top">
            <span className="summary-icon">
              🚚
            </span>

            <span className="summary-label">
              CANS SUPPLIED
            </span>
          </div>

          <p className="card-number">
            {totalCansSupplied}
          </p>

          <span className="summary-description">
            cans supplied today
          </span>

        </div>


        <div className="summary-card">

          <div className="summary-card-top">
            <span className="summary-icon">
              ₹
            </span>

            <span className="summary-label">
              TODAY'S REVENUE
            </span>
          </div>

          <p className="card-number">
            ₹{totalRevenue}
          </p>

          <span className="summary-description">
            total amount
          </span>

        </div>

      </div>


      {/* Main Dashboard Grid */}

      <div className="dashboard-grid">

        {/* Stock Overview */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>
                Current Stock
              </h2>

              <p>
                Today's inventory status
              </p>
            </div>

            <span className="panel-icon">
              📦
            </span>

          </div>


          <div className="stock-overview">

            <div className="stock-item">

              <div className="stock-item-header">

                <span>
                  20L ION
                </span>

                <strong>
                  {remainingIon} cans
                </strong>

              </div>

              <div className="stock-progress">

                <div
                  className="stock-progress-bar"
                  style={{
                    width:
                      openingStock.ion > 0
                        ? `${Math.max(
                            0,
                            Math.min(
                              100,
                              (remainingIon /
                                openingStock.ion) *
                                100
                            )
                          )}%`
                        : "0%",
                  }}
                ></div>

              </div>

              <p>
                {totalIonSupplied} cans supplied
                today
              </p>

            </div>


            <div className="stock-item">

              <div className="stock-item-header">

                <span>
                  20L Bisleri
                </span>

                <strong>
                  {remainingBisleri} cans
                </strong>

              </div>

              <div className="stock-progress">

                <div
                  className="stock-progress-bar"
                  style={{
                    width:
                      openingStock.bisleri > 0
                        ? `${Math.max(
                            0,
                            Math.min(
                              100,
                              (remainingBisleri /
                                openingStock.bisleri) *
                                100
                            )
                          )}%`
                        : "0%",
                  }}
                ></div>

              </div>

              <p>
                {totalBisleriSupplied} cans supplied
                today
              </p>

            </div>

          </div>

        </div>


        {/* Sales Summary */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <h2>
                Sales Summary
              </h2>

              <p>
                Today's sales breakdown
              </p>
            </div>

            <span className="panel-icon">
              ₹
            </span>

          </div>


          <div className="sales-list">

            <div className="sales-row">

              <div>
                <strong>
                  20L ION
                </strong>

                <span>
                  {totalIonSupplied} cans × ₹35
                </span>
              </div>

              <strong>
                ₹{totalIonSupplied * 35}
              </strong>

            </div>


            <div className="sales-row">

              <div>
                <strong>
                  20L Bisleri
                </strong>

                <span>
                  {totalBisleriSupplied} cans × ₹100
                </span>
              </div>

              <strong>
                ₹{totalBisleriSupplied * 100}
              </strong>

            </div>


            <div className="sales-total">

              <span>
                Total Revenue
              </span>

              <strong>
                ₹{totalRevenue}
              </strong>

            </div>

          </div>

        </div>

      </div>


      {/* Recent Deliveries */}

      <div className="dashboard-panel recent-deliveries">

        <div className="panel-header">

          <div>
            <h2>
              Recent Deliveries
            </h2>

            <p>
              Latest company supplies
            </p>
          </div>

          <span className="delivery-count">
            {deliveries.length} deliveries
          </span>

        </div>


        {deliveries.length === 0 ? (

          <div className="dashboard-empty">

            <div>
              🚚
            </div>

            <h3>
              No deliveries yet
            </h3>

            <p>
              Your latest deliveries will appear
              here.
            </p>

          </div>

        ) : (

          <div className="recent-table">

            <table>

              <thead>

                <tr>
                  <th>Company</th>
                  <th>ION</th>
                  <th>Bisleri</th>
                  <th>Total Cans</th>
                  <th>Amount</th>
                </tr>

              </thead>

              <tbody>

                {deliveries
                  .slice(-5)
                  .reverse()
                  .map((delivery) => (

                    <tr key={delivery.id}>

                      <td>
                        <strong>
                          {delivery.company}
                        </strong>
                      </td>

                      <td>
                        {delivery.ionQty}
                      </td>

                      <td>
                        {delivery.bisleriQty}
                      </td>

                      <td>
                        {delivery.ionQty +
                          delivery.bisleriQty}
                      </td>

                      <td>
                        <strong>
                          ₹{delivery.totalAmount}
                        </strong>
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;