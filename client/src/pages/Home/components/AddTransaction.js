import React, { useContext, useState } from "react";
import PopUp from "../../../components/Popup";
import { AppContext } from "../../../App";
import styles from "../css/popup.module.css";
import Select from "react-select";
import { selectCustomStyles } from "../../../utils/customStyles";
import axios from "axios";
import { category_data } from "./seed";

function AddTransaction() {
  let [close, setClose] = useState(false);
  let [formData, setFormData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const options = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ];
  const appContext = useContext(AppContext);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("formData", formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/transactions",
        {
          userId: user._id,
          ...formData,
        }
      );
      console.log("response", response);
      if (response?.data?.success) {
        console.log("Transaction added successfully");
        appContext.setReload(!appContext.reload);
        setClose(true);
      } else {
        console.error("Error adding transaction:", response?.data);
        throw new Error("Error adding transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw error;
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleCategorySelect(option) {
    setSelectedCategory(option);
    setFormData({ ...formData, category: option.value });
  }

  function handleSubCategorySelect(option) {
    setSelectedSubCategory(option);
    setFormData({ ...formData, subCategory: option.value });
  }

  function handleSelectChange(option) {
    setFormData({ ...formData, type: option.value });
  }

  return (
    <PopUp btnName={"+ Add"} btnStyling={styles.btn} closeState={close}>
      <h1 className={styles.heading}>ADD TRANSACTION</h1>
      <form className={styles.delete_form} onSubmit={handleSubmit}>
        <div className={styles.input_details}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className={styles.input}
            name="description"
            value={formData?.description || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_details}>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            className={styles.input}
            name="amount"
            value={formData?.amount || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_details}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className={styles.input}
            name="date"
            value={formData?.date || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.input_details}>
          <label htmlFor="type">Type</label>
          <Select
            options={options}
            styles={selectCustomStyles}
            onChange={handleSelectChange}
            required
          />
        </div>

        <div className={styles.input_details}>
          <label htmlFor="category">Category</label>
          <Select
            options={category_data}
            styles={selectCustomStyles}
            onChange={handleCategorySelect}
            required
          />
        </div>

        {selectedCategory && (
          <div className={styles.input_details}>
            <label htmlFor="subCategory">Sub-Category</label>
            <Select
              options={selectedCategory.subCategory}
              styles={selectCustomStyles}
              onChange={handleSubCategorySelect}
              required
            />
          </div>
        )}

        <div
          className={`${styles.input_container} ${styles.submit_container}`}
          style={{ zIndex: 0 }}
        >
          <input className="dark-btn" type="submit" />
        </div>
      </form>
    </PopUp>
  );
}

export default AddTransaction;
