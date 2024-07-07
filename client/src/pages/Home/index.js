import React, { useContext, useEffect, useState } from "react";
import styles from "./css/style.module.css";
import axios from "axios";
import Loader from "../../components/Loader";
import { AppContext } from "../../App";
import Header from "../../components/Header";
import SummaryChart from "./components/SummaryChart";
import ExpenseBarChart from "./components/ExpenseBarChart";
import { useNavigate } from "react-router-dom";
import SummaryDetails from "./components/SummaryDetails";
import Transactions from "./components/Transactions";

function Home() {
  let [details, setDetails] = useState([]);
  let [loader, setLoader] = useState(false);
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const { _id: userId } = JSON.parse(storedUser);
      const getAllTransactions = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/transactions/${userId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response?.data);
          setDetails(response?.data.transactions);
        } catch (error) {
          console.error("Error fetching transactions:", error);
        }
      };
      getAllTransactions();
    } else {
      navigate("/login");
    }
  }, [navigate, appContext.reload]);

  return loader ? (
    <center>
      <Loader />
    </center>
  ) : (
    <div className="main-row">
      <div className={styles.main}>
        <Header user={appContext?.user} />
        <div className={styles.sub_main}>
          {!appContext?.isMobile && (
            <div className="col-1">
              <div className={styles.container}>
                <div className={styles.details_container}>
                  <div className={styles.transaction_header}>
                    <h3 className={styles.heading}>Category Wise Expenses</h3>
                  </div>
                  <div className={styles.subdiv}>
                    <ExpenseBarChart transactionDetails={details} />
                  </div>
                </div>
                <div className={styles.details_container}>
                  <Transactions details={details} />
                </div>
              </div>
            </div>
          )}
          <div className="col-2">
            <div className={styles.container}>
              <div className={styles.details_container}>
                <div className={styles.transaction_header}>
                  <h3 className={styles.heading}>Summary</h3>
                </div>
                <div className={styles.subdiv}>
                  <SummaryChart transactionDetails={details} />
                </div>
              </div>
              <div className={styles.details_container}>
                <div className={styles.subdiv}>
                  <SummaryDetails transactionDetails={details} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
