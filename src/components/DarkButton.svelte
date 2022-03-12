<script>
  // function toggle() {
  //   window.document.body.classList.toggle('dark-mode');
  // }
  import { theme } from '../store';
  // function toggle() {
  //   window.document.body.classList.toggle('dark-mode');
  //   $theme === 'light' ? 'dark' : 'light';
  // }
</script>

<div>
  <label class="switch">
    <input type="checkbox" on:click />
    <span class="slider round" />
  </label>
</div>

<style>
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider.round {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 34px;
    background-color: #6194bc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .slider.round:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    border-radius: 50%;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  input:checked + .slider {
    background-color: #6194bc;
  }
  input:focus + .slider {
    box-shadow: 0 0 1px #6194bc;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
  button {
    background-color: #0d47a1;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem;
  }
  :global(body.dark-mode) button {
    background-color: #0084f6;
    color: white;
  }
</style>
