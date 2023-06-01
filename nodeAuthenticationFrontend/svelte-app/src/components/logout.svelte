<script>
  import { navigate } from 'svelte-routing';

  async function handleLogout() {
    logout();
    navigate('/login'); // Redirect to login page
  }
</script>

<main>
  <h1>Logout</h1>
  <button on:click={handleLogout}>Logout</button>
</main>