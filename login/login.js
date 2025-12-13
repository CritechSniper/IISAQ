export async function tl(t, SID, pwd) {
  const r = await fetch(
    `https://mailer-vknh.onrender.com/${t?.startsWith("teac") ? "teachers" : "students"}/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        SID: SID,
        password: pwd
      })
    }
  );
  return await r.json();
}