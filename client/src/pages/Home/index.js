import React, { useContext, useEffect, useState } from "react";
import styles from "./css/style.module.css";
import axios from "axios";
import Loader from "../../components/Loader";
import { AppContext } from "../../App";
import Header from "../../components/Header";
import AddTransaction from "./components/AddTransaction";
import SummaryChart from "./components/SummaryChart";
import ExpenseBarChart from "./components/ExpenseBarChart";
import { useNavigate } from "react-router-dom";

function Home() {
  let [details, setDetails] = useState([]);
  let [loader, setLoader] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  // useEffect(() => {
  //   getAllTransactions();
  // }, [appContext.reload, toDate, fromDate]);

  // const getAllTransactions = async () => {
  //   setLoader(true);
  //   const response = await axios.get(
  //     `/transactions/all/v1`
  //     // `/transactions/all/v1?fromDate=${fromDate}&toDate=${toDate}`
  //   );
  //   if (response?.status === 200) {
  //     console.log("Resp, resp", response);
  //     setDetails(response?.data);
  //     setLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   // Check if the user data is available in local storage or session storage
  //   const storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     navigate("/login");
  //   } else {
  //     // Set the user data in the AppContext
  //     appContext.setUser(JSON.parse(storedUser));
  //   }
  // }, [appContext, navigate]);

  // useEffect(() => {
  //   const getAllTransactions = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/all/v1", {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       console.log(response?.data);
  //       setDetails(response?.data);
  //     } catch (error) {
  //       console.error("Error fetching transactions:", error);
  //     }
  //   };

  //   getAllTransactions();
  // }, []);

  // Home.js
  
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
  }, [navigate]);

  return loader ? (
    <center>
      <Loader />
    </center>
  ) : (
    <>
      <div className="col-1">
        <div className={styles.container}>
          <Header />
          <div className={styles.details_container}>
            <div className={styles.transaction_header}>
              <h3 className={styles.heading}>Category Wise Expenses</h3>
            </div>
            <div className={styles.subdiv}>
              <ExpenseBarChart transactionDetails={details} />
            </div>
          </div>
          <div className={styles.details_container}>
            <div className={styles.transaction_header}>
              <h3 className={styles.heading}>All Transactions</h3>

              <div className={styles.subdiv}>
                <div className={styles.date_range_container}>
                  <div className={styles.date_input_wrapper}>
                    <label htmlFor="fromDate">From:</label>
                    <input
                      type="date"
                      id="fromDate"
                      value={fromDate || ""}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className={styles.date_input_wrapper}>
                    <label htmlFor="toDate">To:</label>
                    <input
                      type="date"
                      id="toDate"
                      value={toDate || ""}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                </div>
                <AddTransaction />
              </div>
            </div>

            <div className={styles.details_wrapper}>
              <div className={styles.details_heading}>Description</div>
              <div className={styles.details_heading}>Date</div>
              <div className={styles.details_heading}>Amount</div>
              <div className={styles.details_heading}>Category</div>{" "}
              <div className={styles.details_heading}>Sub-Category</div>
            </div>
            <div className={styles.details}>
              {details?.map(function (item, idx) {
                return (
                  <div className={styles.details_wrapper} key={idx}>
                    <div className={styles.details_text}>
                      {item?.description}
                    </div>
                    <div className={styles.details_text}>{item?.date}</div>
                    <div
                      className={styles.details_text}
                      style={{ color: item?.type === "1" ? "green" : "red" }}
                    >
                      {item?.amount}
                    </div>
                    <div className={styles.details_text}>{item?.category}</div>
                    <div className={styles.details_text}>
                      {item?.sub_category}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="col-2">
        <SummaryChart transactionDetails={details} />
      </div>
    </>
  );
}

export default Home;
