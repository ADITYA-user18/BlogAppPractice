import { useState, useEffect } from "react";
import "./App.css";
import axios from "./config/axios.js";

function App() {
  const [Title, setTitle] = useState("");
  const [Desc, setDesc] = useState("");
  const [Data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  function HandleClick() {
    if (editIndex !== null) {
      const id = Data[editIndex]._id;
      axios
        .put(`/user/${id}`, { title: Title, desc: Desc })
        .then((res) => {
          const updatedData = Data.map((item, i) =>
            i === editIndex ? res.data : item
          );
          setData(updatedData);
          setEditIndex(null);
          setTitle("");
          setDesc("");
          alert("Blog Updated Successfully");
        })
        .catch((error) => {
          console.log("Error updating blog", error);
        });
    } else {
      axios
        .post("/user", { title: Title, desc: Desc })
        .then((res) => {
          setData((prev) => [...prev, res.data]);
          setTitle("");
          setDesc("");
          alert("Blog Added Successfully");
        })
        .catch((error) => {
          console.log("Failed to send data", error);
        });
    }
  }

  async function HandleDelete(id) {
    try {
      await axios.delete(`/user/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
      alert("Data Deleted Successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  function HandleEdit(index) {
    const selected = Data[index];
    setTitle(selected.title);
    setDesc(selected.desc);
    setEditIndex(index);
  }

  useEffect(() => {
    axios
      .get("/user")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Error fetching data", err));
  }, []);

  return (
    <div className="helloAnna">
      <h1>This is a Very Basic Blog App</h1>
      <div className="tadi">
        <input
          type="text"
          placeholder="Enter blog title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description"
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={HandleClick}>
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </div>

      {Data.map((item, index) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ margin: 0 }}>Title : {item.title}</h3>
            <h4 style={{ margin: "5px 0 0 0", fontWeight: "normal" }}>
              Description : {item.desc}
            </h4>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => HandleDelete(item._id)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>

            <button
              onClick={() => HandleEdit(index)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
