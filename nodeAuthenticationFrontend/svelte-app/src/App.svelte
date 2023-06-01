<script>
  import { Router, Route, Link } from "svelte-routing";
  import Login from "./components/Login.svelte";
  import Register from "./components/Register.svelte";
  import Logout from "./components/Logout.svelte";
</script>

<Router>
  <nav>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <Link to="/logout">Logout</Link>
  </nav>
  
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <Route path="/logout" component={Logout} />
</Router>