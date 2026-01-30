export async function onRequestPost(context) {
  try {
    // 1. Form se data nikalna
    const data = await context.request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const course = data.get('course');

    // 2. Database (DB) mein data insert karna
    // Dhyan rahe: Aapne binding name 'DB' rakha hai
    await context.env.DB.prepare(
      "INSERT INTO students (name, email, course) VALUES (?, ?, ?)"
    ).bind(name, email, course).run();

    // 3. Success response bhejna
    return new Response("Success! Data Saved in Database.", {
      status: 200,
      headers: { "Content-Type": "text/plain" }
    });

  } catch (err) {
    // Agar koi error aaye (jaise table missing ya binding error)
    return new Response("Error: " + err.message, { 
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
