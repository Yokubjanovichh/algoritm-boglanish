import React, { useState } from "react";

const BOT_TOKEN = "7251876801:AAHXMU4fLTol-mb3cFZelPP0mnsvp_Iicsk";
const YOUR_CHAT_ID = "-1002240826846";

export default function App() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [theme, setTheme] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      chat_id: YOUR_CHAT_ID,
      text: `
      \nIsm: ${name}
      \nTelefon-raqami: ${number}
      \nMavzu: ${theme}
      \nSavol: ${question}
      `,
    };

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Xatolik yuz berdi");
        }
        return response.json();
      })
      .then((data) => {
        alert("So'rovingiz muvafiqiyatlik yuborildi✅");
        setName("");
        setNumber("");
        setTheme("");
        setQuestion("");
      })
      .catch((error) => {
        alert("Xatolik yuz berdi❌");
        console.error("Xatolik yuz berdi:", error);
      });
  };

  return (
    <div className="wrapper">
      <h1>Bog'lanish</h1>
      <p>Muallif bilan bog'lanish</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="fio">
          <label>
            Ism<sup>*</sup> <br />
            <input
              type="text"
              required
              placeholder="Ismingizni kiriting"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>
          <label>
            Tel<sup>*</sup> <br />
            <input
              type="number"
              required
              placeholder="Telefon raqamingizni kiriting"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
            />
          </label>
        </div>
        <label>
          Mavzu<sup>*</sup> <br />
          <input
            type="text"
            required
            placeholder="Mavzuni kiriting"
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
          />
        </label>
        <label>
          Savol<sup>*</sup> <br />
          <textarea
            rows={5}
            onChange={(e) => setQuestion(e.target.value)}
            defaultValue=" Savol yuq edi..."
            value={question}
          ></textarea>
        </label>
        <button>Jo'natish</button>
      </form>
    </div>
  );
}
