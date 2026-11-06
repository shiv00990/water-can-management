import { useState } from "react";

function Settings({
  openingStock,
  setOpeningStock,
}) {
  const [businessName, setBusinessName] =
    useState(() => {
      return (
        localStorage.getItem(
          "businessName"
        ) || "Water Can Management System"
      );
    });

  const saveBusinessName = () => {
    localStorage.setItem(
      "businessName",
      businessName
    );

    alert("Business name saved.");
  };

  const resetAllData = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL companies, deliveries and payments? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("companies");
    localStorage.removeItem("deliveries");
    localStorage.removeItem("payments");
    localStorage.removeItem("openingStock");
    localStorage.removeItem("receivedStock");

    window.location.reload();
  };

  return (
    <div className="page">

      {/* Header */}

      <div className="page-header">

        <p className="dashboard-label">
          SYSTEM
        </p>

        <h1>
          Settings
        </h1>

        <p>
          Manage your business and
          application settings.
        </p>

      </div>


      {/* Business Settings */}

      <div className="form-card">

        <h2>
          Business Information
        </h2>

        <p className="settings-description">
          Enter the name of your water supply
          agency.
        </p>

        <div className="form-group">

          <label>
            Business Name
          </label>

          <input
            type="text"
            value={businessName}
            onChange={(e) =>
              setBusinessName(
                e.target.value
              )
            }
          />

        </div>

        <button
          className="primary-button"
          onClick={saveBusinessName}
        >
          Save Business Name
        </button>

      </div>


      {/* Product Prices */}

      <div className="form-card">

        <h2>
          Product Prices
        </h2>

        <p className="settings-description">
          Current selling prices used for
          delivery calculations.
        </p>


        <div className="settings-price-grid">

          <div className="settings-price-card">

            <span>
              20L ION
            </span>

            <strong>
              ₹35
            </strong>

            <small>
              per can
            </small>

          </div>


          <div className="settings-price-card">

            <span>
              20L Bisleri
            </span>

            <strong>
              ₹100
            </strong>

            <small>
              per can
            </small>

          </div>

        </div>

      </div>


      {/* Data Management */}

      <div className="danger-card">

        <div>

          <h2>
            Data Management
          </h2>

          <p>
            Clear all companies, deliveries,
            payments and stock records.
          </p>

        </div>


        <button
          className="danger-button"
          onClick={resetAllData}
        >
          Reset All Data
        </button>

      </div>

    </div>
  );
}

export default Settings;