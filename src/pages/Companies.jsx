import { useState } from "react";

function Companies({
  companies,
  setCompanies,
  deliveries,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCompany, setSelectedCompany] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter the company name.");
      return;
    }

    const newCompany = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
    };

    setCompanies([
      ...companies,
      newCompany,
    ]);

    setFormData({
      name: "",
      phone: "",
      address: "",
    });
  };

  const deleteCompany = (id) => {
    setCompanies(
      companies.filter(
        (company) => company.id !== id
      )
    );

    if (
      selectedCompany &&
      selectedCompany.id === id
    ) {
      setSelectedCompany(null);
    }
  };

  const filteredCompanies =
    companies.filter(
      (company) =>
        company.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        company.phone
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  /* ==========================================
     COMPANY DETAILS
  ========================================== */

  if (selectedCompany) {

    const companyDeliveries =
      deliveries.filter(
        (delivery) =>
          delivery.company ===
          selectedCompany.name
      );

    const totalIon =
      companyDeliveries.reduce(
        (total, delivery) =>
          total + delivery.ionQty,
        0
      );

    const totalBisleri =
      companyDeliveries.reduce(
        (total, delivery) =>
          total + delivery.bisleriQty,
        0
      );

    const totalCans =
      totalIon + totalBisleri;

    const totalAmount =
      companyDeliveries.reduce(
        (total, delivery) =>
          total + delivery.totalAmount,
        0
      );

    return (
      <div className="page">

        {/* Header */}

        <div className="page-header">

          <button
            className="back-button"
            onClick={() =>
              setSelectedCompany(null)
            }
          >
            ← Back to Companies
          </button>

          <p className="dashboard-label">
            COMPANY ACCOUNT
          </p>

          <h1>
            {selectedCompany.name}
          </h1>

          <p>
            Complete supply and account
            information.
          </p>

        </div>


        {/* Company Information */}

        <div className="company-detail-grid">

          <div className="detail-card">

            <span className="detail-card-label">
              PHONE NUMBER
            </span>

            <strong>
              {selectedCompany.phone ||
                "Not provided"}
            </strong>

          </div>


          <div className="detail-card">

            <span className="detail-card-label">
              ADDRESS
            </span>

            <strong>
              {selectedCompany.address ||
                "Not provided"}
            </strong>

          </div>

        </div>


        {/* Supply Summary */}

        <div className="table-card">

          <div className="table-header">

            <div>

              <h2>
                Supply Summary
              </h2>

              <span>
                Overall company account
              </span>

            </div>

          </div>


          <div className="company-summary-grid">

            <div className="company-summary-item">

              <span>
                20L ION
              </span>

              <strong>
                {totalIon}
              </strong>

              <small>
                cans supplied
              </small>

            </div>


            <div className="company-summary-item">

              <span>
                20L Bisleri
              </span>

              <strong>
                {totalBisleri}
              </strong>

              <small>
                cans supplied
              </small>

            </div>


            <div className="company-summary-item">

              <span>
                Total Cans
              </span>

              <strong>
                {totalCans}
              </strong>

              <small>
                cans supplied
              </small>

            </div>


            <div className="company-summary-item amount-item">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{totalAmount}
              </strong>

              <small>
                total sales
              </small>

            </div>

          </div>

        </div>


        {/* Delivery History */}

        <div className="table-card">

          <div className="table-header">

            <div>

              <h2>
                Delivery History
              </h2>

              <span>
                {companyDeliveries.length}
                {" "}
                deliveries
              </span>

            </div>

          </div>


          {companyDeliveries.length ===
          0 ? (

            <div className="empty-state">

              <div className="empty-icon">
                🚚
              </div>

              <h3>
                No deliveries yet
              </h3>

              <p>
                Deliveries for this company
                will appear here.
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

                {companyDeliveries
                  .slice()
                  .reverse()
                  .map(
                    (delivery) => (

                      <tr
                        key={
                          delivery.id
                        }
                      >

                        <td>
                          {delivery.date
                            ? new Date(
                                delivery.date
                              ).toLocaleDateString(
                                "en-IN"
                              )
                            : "-"}
                        </td>

                        <td>
                          {
                            delivery.ionQty
                          }
                        </td>

                        <td>
                          {
                            delivery.bisleriQty
                          }
                        </td>

                        <td>
                          {
                            delivery.ionQty +
                            delivery.bisleriQty
                          }
                        </td>

                        <td>
                          <strong>
                            ₹
                            {
                              delivery.totalAmount
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


  /* ==========================================
     COMPANY LIST
  ========================================== */

  return (
    <div className="page">

      <div className="page-header">

        <p className="dashboard-label">
          CUSTOMER MANAGEMENT
        </p>

        <h1>
          Companies
        </h1>

        <p>
          Manage your water supply customers
          and their accounts.
        </p>

      </div>


      {/* Add Company */}

      <div className="form-card">

        <h2>
          Add New Company
        </h2>

        <form
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">

              <label>
                Company Name *
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter company name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>


            <div className="form-group full-width">

              <label>
                Address
              </label>

              <input
                type="text"
                name="address"
                placeholder="Enter company address"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

          </div>


          <button
            className="primary-button"
            type="submit"
          >
            + Add Company
          </button>

        </form>

      </div>


      {/* Company List */}

      <div className="table-card">

        <div className="table-header">

          <div>

            <h2>
              Company List
            </h2>

            <span>
              {companies.length}
              {" "}
              Companies
            </span>

          </div>


          <div className="company-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>

        </div>


        {companies.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🏢
            </div>

            <h3>
              No companies added yet
            </h3>

            <p>
              Add your first company
              using the form above.
            </p>

          </div>

        ) : filteredCompanies.length ===
          0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🔍
            </div>

            <h3>
              No companies found
            </h3>

            <p>
              Try another search.
            </p>

          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>#</th>

                <th>
                  Company
                </th>

                <th>
                  Phone
                </th>

                <th>
                  Address
                </th>

                <th>
                  ION
                </th>

                <th>
                  Bisleri
                </th>

                <th>
                  Total
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredCompanies.map(
                (company, index) => {

                  const companyDeliveries =
                    deliveries.filter(
                      (delivery) =>
                        delivery.company ===
                        company.name
                    );

                  const totalIon =
                    companyDeliveries.reduce(
                      (total, delivery) =>
                        total +
                        delivery.ionQty,
                      0
                    );

                  const totalBisleri =
                    companyDeliveries.reduce(
                      (total, delivery) =>
                        total +
                        delivery.bisleriQty,
                      0
                    );

                  const totalAmount =
                    companyDeliveries.reduce(
                      (total, delivery) =>
                        total +
                        delivery.totalAmount,
                      0
                    );

                  return (

                    <tr
                      key={company.id}
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <strong>
                          {company.name}
                        </strong>
                      </td>

                      <td>
                        {company.phone ||
                          "-"}
                      </td>

                      <td>
                        {company.address ||
                          "-"}
                      </td>

                      <td>
                        {totalIon}
                      </td>

                      <td>
                        {totalBisleri}
                      </td>

                      <td>
                        <strong>
                          ₹{totalAmount}
                        </strong>
                      </td>

                      <td>

                        <button
                          className="view-button"
                          onClick={() =>
                            setSelectedCompany(
                              company
                            )
                          }
                        >
                          View
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            deleteCompany(
                              company.id
                            )
                          }
                        >
                          Delete
                        </button>

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

export default Companies;