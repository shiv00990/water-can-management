import { useState, useEffect } from "react";

import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Deliveries from "./pages/Deliveries";
import Stock from "./pages/Stock";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  const [currentPage, setCurrentPage] =
    useState("dashboard");

  // ==========================================
  // COMPANIES
  // ==========================================

  const [companies, setCompanies] = useState(() => {
    const saved =
      localStorage.getItem("companies");

    return saved
      ? JSON.parse(saved)
      : [];
  });


  // ==========================================
  // DELIVERIES
  // ==========================================

  const [deliveries, setDeliveries] =
    useState(() => {
      const saved =
        localStorage.getItem("deliveries");

      return saved
        ? JSON.parse(saved)
        : [];
    });


  // ==========================================
  // PAYMENTS
  // ==========================================

  const [payments, setPayments] =
    useState(() => {
      const saved =
        localStorage.getItem("payments");

      return saved
        ? JSON.parse(saved)
        : [];
    });


  // ==========================================
  // OPENING STOCK
  // ==========================================

  const [openingStock, setOpeningStock] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "openingStock"
        );

      return saved
        ? JSON.parse(saved)
        : {
            ion: 300,
            bisleri: 100,
          };
    });


  // ==========================================
  // RECEIVED STOCK
  // ==========================================

  const [receivedStock, setReceivedStock] =
    useState(() => {
      const saved =
        localStorage.getItem(
          "receivedStock"
        );

      return saved
        ? JSON.parse(saved)
        : {
            ion: 0,
            bisleri: 0,
          };
    });


  // ==========================================
  // SAVE COMPANIES
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "companies",
      JSON.stringify(companies)
    );
  }, [companies]);


  // ==========================================
  // SAVE DELIVERIES
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "deliveries",
      JSON.stringify(deliveries)
    );
  }, [deliveries]);


  // ==========================================
  // SAVE PAYMENTS
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "payments",
      JSON.stringify(payments)
    );
  }, [payments]);


  // ==========================================
  // SAVE OPENING STOCK
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "openingStock",
      JSON.stringify(openingStock)
    );
  }, [openingStock]);


  // ==========================================
  // SAVE RECEIVED STOCK
  // ==========================================

  useEffect(() => {
    localStorage.setItem(
      "receivedStock",
      JSON.stringify(receivedStock)
    );
  }, [receivedStock]);


  // ==========================================
  // PAGE ROUTING
  // ==========================================

  const renderPage = () => {

    // DASHBOARD

    if (currentPage === "dashboard") {
      return (
        <Dashboard
          openingStock={openingStock}
          deliveries={deliveries}
        />
      );
    }


    // COMPANIES

    if (currentPage === "companies") {
      return (
        <Companies
          companies={companies}
          setCompanies={setCompanies}
          deliveries={deliveries}
        />
      );
    }


    // DELIVERIES

    if (currentPage === "deliveries") {
      return (
        <Deliveries
          companies={companies}
          deliveries={deliveries}
          setDeliveries={setDeliveries}
        />
      );
    }


    // STOCK

    if (currentPage === "stock") {
      return (
        <Stock
          openingStock={openingStock}
          receivedStock={receivedStock}
          setOpeningStock={setOpeningStock}
          setReceivedStock={setReceivedStock}
          deliveries={deliveries}
        />
      );
    }


    // PAYMENTS

    if (currentPage === "payments") {
      return (
        <Payments
          companies={companies}
          deliveries={deliveries}
          payments={payments}
          setPayments={setPayments}
        />
      );
    }


    // REPORTS

    if (currentPage === "reports") {
      return (
        <Reports
          companies={companies}
          deliveries={deliveries}
          payments={payments}
          openingStock={openingStock}
        />
      );
    }
// SETTINGS

if (currentPage === "settings") {
  return (
    <Settings
      openingStock={openingStock}
      setOpeningStock={setOpeningStock}
    />
  );
}

    // DEFAULT

    return (
      <Dashboard
        openingStock={openingStock}
        deliveries={deliveries}
      />
    );
  };


  // ==========================================
  // APPLICATION
  // ==========================================

  return (
    <div className="app">

      {/* ================================
          SIDEBAR
      ================================= */}

      <aside className="sidebar">


        {/* BRAND */}

        <div className="brand">

          <div className="brand-logo">
            💧
          </div>

          <div className="brand-text">

            <span>
              Water Can
            </span>

            <strong>
              Management System
            </strong>

          </div>

        </div>


        {/* NAVIGATION */}

        <nav>


          {/* OVERVIEW */}

          <div className="nav-section-title">
            OVERVIEW
          </div>


          <button
            className={`nav-item ${
              currentPage === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage("dashboard")
            }
          >

            🏠

            <span>
              Dashboard
            </span>

          </button>


          {/* OPERATIONS */}

          <div className="nav-section-title">
            OPERATIONS
          </div>


          <button
            className={`nav-item ${
              currentPage === "companies"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage("companies")
            }
          >

            🏢

            <span>
              Companies
            </span>

          </button>


          <button
            className={`nav-item ${
              currentPage === "deliveries"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage("deliveries")
            }
          >

            🚚

            <span>
              Deliveries
            </span>

          </button>


          <button
            className={`nav-item ${
              currentPage === "stock"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage("stock")
            }
          >

            📦

            <span>
              Stock
            </span>

          </button>


          {/* FINANCE */}

          <div className="nav-section-title">
            FINANCE
          </div>


          <button
            className={`nav-item ${
              currentPage === "payments"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage("payments")
            }
          >

            💰

            <span>
              Payments
            </span>

          </button>


          <button
            className={`nav-item ${
              currentPage === "reports"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setCurrentPage("reports")
            }
          >

            📊

            <span>
              Reports
            </span>

          </button>


          {/* SYSTEM */}

          <div className="nav-section-title">
            SYSTEM
          </div>


          <button
  className={`nav-item ${
    currentPage === "settings"
      ? "active"
      : ""
  }`}
  onClick={() =>
    setCurrentPage("settings")
  }
>
  ⚙️
  <span>
    Settings
  </span>
</button>

        </nav>


        {/* LOGOUT */}

        <div className="sidebar-bottom">

          <button className="logout-button">

            🚪 Logout

          </button>

        </div>


      </aside>


      {/* ================================
          MAIN CONTENT
      ================================= */}

      <main className="main-content">

        {renderPage()}

      </main>


    </div>
  );
}

export default App;