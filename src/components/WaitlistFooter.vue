<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-section">
          <h3 class="footer-title">the soOP kitchen</h3>
          <ul class="footer-list">
            <li>authentic OP type shi</li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Hours</h3>
          <ul class="footer-list">
            <li v-for="(schedule, index) in hours" :key="index">
              {{ schedule }}
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3 class="footer-title">Contact</h3>
          <ul class="footer-list">
            <li>(000) 123-4567</li>
            <li>123 fake street, faketown, USA</li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} the soOP kitchen. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "WaitlistFooter",
  data() {
    return {
      hours: [
        "Mon-Thu: 11am - 10pm",
        "Fri-Sat: 11am - 11pm",
        "Sun: 11am - 9pm",
      ],
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
.footer {
  background: #121212;
  border-top: 1px solid #464646;
  padding: 4rem 1rem 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-grid {
  display: grid;
  gap: 2rem;
}

.footer-section h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.footer-list {
  list-style: none;
}

.footer-list li {
  margin-bottom: 0.5rem;
}

.footer-bottom {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #464646;
}
</style>
