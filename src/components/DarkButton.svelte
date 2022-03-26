<script>
</script>

<div class="darkmodeBtn">
  <label class="switch">
    <input type="checkbox" on:click />
    <span class="slider round" />
  </label>
</div>

<style>
  .darkmodeBtn {
    opacity: 75%;
  }
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
</style>
