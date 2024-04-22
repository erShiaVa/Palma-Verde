import React, { useState } from "react";
import app from "../../config/firebase";
import { toast } from "react-toastify";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";

const FarmerAddToProductList = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(1);
  const [unit, setUnit] = useState("Kg");
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const saveToDB = async (event) => {
    event.preventDefault();
    if (
      productName === "" ||
      qty == 0 ||
      qty === "" ||
      isNaN(qty) ||
      isNaN(qty)
    ) {
      toast.error("Inavlid inputs. Please try again");
      return;
    }

    if (currentUser) {
      const userId = currentUser.uid;
      const db = getDatabase(app);
      const farmerRf = push(ref(db, `Farmers/${userId}/Products`));

      set(farmerRf, {
        productName: productName,
        quantity: qty,
        price: price,
        unit: unit,
      })
        .then(() => {
          setProductName("");
          setQty(0);
          setPrice(0);
          setUnit(0);
          toast("Product added successfully");
        })
        .catch((e) => {
          toast.error("Something went wrong");
        });
    }
  };
  return (
    <div className="bg-primary">
      <h1 className="text-center text-2xl px-4 py-2 text-[#fff]">
        Manage Stock
      </h1>
      <form className="flex m-8 px-4 py-2 justify-center">
        <label>
          Product <br></br>
          <input
            className="font-body text-sm m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <label>
          Quantity<br></br>
          <input
            className="font-body text-sm m-2  px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
            value={qty}
            placeholder="Enter Quantity"
            onChange={(e) => setQty(e.target.value)}
          />
        </label>
        <label>
          Price In Euro<br></br>
          <input
            className="font-body text-sm  m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
            value={price}
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label>
          Unit<br></br>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="font-body text-sm m-2 px-4 py-2 text-font-middle 
            rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]"
          >
            <option value="Kg">Kg</option>
            <option value="Gram">Gram</option>
          </select>
        </label>
        <br></br>

        <button
          type="submit"
          className="text-sm m-2 px-4 py-2 text-font-middle
            rounded-3xl bg-[#FE8C06] text-[#ffff]"
          onClick={saveToDB}
        >
          Add to List
        </button>
      </form>
    </div>
  );
};

export default FarmerAddToProductList;
