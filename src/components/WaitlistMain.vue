<template>
    <div class="app">
        <main class="main">
            <section class="main">
                <div class="main-content">
                    <h2 class="main-title">Join Our Waitlist</h2>
                    <p class="main-description">
                        We're currently at capacity. Add your name to our waitlist and we'll notify you when a table
                        becomes
                        available.
                    </p>
                    <button class="waitlist-button" @click="handleJoinWaitlist">
                        Join Waitlist
                    </button>
                    <div class="wait-info">
                        <p>Current estimated wait time: {{ waitTime }} minutes</p>
                        <p>We'll send you a text message when your table is ready.</p>
                    </div>
                </div>
            </section>

            <section class="steps">
                <h3 class="steps-title">How It Works</h3>
                <div class="steps-grid">
                    <div v-for="(step, index) in steps" :key="index" class="step-card">
                        <div class="step-number">{{ index + 1 }}</div>
                        <h4 class="step-title">{{ step.title }}</h4>
                        <p class="step-description">{{ step.description }}</p>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: "WaitlistMain",
    data() {
        return {
            waitTime: "30-45", // we need to calculate this from backend data
            steps: [
                {
                    title: "Join the Waitlist",
                    description: "Click the button above to add your name and party size to our digital waitlist."
                },
                {
                    title: "Get Notified",
                    description: "We will send you a text message when your table is ready."
                },
                {
                    title: "Get Seated",
                    description: "When your table is ready, you'll receive a final notification to come inside and be seated."
                }
            ]
        }
    },
    methods: {
        handleJoinWaitlist() {
            alert("Joining waitlist... This would open a form in a real application.")
        },
        currentYear() {
            return new Date().getFullYear()
        }
    },
}
</script>

<style>
.app {
    display: flex;
    flex-direction: column;
    background: #121212;
}

.main {
    flex: 1;
}

.main {
    padding: 4rem 1rem;
    text-align: center;
}

.main-content {
    max-width: 800px;
    margin: 0 auto;
}

.main-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.main-description {
    font-size: 1.25rem;
    color: #d7d7d7;
    margin-bottom: 2rem;
}

.waitlist-button {
    background-color: #dc2626;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.125rem;
    font-weight: bold;
    border-radius: 9999px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.waitlist-button:hover {
    background-color: #b91c1c;
}

.wait-info {
    margin-top: 2rem;
    color: #d7d7d7;
}

/* Steps section */
.steps {
    background-color: #242424;
    padding: 4rem 1rem;
}

.steps-title {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 3rem;
}

.steps-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    padding: 0 1rem;
}

.step-card {
    background: #121212;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.step-number {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #dc2626;
    color: white;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-bottom: 1rem;
}

.step-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.step-description {
    color: #d7d7d7;
}
</style>