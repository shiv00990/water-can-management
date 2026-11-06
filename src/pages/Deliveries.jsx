import { useState } from "react";

function Deliveries({
  companies,
  deliveries,
  setDeliveries,
}) {
  const ION_PRICE = 35;
  const BISLERI_PRICE = 100;

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [delivery, setDelivery] = useState({
    date: today,
    company: "",
    ionQty: 0,
    bisleriQty: 0,
  });

  const handleChange = (e) => {
    setDelivery({
      ...delivery,
      [e.target.name]: e.target.value,
    });
  };

  const ionAmount =
    Number(delivery.ionQty || 0) *
    ION_PRICE;

  const bisleriAmount =
    Number(delivery.bisleriQty || 0) *
    BISLERI_PRICE;

  const totalAmount =
    ionAmount + bisleriAmount;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!delivery.date) {
      alert("Please select a date.");
      return;
    }

    if (!delivery.company) {
      alert("Please select a company.");
      return;
    }

    if (
      Number(delivery.ionQty) <= 0 &&
      Number(delivery.bisleriQty) <= 0
    ) {
      alert(
        "Please enter at least one can quantity."
      );
      return;
    }

    const newDelivery = {
      id: Date.now(),
      date: delivery.date,
      company: delivery.company,
      ionQty: Number(delivery.ionQty),
      bisleriQty: Number(
        delivery.bisleriQty
      ),
      ionAmount: ionAmount,
      bisleriAmount: bisleriAmount,
      totalAmount: totalAmount,
    };

    setDeliveries([
      ...deliveries,
      newDelivery,
    ]);

    setDelivery({
      date: today,
      company: "",
      ionQty: 0,
      bisleriQty: 0,
    });
  };

  return (
    <div className="page">

      {/* Header */}

      <div className="page-header">

        <div>
          <p className="dashboard-label">
            DAILY OPERATIONS
          </p>

          <h1>Deliveries</h1>

          <p>
            Record water can supplies to
            companies.
          </p>
        </div>

      </div>


      {/* New Delivery */}

      <div className="form-card">

        <h2>New Delivery</h2>

        <form onSubmit={handleSubmit}>

          <div className="delivery-form-grid">

            {/* Date */}

            <div className="form-group">

              <label>
                Delivery Date *
              </label>

              <input
                type="date"
                name="date"
                value={delivery.date}
                onChange={handleChange}
              />

            </div>


            {/* Company */}

            <div className="form-group">

              <label>
                Company *
              </label>

              <select
                name="company"
                value={delivery.company}
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


            {/* ION */}

            <div className="quantity-box">

              <h3>
                20L ION
              </h3>

              <p className="price">
                ₹35 per can
              </p>

              <input
                type="number"
                min="0"
                name="ionQty"
                value={delivery.ionQty}
                onChange={handleChange}
              />

              <p className="amount">
                ₹{ionAmount}
              </p>

            </div>


            {/* Bisleri */}

            <div className="quantity-box">

              <h3>
                20L Bisleri
              </h3>

              <p className="price">
                ₹100 per can
              </p>

              <input
                type="number"
                min="0"
                name="bisleriQty"
                value={delivery.bisleriQty}
                onChange={handleChange}
              />

              <p className="amount">
                ₹{bisleriAmount}
              </p>

            </div>

          </div>


          {/* Total */}

          <div className="total-box">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


          <button
            type="submit"
            className="primary-button"
          >
            + Save Delivery
          </button>

        </form>

      </div>


      {/* Delivery History */}

      <div className="table-card">

        <div className="table-header">

          <div>

            <h2>
              Delivery History
            </h2>

            <span>
              {deliveries.length}
              {" "}
              Deliveries
            </span>

          </div>

        </div>


        {deliveries.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🚚
            </div>

            <h3>
              No deliveries recorded
            </h3>

            <p>
              Add your first delivery
              above.
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
                  ION
                </th>

                <th>
                  Bisleri
                </th>

                <th>
                  Total Cans
                </th>

                <th>
                  Amount
                </th>

              </tr>

            </thead>


            <tbody>

              {deliveries
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
                        {item.ionQty}
                      </td>

                      <td>
                        {item.bisleriQty}
                      </td>

                      <td>
                        {item.ionQty +
                          item.bisleriQty}
                      </td>

                      <td>
                        <strong>
                          ₹
                          {
                            item.totalAmount
                          }
                        </strong>
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

export default Deliveries;