<script>
  let email = "";
  let password = "";
  
  async function handleRegister() {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();

    if (response.ok) {
      console.log(data.message);
    } else {
      console.error(data.error);
    }
  }
</script>

<form on:submit|preventDefault={handleRegister}>
  <input type="email" bind:value={email} placeholder="Email" required />
  <input type="password" bind:value={password} placeholder="Password" required />
  <button type="submit">Register</button>
</form>