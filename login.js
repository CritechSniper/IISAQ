export async function tl(t, SID, pwd) {
  const endpoint = t?.startsWith("teac") ? "teachers" : "students";

  const r = await fetch(
    `https://maqwal-backend-ljrn.onrender.com/${endpoint}/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ SID, password: pwd })
    }
  );

  return await r.json();
}
async function pingServer() {
  try {
    const res = await fetch("https://maqwal-backend-ljrn.onrender.com/ping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: "Frontend" })
    });

    const data = await res.json();
    console.log("Ping response:", data);

    return data;
  } catch (err) {
    console.error("Ping failed:", err);
  }
}
console.log(await pingServer())