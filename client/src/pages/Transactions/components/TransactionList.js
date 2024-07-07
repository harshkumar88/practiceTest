import React from "react";
import styles from "../css/style.module.css";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { LuText } from "react-icons/lu";
import { TbCategory, TbCategoryPlus } from "react-icons/tb";
import { MdCalendarMonth } from "react-icons/md";

function TransactionList({ details }) {
  return (
    <div>
      <div className={styles.transaction_header}>
        <h3 className={styles.heading} style={{ marginBottom: "1vh" }}>
          All Transactions
        </h3>

        <div className={styles.subdiv}>
          <div className={styles.date_range_container}>
            <div className={styles.date_input_wrapper}>
              {/* <input
                type="date"
                id="fromDate"
                value={fromDate || ""}
                onChange={(e) => setFromDate(e.target.value)}
              /> */}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details_wrapper}>
        <div className={styles.details_heading}>
          <LuText className={styles.icon} /> Description
        </div>
        <div className={styles.details_heading}>
          <RiMoneyRupeeCircleLine className={styles.icon} /> Amount
        </div>
        <div className={styles.details_heading}>
          <TbCategoryPlus className={styles.icon} /> Category
        </div>
      </div>
      <div className={styles.details}>
        {details?.map(function (item, idx) {
          return (
            <div className={styles.list} key={idx}>
              <div className={styles.details_text}>{item?.description}</div>
              <div
                className={styles.details_text}
                style={{
                  color: item?.type === "income" ? "green" : "red",
                }}
              >
                ₹ {item?.amount}
              </div>
              <div className={styles.details_text}>{item?.subCategory}</div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransactionList;
