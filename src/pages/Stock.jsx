import { useState } from "react";

function Stock({
  openingStock,
  receivedStock,
  setOpeningStock,
  setReceivedStock,
  deliveries,
}) {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);

  const [openingForm, setOpeningForm] = useState({
    ion: openingStock.ion || 0,
    bisleri: openingStock.bisleri || 0,
  });

  const [receivedForm, setReceivedForm] = useState({
    ion: receivedStock.ion || 0,
    bisleri: receivedStock.bisleri || 0,
  });

  // Deliveries for selected date
  const dayDeliveries = deliveries.filter(
    (delivery) => delivery.date === selectedDate
  );

  // Calculate supplied cans
  const ionSupplied = dayDeliveries.reduce(
    (total, delivery) => total + Number(delivery.ionQty || 0),
    0
  );

  const bisleriSupplied = dayDeliveries.reduce(
    (total, delivery) => total + Number(delivery.bisleriQty || 0),
    0
  );

  // Calculate remaining stock
  const ionRemaining =
    Number(openingForm.ion || 0) +
    Number(receivedForm.ion || 0) -
    ionSupplied;

  const bisleriRemaining =
    Number(openingForm.bisleri || 0) +
    Number(receivedForm.bisleri || 0) -
    bisleriSupplied;

  const totalOpening =
    Number(openingForm.ion || 0) + Number(openingForm.bisleri || 0);

  const totalReceived =
    Number(receivedForm.ion || 0) + Number(receivedForm.bisleri || 0);

  const totalSupplied = ionSupplied + bisleriSupplied;

  const totalRemaining = ionRemaining + bisleriRemaining;

  const saveOpeningStock = (e) => {
    e.preventDefault();

    setOpeningStock({
      ion: Number(openingForm.ion || 0),
      bisleri: Number(openingForm.bisleri || 0),
    });

    alert("Opening stock updated successfully.");
  };

  const saveReceivedStock = (e) => {
    e.preventDefault();

    setReceivedStock({
      ion: Number(receivedForm.ion || 0),
      bisleri: Number(receivedForm.bisleri || 0),
    });

    alert("Received stock updated successfully.");
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Stock Management</h1>
          <p>Track daily opening, received, supplied and remaining stock.</p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="stock-date-card">
        <div>
          <h3>Stock Date</h3>
          <p>Select a date to view the stock movement.</p>
        </div>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Formula */}
      <div className="stock-formula">
        <strong>Opening Stock + Received Stock − Supplied = Remaining Stock</strong>
      </div>

      {/* Stock Forms */}
      <div className="stock-grid">
        {/* Opening Stock */}
        <div className="form-card">
          <div className="card-title">
            <h2>Opening Stock</h2>
            <p>Stock available at the beginning of the day.</p>
          </div>

          <form onSubmit={saveOpeningStock}>
            <div className="form-grid">
              <div className="form-group">
                <label>ION Cans</label>
                <input
                  type="number"
                  min="0"
                  value={openingForm.ion}
                  onChange={(e) =>
                    setOpeningForm({
                      ...openingForm,
                      ion: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Bisleri Cans</label>
                <input
                  type="number"
                  min="0"
                  value={openingForm.bisleri}
                  onChange={(e) =>
                    setOpeningForm({
                      ...openingForm,
                      bisleri: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="primary-button">
              Save Opening Stock
            </button>
          </form>
        </div>

        {/* Received Stock */}
        <div className="form-card">
          <div className="card-title">
            <h2>Received Stock</h2>
            <p>Cans received from the supplier.</p>
          </div>

          <form onSubmit={saveReceivedStock}>
            <div className="form-grid">
              <div className="form-group">
                <label>ION Cans</label>
                <input
                  type="number"
                  min="0"
                  value={receivedForm.ion}
                  onChange={(e) =>
                    setReceivedForm({
                      ...receivedForm,
                      ion: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Bisleri Cans</label>
                <input
                  type="number"
                  min="0"
                  value={receivedForm.bisleri}
                  onChange={(e) =>
                    setReceivedForm({
                      ...receivedForm,
                      bisleri: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button type="submit" className="primary-button">
              Save Received Stock
            </button>
          </form>
        </div>
      </div>

      {/* Current Stock Summary */}
      <div className="table-card">
        <div className="table-header">
          <div>
            <h2>Stock Summary</h2>
            <p>Stock movement for {selectedDate}</p>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Opening</th>
                <th>Received</th>
                <th>Supplied</th>
                <th>Remaining</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>ION 20L</strong>
                </td>
                <td>{openingForm.ion}</td>
                <td>{receivedForm.ion}</td>
                <td>{ionSupplied}</td>
                <td>
                  <strong>{ionRemaining}</strong>
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Bisleri 20L</strong>
                </td>
                <td>{openingForm.bisleri}</td>
                <td>{receivedForm.bisleri}</td>
                <td>{bisleriSupplied}</td>
                <td>
                  <strong>{bisleriRemaining}</strong>
                </td>
              </tr>

              <tr className="stock-total-row">
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{totalOpening}</strong>
                </td>
                <td>
                  <strong>{totalReceived}</strong>
                </td>
                <td>
                  <strong>{totalSupplied}</strong>
                </td>
                <td>
                  <strong>{totalRemaining}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery Information */}
      <div className="stock-delivery-info">
        <strong>{dayDeliveries.length}</strong>
        <span>deliveries recorded on {selectedDate}</span>
      </div>
    </div>
  );
}

export default Stock;